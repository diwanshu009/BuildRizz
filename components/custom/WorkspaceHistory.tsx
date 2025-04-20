"use client"

import { UserDetailContext } from "@/context/UserDetailContext"
import { api } from "@/convex/_generated/api"
import { useConvex } from "convex/react"
import { useContext, useEffect, useState } from "react"
import { useSidebar } from "../ui/sidebar"
import Link from "next/link"

export default function WorkspaceHistory() {

    const { userDetail } = useContext(UserDetailContext)
    const convex = useConvex()
    const [workspaceList, setWorkspaceList] = useState<any[]>([])
    const {toggleSidebar} = useSidebar()

    useEffect(() => {
        userDetail && GetAllWorkspace()
    }, [userDetail])

    const GetAllWorkspace = async () => {
        if (!userDetail?._id) return
        const result = await convex.query(api.workspace.GetAllWorkspace, {
            userId: userDetail?._id,
        })
        setWorkspaceList(result)
    }

    return (
        <div className="space-y-4">
            <h2 className="font-semibold text-white text-xl">Your chats</h2>
            <div className="space-y-2">
                {workspaceList.length === 0 ? (
                    <p className="text-sm text-gray-500">No workspaces found.</p>
                ) : (
                    workspaceList.map((workspace) => (
                        <Link href={`/workspace/${workspace._id}`} key={workspace._id}>
                            <h2
                                onClick={toggleSidebar}
                                className="flex items-center gap-2 text-sm text-gray-400 hover:bg-gray-700/30 hover:text-white px-3 py-2 rounded-md transition-colors duration-150 truncate"
                                title={workspace?.messages?.[0]?.content}
                            >
                                {workspace?.messages?.[0]?.content }
                            </h2>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
