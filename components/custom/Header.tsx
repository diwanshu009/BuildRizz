import Image from "next/image";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { LucideDownload, Rocket } from "lucide-react";
import { ActionContext } from "@/context/ActionContext";

export default function Header() {
    const { userDetail } = useContext(UserDetailContext)
    const { toggleSidebar } = useSidebar()
    const path = usePathname()
    const { setAction } = useContext(ActionContext)

    const onActionBtn = (action: string) => {
        setAction({
            actionType: action,
            timeStamp: Date.now()
        })
    }

    const isWorkspacePage = path?.includes("workspace");

    return (
        <div className="p-4 flex justify-between items-center border-b bg-background">
            <Link href={'/'}>
                <Image src={'/logo.png'} alt='Logo' width={40} height={40} priority />
            </Link>
            {!userDetail?.name ? <div className="flex gap-5">
                <Button variant="ghost">Sign In</Button>
                <Button className="text-white" style={{
                    backgroundColor: Colors.BLUE
                }} >Get Started</Button>
            </div> :
                isWorkspacePage && (
                    <div className="flex gap-3 items-center">
                        <Button variant="ghost" onClick={() => onActionBtn('export')} className="flex items-center gap-1 cursor-pointer"><LucideDownload className="w-4 h-4" />Export</Button>

                        <Button onClick={() => onActionBtn('deploy')} className="flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"><Rocket className="w-4 h-4" /> Deploy</Button>

                        {userDetail?.picture && (
                            <Image
                                src={userDetail.picture}
                                alt="User"
                                width={30}
                                height={30}
                                className="rounded-full w-[30px] h-[30px] cursor-pointer"
                                onClick={toggleSidebar}
                            />
                        )}
                    </div>
                )}
        </div>
    )
}
