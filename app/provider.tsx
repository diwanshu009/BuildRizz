"use client"

import { useState, ReactNode, useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from "@/components/custom/Header"
import { MessagesContext, Message } from "@/context/MessagesContext"
import { UserDetail, UserDetailContext } from "@/context/UserDetailContext"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"
interface ProviderProps {
    children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null)
    const convex = useConvex()

    useEffect(()=>{
        isAuthenticated()
    },[])

    const isAuthenticated = async ()=>{
        if(typeof window !== undefined){
            const user = JSON.parse(localStorage.getItem('user')!)
            const result = await convex.query(api.users.GetUser,{
                email: user?.email,
            })
            setUserDetail(result)
        }
    }

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY!}>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                <MessagesContext.Provider value={{ messages, setMessages }}>
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header />
                        {children}
                    </NextThemesProvider>
                </MessagesContext.Provider>
            </UserDetailContext.Provider>
        </GoogleOAuthProvider>
    )
}
