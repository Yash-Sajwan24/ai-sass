import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({apiKey : process.env.NEXT_PUBLIC_OPENAI_API_KEY});

export async function POST(req: Request) {
  try{

    const body = await req.json();

    const {prompt , amount = 1 ,resolution= "512x512"} = body;
    if(!prompt){
      return new NextResponse("Prompt is required", {status : 400});
    }
    if(!amount){
      return new NextResponse("Amount is required", {status : 400});
    }
    if(!resolution){
      return new NextResponse("Resolution is required", {status : 400});
    }


    const response = await openai.images.generate({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
  
    return NextResponse.json(response.data, {status : 201});
  }
  catch(err){
    return new NextResponse("Internal error", {status: 500});
  }
}
