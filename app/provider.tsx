"use client"

import { useState, ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import Header from "@/components/custom/Header"
import { MessagesContext, Message } from "@/context/MessagesContext"

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  const [messages, setMessages] = useState<Message[]>([])

  return (
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
  )
}
