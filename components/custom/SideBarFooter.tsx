import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { UserDetailContext } from "@/context/UserDetailContext"

export default function SideBarFooter() {

    const router = useRouter()
    const {setUserDetail} = useContext(UserDetailContext)

    const handleLogOut = ()=>{
        console.log("hello")
        localStorage.removeItem("user")
        setUserDetail(null)
        router.push('/')
    }

    const options = [
        {
            name: 'Settings',
            icon : Settings
        },
        {
            name: 'Help Center',
            icon : HelpCircle
        },
        {
            name: 'My Subscription',
            icon : Wallet
        },
        {
            name: 'Log Out',
            icon : LogOut,
            onClick: handleLogOut
        }
    ]

    return (
        <div className="p-2 mb-10 ">
            {options.map((option,index)=>(
                <Button variant="ghost" key={index} className="w-full flex items-center gap-2 justify-start my-3 cursor-pointer" onClick={option.onClick}>
                    <option.icon className="w-5 h-5"/>
                    {option.name}
                </Button>
            ))}
        </div>
    )
}
