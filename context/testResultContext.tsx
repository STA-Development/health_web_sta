import React, {createContext, useContext, useMemo, useReducer} from "react"
import {ITestResultState, ITestResultActions} from 'types/context/testResultContext'
import TestResultContextReducer from '@fh-health/reducers/testResultReducer'

const initialState: ITestResultState = {
  testResult: {
    address: '',
    dateTime: '',
    dateOfBirth: '',
    equipment: '',
    firstName: '',
    gender: '',
    id: '',
    issuingCountry: '',
    importantInfo: '',
    labName: '',
    lastName: '',
    legalNotes: '',
    ohip: '',
    result: '',
    resultAnalysis: [],
    phone: '',
    physician: '',
    resultDate: '',
    registeredNursePractitioner: '',
    style: '',
    swabMethod: '',
    templateId: '',
    testType: '',
  },
}

const initialTestResultContext: {
  testResultState: ITestResultState
  setTestResultState: React.Dispatch<ITestResultActions>
} = {
  testResultState: initialState,
  setTestResultState: () => ({}),
}

const TestResultContext = createContext(initialTestResultContext)

const TestResultContextProvider = ({children}: { children: JSX.Element | JSX.Element[] }) => {
  const [testResultState, setTestResultState] = useReducer(TestResultContextReducer, initialState)
  const contextValues = useMemo(() => ({testResultState, setTestResultState}), [testResultState])

  return (
    <TestResultContext.Provider value={contextValues}>
      {children}
    </TestResultContext.Provider>
  )
}

export default TestResultContextProvider

export const UseTestResultDataStateValue = () => useContext(TestResultContext)
