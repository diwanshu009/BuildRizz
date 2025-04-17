import { createContext } from "react"

export interface UserDetail {
    name?: string
    email?: string
}

interface UserDetailContextType {
    userDetail: UserDetail | null
    setUserDetail: (user: UserDetail | null) => void
}

export const UserDetailContext = createContext<UserDetailContextType>({
    userDetail: null,
    setUserDetail: () => {},
})
