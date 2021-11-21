import React, {createContext, useContext, useEffect, useState} from "react"
// @ts-ignore
import * as QB from "quickblox/quickblox"
import {IConfState, IQBMessage} from "../types/context/CnferenceContext"

const initialState: IConfState = {
    chatVisibility: false,
    messages: [],
    myPersonalId: 0
}

const initialConfContext: {
    confDataState: IConfState,
    setConfDataState: React.Dispatch<any>
} = {
    confDataState: initialState,
    setConfDataState: () => ({})
}

const ConferenceContext = createContext(initialConfContext)

export function ConferenceContextProvider({ children }: any) {
    const [confDataState, setConfDataState] = useState(initialState)

    return (
        <ConferenceContext.Provider value={{confDataState, setConfDataState}}>
            {children}
        </ConferenceContext.Provider>
    )
}

export const UseConfDataStateValue = () => useContext(ConferenceContext)
