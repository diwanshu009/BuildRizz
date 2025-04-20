"use client"

import { useContext, useEffect, useRef } from "react"
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react"
import { ActionContext } from "@/context/ActionContext"

export default function SandpackPreviewClient() {
    const previewRef = useRef<any>(null)
    const { sandpack } = useSandpack()
    const { action } = useContext(ActionContext)

    useEffect(() => {
        if (!previewRef.current || !action?.actionType) return

        const run = async () => {
            try {
                const client = previewRef.current?.getClient?.()
                if (!client) return

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
    }, [action?.actionType])

    return (
        <SandpackPreview
            ref={previewRef}
            style={{ height: "80vh" }}
            showNavigator={true}
        />
    )
}
