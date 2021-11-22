import React, {createContext, useContext, useState} from 'react'

interface IConfState {
    chatVisibility: boolean
}

const initialState: IConfState = {
    chatVisibility: false
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
