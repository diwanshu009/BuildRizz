import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react"
import { Button } from "../ui/button"

export default function SideBarFooter() {
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
            icon : LogOut
        }
    ]
    return (
        <div className="p-2 mb-10 ">
            {options.map((option,index)=>(
                <Button variant="ghost" key={index} className="w-full flex items-center gap-2 justify-start my-3 cursor-pointer">
                    <option.icon className="w-5 h-5"/>
                    {option.name}
                </Button>
            ))}
        </div>
    )
}
