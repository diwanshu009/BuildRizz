import { createContext } from "react"

import type { Dispatch, SetStateAction } from "react"

export type ActionType = {
    actionType: string
    timeStamp: number
} | null

export interface ActionContextType {
    action: ActionType
    setAction: Dispatch<SetStateAction<ActionType>>
}

export const ActionContext = createContext<ActionContextType>({
    action: null,
    setAction: () => {},
})