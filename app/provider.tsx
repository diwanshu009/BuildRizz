"use client"

import { useState, ReactNode, useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from "@/components/custom/Header"
import { MessagesContext, Message } from "@/context/MessagesContext"
import { UserDetail, UserDetailContext } from "@/context/UserDetailContext"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSideBar from "@/components/custom/AppSideBar"
import { useRouter } from "next/navigation"
import { ActionContext, ActionType } from "@/context/ActionContext"

interface ProviderProps {
    children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [userDetail, setUserDetail] = useState<UserDetail | null>(null)
    const [action, setAction] = useState<ActionType>(null)
    const convex = useConvex()
    const router = useRouter()

    useEffect(() => {
        isAuthenticated()
    }, [])

    const isAuthenticated = async () => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("user")
            if (!storedUser) {
                router.push("/")
                return
            }
            try {
                const user = JSON.parse(storedUser)
                const result = await convex.query(api.users.GetUser, {
                    email: user?.email,
                })
                setUserDetail(result)
            } catch (err) {
                console.error("Error parsing user or fetching:", err)
                router.push("/")
            }
        }
    }

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY ?? ""}>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                <MessagesContext.Provider value={{ messages, setMessages }}>
                    <ActionContext.Provider value={{ action, setAction }}>
                        <NextThemesProvider
                            attribute="class"
                            defaultTheme="dark"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <SidebarProvider defaultOpen={false} className="flex">
                                {userDetail && <AppSideBar />}
                                <div className="flex-1 flex flex-col">
                                    <Header />
                                    <main className="flex-1">{children}</main>
                                </div>
                            </SidebarProvider>
                        </NextThemesProvider>
                    </ActionContext.Provider>
                </MessagesContext.Provider>
            </UserDetailContext.Provider>
        </GoogleOAuthProvider>
    )
}
