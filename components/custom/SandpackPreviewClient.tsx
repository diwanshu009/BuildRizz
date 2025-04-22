"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { SandpackPreview } from "@codesandbox/sandpack-react"
import { ActionContext } from "@/context/ActionContext"

export default function SandpackPreviewClient() {
    const { action } = useContext(ActionContext)
    const previewRef = useRef<any>(null)
    const [client, setClient] = useState<any>(null)

    useEffect(() => {
        const fetchClient = async () => {
            if (previewRef.current && typeof previewRef.current.getClient === "function") {
                try {
                    const result = await previewRef.current.getClient()
                    setClient(result)
                } catch (err) {
                    console.error("Error getting Sandpack client:", err)
                }
            }
        }

        fetchClient()
    }, [])

    useEffect(() => {
        const run = async () => {
            if (!client || !action?.actionType) return

            try {
                const result = await client.getCodeSandboxURL?.()
                if (!result?.sandboxId) return

                if (action.actionType === "deploy") {
                    window.open(`https://${result.sandboxId}.csb.app/`, "_blank")
                } else if (action.actionType === "export") {
                    window.open(result.editorUrl, "_blank")
                }
            } catch (error) {
                console.error("Error handling Sandpack action:", error)
            }
        }

        run()
    }, [action?.actionType, client])

    return (
        <SandpackPreview
            ref={previewRef}
            style={{ height: "80vh" }}
            showNavigator
            showRefreshButton
        />
    )
}
