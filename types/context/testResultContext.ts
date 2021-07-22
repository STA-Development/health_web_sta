export  interface resultAnalysis {
    label: string
    value:string
}
export interface resultMetaData{
    action: string
    autoResult: string
    notify: boolean
    resultDate: string
}
export interface ITestResultState{
testResult:testResult
}
export  interface  testResult {
    adminId: string
    appointmentStatus: string
    barCode: string
    confirmed: boolean
    dateOfAppointment: string
    dateTime: string
    deadline: string
    displayInResult: boolean
    firstName: string
    id: string
    labId: string
    lastName: string
    linkedBarCodes: []
    organizationId: null
    previousResult: string
    reCollectNumber: number
    recollected: boolean
    result: string
    resultAnalysis: resultAnalysis[] | []
    resultMetaData:resultMetaData
    runNumber: number
    sortOrder: number
    templateId: string
    testType: string
    updatedAt: string
    userId: string
    waitingResult:boolean
}
export type ITestResultActions =
     {
    type: "UPDATE_TEST_RESULT"
    data: testResult
}