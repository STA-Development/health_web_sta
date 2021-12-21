import React, {createContext, useContext, useMemo, useReducer} from "react"
import {IConfState, IConfActions} from '@fh-health/types/context/ConferenceContext'
import ConferenceContextReducer from '@fh-health/reducers/ConferenceContextReducer'

const initialState: IConfState = {
  chatVisibility: false,
  messages: [],
  myPersonalId: 0,
  waitingToken: '',
  patientInfo: {
    firstName: '',
    lastName: '',
    testType: '',
    kitCode: '',
  },
  error: false,
  isConsultationStarted: false,
}

const initialConfContext: {
  confDataState: IConfState
  setConfDataState: React.Dispatch<IConfActions>
} = {
  confDataState: initialState,
  setConfDataState: () => ({}),
}

const ConferenceContext = createContext(initialConfContext)

const ConferenceContextProvider = ({children}: { children: JSX.Element | JSX.Element[] }) => {
  const [confDataState, setConfDataState] = useReducer(ConferenceContextReducer, initialState)
  const contextValues = useMemo(() => ({confDataState, setConfDataState}), [confDataState])

  return (
    <ConferenceContext.Provider value={contextValues}>
      {children}
    </ConferenceContext.Provider>
  )
}

export default ConferenceContextProvider

export const UseConfDataStateValue = () => useContext(ConferenceContext)
