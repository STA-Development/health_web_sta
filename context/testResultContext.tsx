import React, {createContext, useContext, useReducer} from "react"
import {ITestResultState,ITestResultActions} from "../types/context/testResultContext"
import {TestResultContextReducer} from "../reducer/testResultReducer"


const initialState: ITestResultState = {
    testResult:{
        adminId: "",
        appointmentStatus: "",
        address:'',
        barCode: '',
        confirmed: false,
        dateOfAppointment: '',
        dateTime: '',
        deadline: '',
        displayInResult: false,
        dateOfBirth:'',
        equipment:'',
        firstName: '',
        gender:'',
        id: '',
        issuingCountry:'',
        importantInfo:'',
        labId: '',
        labName:'',
        lastName: '',
        linkedBarCodes: [],
        legalNotes:'',
        organizationId: null,
        ohip:'',
        previousResult: '',
        reCollectNumber: 0,
        recollected: false,
        result: '',
        resultAnalysis: [],
        phone:'',
        physician:'',
        resultMetaData:{},
        runNumber: 0,
        registeredNursePractitioner:'',
        sortOrder: 0,
        style:'',
        swabMethod:'',
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
