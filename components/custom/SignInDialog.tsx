import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import Lookup from "@/data/Lookup"
import { Button } from "../ui/button"
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { v4 as uuid4 } from "uuid";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SignInDialog({ openDialog, closeDialog }: any) {

    const {userDetail,setUserDetail} = useContext(UserDetailContext)
    const CreateUser = useMutation(api.users.CreateUser)

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer '+ tokenResponse?.access_token } },
            );

            const user = userInfo.data
            await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture,
                uid: uuid4()
            })

            if(typeof window!== undefined){
                localStorage.setItem('user',JSON.stringify(user))
            }

            setUserDetail(userInfo?.data)
            closeDialog(false)
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={closeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription >
                            <div className="flex flex-col items-center justify-center gap-3">
                                <h2 className="font-bold text-2xl text-center text-white">{Lookup.SIGNIN_HEADING}</h2>
                                <p className="text-center">{Lookup.SIGNIN_SUBHEADING}</p>
                                <Button className="bg-blue-500 text-white hover:bg-blue-400" onClick={()=>googleLogin()} >Sign In With Google</Button>

                                <p className="text-center">{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}
