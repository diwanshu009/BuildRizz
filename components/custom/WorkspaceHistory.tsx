"use client"

import { UserDetailContext } from "@/context/UserDetailContext"
import { api } from "@/convex/_generated/api"
import { useConvex } from "convex/react"
import { useContext, useEffect, useState } from "react"
import { useSidebar } from "../ui/sidebar"
import Link from "next/link"

export default function WorkspaceHistory() {

    const { userDetail, setUserDetail } = useContext(UserDetailContext)
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
        <div>
            <h2 className="font-medium text-lg">Your chats</h2>
            <div className="space-y-4">
                {workspaceList.length === 0 ? (
                    <p className="text-sm text-gray-500">No workspaces found.</p>
                ) : (
                    workspaceList.map((workspace) => (
                        <Link href={`/workspace/${workspace._id}`} key={workspace._id}>
                            <h2
                                onClick={toggleSidebar}
                                className="text-sm text-gray-400 cursor-pointer font-light hover:text-white truncate"
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
