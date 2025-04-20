import Image from "next/image";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { LucideDownload, Rocket } from "lucide-react";
import { v4 as uuid4 } from "uuid"
import { ActionContext } from "@/context/ActionContext";
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";


export default function Header() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const { toggleSidebar } = useSidebar()
    const path = usePathname()
    const { setAction } = useContext(ActionContext)
    const CreateUser = useMutation(api.users.CreateUser)

    const onActionBtn = (action: string) => {
        setAction({
            actionType: action,
            timeStamp: Date.now()
        })
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { data: user } = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse?.access_token}`,
                        },
                    }
                )

                const newUser = {
                    name: user.name,
                    email: user.email,
                    picture: user.picture,
                    uid: uuid4()
                }

                await CreateUser(newUser)

                if (typeof window !== "undefined") {
                    localStorage.setItem("user", JSON.stringify(user))
                }

                setUserDetail(newUser)
            } catch (error) {
                console.error("Error during Google login:", error)
            }
        },
        onError: (errorResponse) => {
            console.error("Google login error:", errorResponse)
        },
    })

    const isWorkspacePage = path?.includes("workspace");

    return (
        <div className="p-4 flex justify-between items-center border-b">
            <Link href={'/'}>
                <Image src={'/logo.png'} alt='Logo' width={40} height={40} />
            </Link>
            {!userDetail?.name ? <div className="flex gap-5">
                <Button variant="ghost" onClick={() => googleLogin()} className="cursor-pointer">Sign In</Button>
                <Button onClick={() => googleLogin()} className="text-white cursor-pointer" style={{
                    backgroundColor: Colors.BLUE
                }} >Get Started</Button>
            </div> :
                isWorkspacePage ? (
                    <div className="flex gap-2 items-center">
                        <Button variant="ghost" onClick={() => onActionBtn('export')} className="flex items-center justify-center gap-1 cursor-pointer"><LucideDownload className="w-4 h-4" />Export</Button>

                        <Button onClick={() => onActionBtn('deploy')} className="flex items-center gap-1 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"><Rocket className="w-4 h-4" /> Deploy</Button>

                        {userDetail && (
                            <Image
                                src={userDetail?.picture!}
                                alt="User"
                                width={30}
                                height={30}
                                className="rounded-full w-[30px] cursor-pointer"
                                onClick={toggleSidebar}
                            />
                        )}
                    </div>
                ) : (
                    <div>
                        <Image
                            src={userDetail?.picture!}
                            alt="User"
                            width={30}
                            height={30}
                            className="rounded-full w-[30px] cursor-pointer"
                            onClick={toggleSidebar}
                        />
                    </div>
                )}
        </div>
    )
}
