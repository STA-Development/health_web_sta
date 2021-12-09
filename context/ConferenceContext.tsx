import React, {createContext, useContext, useReducer} from "react"
import {IConfState,IConfActions} from "types/context/ConferenceContext"
import {ConferenceContextReducer} from "reducers/ConferenceContextReducer"

const initialState: IConfState = {
    chatVisibility: false,
    messages: [],
    myPersonalId: 0,
    waitingToken: "",
    patientInfo: {
        firstName: "",
        lastName: "",
        testType: "",
        kitCode: ""
    },
    error: false,
    isConsultationStarted: false
}

const initialConfContext: {
    confDataState: IConfState,
    setConfDataState: React.Dispatch<IConfActions>
} = {
    confDataState: initialState,
    setConfDataState: () => ({})
}

const ConferenceContext = createContext(initialConfContext)

export function ConferenceContextProvider({ children }: any) {
    const [confDataState, setConfDataState] = useReducer(ConferenceContextReducer, initialState)

    return (
        <ConferenceContext.Provider value={{confDataState, setConfDataState}}>
            {children}
        </ConferenceContext.Provider>
    )
}

export const UseConfDataStateValue = () => useContext(ConferenceContext)
