import { GenAiCode } from "@/configs/AIModel"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    try{
        const {prompt} = await req.json()
        const result = await GenAiCode.sendMessage(prompt)
        const resp = result.response.text()
        return NextResponse.json(JSON.parse(resp))
    }catch(err){
        return NextResponse.json({error:err})
    }
}