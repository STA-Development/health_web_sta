export interface resultAnalysis {
  channelName: string
  description: string
  groups: group[]
}
export interface group {
  label: string
  value: string
}
export interface resultMetaData {
  action: string
  autoResult: string
  notify: boolean
  resultDate: string
}
export interface ITestResultState {
  testResult: testResult
}
export interface testResult {
  address: string
  dateOfBirth: string
  dateTime: string
  firstName: string
  gender: string
  equipment: string
  id: string
  issuingCountry: string
  importantInfo: string
  labName: string
  lastName: string
  legalNotes: string
  ohip: string
  physician: string
  phone: string
  result: string
  resultAnalysis: resultAnalysis[] | []
  resultMetaData: resultMetaData | {}
  registeredNursePractitioner: string
  style: string
  swabMethod: string
  templateId: string
  testType: string
}
export type ITestResultActions = {
  type: "UPDATE_TEST_RESULT"
  data: testResult
}
