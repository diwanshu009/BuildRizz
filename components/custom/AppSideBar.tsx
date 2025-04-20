import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "../ui/button"
import { MessageCircleCode } from "lucide-react"
import SideBarFooter from "./SideBarFooter"
import WorkspaceHistory from "./WorkspaceHistory"

export default function AppSideBar() {
    return (
        <Sidebar className="flex flex-col h-full">
            <SidebarHeader className="p-5 flex flex-col items-start gap-4">
                <Image src={'/logo.png'} alt="logo" width={30} height={30}/>
                <Button className="w-full flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"><MessageCircleCode className="w-4 h-4" /> Start new Chat</Button>
            </SidebarHeader>
            <SidebarContent className="p-5">
                <SidebarGroup>
                    <WorkspaceHistory/>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-5 border-t">
                <SideBarFooter/>
            </SidebarFooter>
        </Sidebar>
    )
}
