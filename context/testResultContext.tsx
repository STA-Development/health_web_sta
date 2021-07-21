import React, {createContext, useContext, useReducer} from "react"
import {ITestResultState,ITestResultActions} from "../types/context/testResultContext"
import {TestResultContextReducer} from "../reducer/testResultReducer"


const initialState: ITestResultState = {
    testResult:{
        adminId: "",
        appointmentStatus: "",
        barCode: '',
        confirmed: false,
        dateOfAppointment: '',
        dateTime: '',
        deadline: '',
        displayInResult: false,
        firstName: '',
        id: '',
        labId: '',
        lastName: '',
        linkedBarCodes: [],
        organizationId: null,
        previousResult: '',
        reCollectNumber: 0,
        recollected: false,
        result: '',
        resultAnalysis: [],
        resultMetaData:{},
        runNumber: 0,
        sortOrder: 0,
        templateId: '',
        testType: '',
        updatedAt: '',
        userId: '',
        waitingResult:false
    }
}

const initialTestResultContext: {
    testResultState: ITestResultState
    setTestResultState: React.Dispatch<ITestResultActions>
} = {
    testResultState: initialState,
    setTestResultState: () => ({}),
}

const TestResultContext = createContext(initialTestResultContext)

export function TestResultContextProvider({children}: any) {
    const [testResultState, setTestResultState] = useReducer(TestResultContextReducer, initialState)

    return (<TestResultContext.Provider value={{testResultState,setTestResultState}}>
    {children}
    </TestResultContext.Provider>)
}

export const UseTestResultDataStateValue = () => useContext(TestResultContext)
