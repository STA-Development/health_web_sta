import {ITestResultActions, ITestResultState} from 'types/context/testResultContext'
import {TestResultContextStaticData} from '@fh-health/static/TestResultContextStaticData'

export const TestResultContextReducer = (state: ITestResultState, action: ITestResultActions) => {
  switch (action.type) {
    case TestResultContextStaticData.UPDATE_TEST_RESULT:
      return {
        ...state,
        testResult: action.data,
      }
    default:
      return state
  }
}
