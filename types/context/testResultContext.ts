export  interface resultAnalysis {
    channelName:string
    description:string
    groups:group[]
}
export  interface group{
    label:string
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
    address:string
    dateOfBirth:string
    dateOfAppointment: string
    dateTime: string
    deadline: string
    displayInResult: boolean
    firstName: string
    equipment:string
    id: string
    labId: string
    labName:string
    lastName: string
    linkedBarCodes: []
    organizationId: null
    ohip:string
    previousResult: string
    physician:string
    phone:string
    reCollectNumber: number
    recollected: boolean
    result: string
    resultAnalysis: resultAnalysis[] | []
    resultMetaData:resultMetaData | {}
    runNumber: number
    sortOrder: number
    style:string
    swabMethod:string
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