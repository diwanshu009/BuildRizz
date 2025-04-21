import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "../ui/button"
import { MessageCircleCode, PanelLeftClose } from "lucide-react"
import SideBarFooter from "./SideBarFooter"
import WorkspaceHistory from "./WorkspaceHistory"
import Link from "next/link"

export default function AppSideBar() {
    const {toggleSidebar} = useSidebar()

    return (
        <Sidebar className="flex flex-col h-full">
            <SidebarHeader className="p-5 flex flex-col items-start gap-4">
               <div className="flex justify-between items-center w-full">
                    <Link href="/" aria-label="Home">
                        <Image src="/logo.png" alt="logo" width={30} height={30} priority />
                    </Link>
                    <button><PanelLeftClose
                        className="h-6 w-6 cursor-pointer"
                        onClick={toggleSidebar}
                    /></button>
                </div>
                <Link href="/" passHref>
                    <Button className="inline-flex items-center gap-2 mt-5 w-full text-white bg-blue-500 hover:bg-blue-600 cursor-pointer" aria-label="Go to main prompt">
                        <MessageCircleCode className="w-4 h-4" />
                        Wanna Rizz something?
                    </Button>
                </Link>
            </SidebarHeader>
            <SidebarContent className="p-5 overflow-y-auto flex-1">
                <SidebarGroup>
                    <WorkspaceHistory />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-5 border-t">
                <SideBarFooter />
            </SidebarFooter>
        </Sidebar>
    )
}
