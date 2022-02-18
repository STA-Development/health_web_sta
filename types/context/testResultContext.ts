export interface group {
  label: string
  value: string
}

export interface resultAnalysis {
  channelName: string
  description: string
  groups: group[]
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
  resultDate: string
  registeredNursePractitioner: string
  style: string
  swabMethod: string
  travelId: string
  locationName: string
  templateId: string
  testType: string
  testTypeName: string
  labAddress: string
  locationAddress: string
  testKitNumber: string
}

export interface ITestResultState {
  testResult: testResult
}

export type ITestResultActions = {
  type: 'UPDATE_TEST_RESULT'
  data: testResult
}

export interface ITestIcons {
  color: {
    outer: string
    inner: string
  }
  large: boolean
}

export enum TestTypes {
  AntibodyAll = 'Antibody_All',
  AntibodyBiorad = 'Antibody_Biorad',
  VirtualTravelPCR = 'VirtualTravelPCR',
  Temperature = 'Temperature',
  PCR = 'PCR',
  ExpressPCR = 'ExpressPCR',
  VirtualPCR = 'VirtualPCR',
  RapidAntigenAtHome = 'RapidAntigenAtHome',
  RapidAntigen = 'RapidAntigen',
  VirtualTravelRapidAntigen = 'VirtualTravelRapidAntigen',
  VirtualRapidAntigen = 'VirtualRapidAntigen',
  BioradAntiBody = 'Biorad-Anti-Body',
  Vaccine = 'Vaccine',
  // TODO: The API returns two different formats of Covid, it might be require some change on backend.
  CovidFluAB = 'CovidFluAB',
  Covid_FluAB = 'Covid+fluA/B',
}

export enum TestResultColors {
  Green = 'GREEN',
  LimeGreen = 'LIMEGREEN',
  Red = 'RED',
  Blue = 'BLUE',
  Yellow = 'YELLOW',
  Gold = 'GOLD',
}

export enum TestResultTypes {
  Positive = 'Positive',
  Negative = 'Negative',
  Indeterminate = 'Indeterminate',
  PresumptivePositive = 'PresumptivePositive',
}
