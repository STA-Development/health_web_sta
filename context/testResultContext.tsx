import React, {createContext, useContext, useReducer} from 'react'
import {ITestResultState, ITestResultActions} from 'types/context/testResultContext'
import {TestResultContextReducer} from '@fh-health/reducers/testResultReducer'

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

export function TestResultContextProvider({children}: any) {
  const [testResultState, setTestResultState] = useReducer(TestResultContextReducer, initialState)

  return (
    <TestResultContext.Provider value={{testResultState, setTestResultState}}>
      {children}
    </TestResultContext.Provider>
  )
}

export const UseTestResultDataStateValue = () => useContext(TestResultContext)
