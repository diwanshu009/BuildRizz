import Image from "next/image";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";

export default function Header() {
    return (
        <div className="p-4 flex justify-between items-center">
            <Image src={'/logo.png'} alt='Logo' width={40} height={40} />
            <div className="flex gap-5">
                <Button variant="ghost">Sign In</Button>
                <Button className="text-white" style={{
                    backgroundColor: Colors.BLUE
                }} >Get Started</Button>
            </div>
        </div>
    )
}
