import {TestTypes} from '../types/context/testResultContext'

const useResultTemplate = () => {
  const isAntibodyResult = (testType) =>
    testType === TestTypes.AntibodyAll || testType === TestTypes.AntibodyBiorad
  const isBioradAntibodyResult = (testType, templateId) =>
    testType === TestTypes.PCR && templateId === TestTypes.BioradAntiBody
  const isPCRResult = (testType, templateId) =>
    templateId !== TestTypes.BioradAntiBody &&
    (testType === TestTypes.PCR ||
      testType === TestTypes.VirtualTravelPCR ||
      testType === TestTypes.CovidFluAB ||
      testType === TestTypes.Covid_FluAB)

  const isVaccineResult = (testType) => testType === TestTypes.Vaccine
  const isCovidFluResult = (testType) =>
    testType === TestTypes.Covid_FluAB || testType === TestTypes.CovidFluAB

  return {
    isAntibodyResult,
    isBioradAntibodyResult,
    isPCRResult,
    isVaccineResult,
    isCovidFluResult,
  }
}

export default useResultTemplate
