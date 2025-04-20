"use client"

import { MessagesContext } from '@/context/MessagesContext'
import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import Prompt from '@/data/Prompt'
import axios from 'axios'
import { useConvex, useMutation } from 'convex/react'
import { ArrowRight, Link, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSidebar } from '../ui/sidebar'

export default function ChatView() {
    const params = useParams()
    const id = params?.id as any
    const convex = useConvex()
    const { userDetail } = useContext(UserDetailContext)
    const { messages, setMessages } = useContext(MessagesContext)
    const [userInput, setUserInput] = useState("")
    const [loading, setLoading] = useState(false)
    const UpdateMessages = useMutation(api.workspace.UpdateMessages)
    const {toggleSidebar} = useSidebar()

    useEffect(() => {
        id && GetWorkspaceData()
    }, [id])

    const GetWorkspaceData = async () => {
        if (!id) return
        const result = await convex.query(api.workspace.GetWorkspace, {
            workspaceId: id
        })
        if (result?.messages) setMessages(result.messages)
    }

    const GetAiResponse = useCallback(async () => {
        setLoading(true)
        try {
            const prompt = JSON.stringify(messages) + Prompt.CHAT_PROMPT
            const result = await axios.post('/api/ai-chat', { prompt })
            const aiResp = { role: 'ai', content: result.data.result }
            const newMessages = [...messages, aiResp]

            setMessages(newMessages)
            await UpdateMessages({ messages: newMessages, workspaceId: id })
        } catch (error) {
            console.error("Error fetching AI response:", error)
        } finally {
            setLoading(false)
        }
    }, [messages, id, UpdateMessages, setMessages])

    useEffect(() => {
        if (messages?.length && messages[messages.length - 1]?.role === 'user') {
            GetAiResponse()
        }
    }, [messages, GetAiResponse])

    const onGenerate = (input: string) => {
        if (!input.trim()) return
        setMessages(prev => [...prev, { role: 'user', content: input.trim() }])
        setUserInput("")
    }

    return (
        <div className='relative h-[85vh] flex flex-col'>
            <div className='flex-1 overflow-y-auto scrollbar-hide px-5 py-4 space-y-3'>
                {messages?.map((msg, index) => (
                    <div key={index} className='p-3 rounded-lg flex gap-3 items-start leading-7' style={{
                        backgroundColor: Colors.CHAT_BACKGROUND
                    }}>
                        {msg.role === 'user' && userDetail?.picture && (
                            <Image
                                src={userDetail.picture}
                                alt="user"
                                width={35}
                                height={35}
                                className="rounded-full"
                            />
                        )}
                        <div className='flex flex-col'>
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {loading && <div className="p-3 rounded-lg flex gap-2 items-center" style={{
                    backgroundColor: Colors.CHAT_BACKGROUND
                }}>
                    <Loader2Icon className='animate-spin text-white' />
                    <h2 className='text-white'>Generating response...</h2>
                </div>}
            </div>

            <div className='border-t p-4 flex items-end gap-3'>
               {userDetail?.picture && (
                    <Image
                        src={userDetail.picture}
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full cursor-pointer"
                        onClick={toggleSidebar}
                    />
                )}
                <div
                    className="p-4 border rounded-xl max-w-3xl w-full"
                    style={{ backgroundColor: Colors.BACKGROUND }}
                >
                    <div className="flex gap-2">
                        <textarea
                            placeholder={Lookup.INPUT_PLACEHOLDER}
                            onChange={(event) => setUserInput(event.target.value)}
                            value={userInput}
                            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
                        />
                        {userInput && (
                            <ArrowRight
                                onClick={() => onGenerate(userInput)}
                                className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer text-white"
                            />
                        )}
                    </div>
                    <div>
                        <Link className="h-5 w-5 text-gray-400 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}
