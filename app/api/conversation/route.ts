import { NextResponse } from "next/server";
import OpenAI from "openai";


import { increaseApiCount, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({apiKey : process.env.NEXT_PUBLIC_OPENAI_API_KEY});

export async function POST(req: Request) {
  try{
    const body = await req.json();
    const {message} = body;
    if(!message){
      return new NextResponse("Message is required", {status : 400});
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    if(!freeTrial && !isPro){
      return new NextResponse("Free trial has expired.", {status : 403});
    }

    const response = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": message},
        ],
          
      model: "gpt-3.5-turbo",
    });

    await increaseApiCount();
  
    return NextResponse.json(response.choices[0].message.content);
  }
  catch(err){
    return new NextResponse("Internal error", {status: 500});
  }
}
