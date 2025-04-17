import { createContext } from "react"
import { GenericId } from "convex/values"
export interface UserDetail {
    _id?: GenericId<"users">
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
