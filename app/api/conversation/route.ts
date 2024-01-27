import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({apiKey : process.env.NEXT_PUBLIC_OPENAI_API_KEY});

export async function POST(req: Request) {
  try{
    const body = await req.json();
    const {message} = body;
    if(!message){
      return new NextResponse("Message is required", {status : 400});
    }

    const response = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": message},
        ],
          
      model: "gpt-3.5-turbo",
    });
  
    return NextResponse.json(response.choices[0].message.content);
  }
  catch(err){
    return new NextResponse("Internal error", {status: 500});
  }
}
