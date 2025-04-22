"use client"

import { useContext, useState } from "react"
import { MessagesContext, Message } from "@/context/MessagesContext"
import Colors from "@/data/Colors"
import Lookup from "@/data/Lookup"
import { ArrowRight, Link } from "lucide-react"
import { UserDetailContext } from "@/context/UserDetailContext"
import SignInDialog from "./SignInDialog"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"

export default function Hero() {
    const [userInput, setUserInput] = useState("")
    const { setMessages } = useContext(MessagesContext)
    const { userDetail } = useContext(UserDetailContext)
    const [openDialog, setOpenDialog] = useState(false)
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
    const router = useRouter()

    const onGenerate = async (input: string) => {
        if (!userDetail?.name || !userDetail._id) {
            setOpenDialog(true)
            return;
        }

        const newMessage: Message = {
            role: "user",
            content: input,
        }

        try {
            const workspaceId = await CreateWorkspace({
                user: userDetail._id,
                messages: [newMessage],
            })

            router.push(`/workspace/${workspaceId}`)
        } catch (err) {
            console.error("Failed to create workspace", err)
        } finally {
            setOpenDialog(false)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            if (userInput.trim() !== "") {
                onGenerate(userInput)
            }
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        onGenerate(suggestion);
    };


    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4 text-center gap-4">
            <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
            <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>

            <div
                className="p-5 border rounded-xl max-w-xl w-full mt-3"
                style={{ backgroundColor: Colors.BACKGROUND }}
            >
                <div className="flex gap-2 items-end">
                    <textarea
                        placeholder={Lookup.INPUT_PLACEHOLDER}
                        onChange={(event) => setUserInput(event.target.value)}
                        value={userInput}
                        onKeyDown={handleKeyDown}
                        className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white"
                    />
                    {userInput?.length > 0 && (
                        <ArrowRight
                            onClick={() => onGenerate(userInput)}
                            className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer text-white"
                        />
                    )}
                </div>
                <div className="pt-2">
                    <Link className="h-5 w-5" />
                </div>
            </div>

            <div className="flex mt-8 flex-wrap max-w-2xl justify-center items-center gap-3">
                {Lookup?.SUGGESTIONS.map((suggestion: string, index: number) => (
                    <h2
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer transition-colors duration-150"
                    >
                        {suggestion}
                    </h2>
                ))}
            </div>
            <SignInDialog openDialog={openDialog} closeDialog={(v: boolean) => setOpenDialog(v)} />
        </div>
    )
}
