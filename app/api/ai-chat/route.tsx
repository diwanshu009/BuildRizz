import { chatSession } from "@/configs/AIModel"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const {prompt} = await req.json()
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
        }
        const result = await chatSession.sendMessage(prompt)
        const AIresp = result.response.text()

        return NextResponse.json({result: AIresp})
    }catch(err){
        return NextResponse.json({error:err})
    }
}