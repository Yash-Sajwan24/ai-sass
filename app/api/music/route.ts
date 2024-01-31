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
    const isPro  = await checkSubscription();
    if(!freeTrial && !isPro){
      return new NextResponse("Free trial has expired.", {status : 403});
    }

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt
        }
      }
    );

    if(!isPro){
      await increaseApiCount();
    }
  
    return NextResponse.json(response);
  }
  catch(err){
    return new NextResponse("Internal error", {status: 500});
  }
}
