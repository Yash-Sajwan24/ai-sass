import { NextResponse } from "next/server";
import Replicate from "replicate";

import { increaseApiCount, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try{
    const body = await req.json();
    const {prompt} = body;

    if(!prompt){
      return new NextResponse("Prompt is required", {status : 400});
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    if(!freeTrial && !isPro){
      return new NextResponse("Free trial has expired.", {status : 403});
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt
        }
      }
    );
  
    await increaseApiCount();
    
    return NextResponse.json(response);
  }
  catch(err){
    return new NextResponse("Internal error", {status: 500});
  }
}
