import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Lookup from "@/data/Lookup"
import { Button } from "../ui/button"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useContext } from "react"
import { v4 as uuid4 } from "uuid"
import { UserDetailContext } from "@/context/UserDetailContext"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

interface SignInDialogProps {
    openDialog: boolean;
    closeDialog: (open: boolean) => void;
}

export default function SignInDialog({ openDialog, closeDialog }: SignInDialogProps) {
    const { setUserDetail } = useContext(UserDetailContext)
    const CreateUser = useMutation(api.users.CreateUser)

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const {data: user} = await axios.get(
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
                closeDialog(false)
            } catch (error) {
                console.error("Error during Google login:", error)
            }
        },
        onError: (errorResponse) => {
            console.error("Google login error:", errorResponse)
        },
    })

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold text-white">
                        {Lookup.SIGNIN_HEADING}
                    </DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-col items-center justify-center gap-4 mt-4">
                            <p className="text-center text-gray-300">
                                {Lookup.SIGNIN_SUBHEADING}
                            </p>
                            <Button
                                className="bg-blue-500 text-white hover:bg-blue-400"
                                onClick={() => googleLogin()}
                            >
                                Sign In With Google
                            </Button>
                            <p className="text-center text-xs text-gray-400">
                                {Lookup.SIGNIn_AGREEMENT_TEXT}
                            </p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
