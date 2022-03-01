import React, {useEffect} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {TestTypes} from '@fh-health/types/context/testResultContext'
import PcrIcon from '@fh-health/component/base/header/listIcons/pcrIcon'
import AntibodyIcon from '@fh-health/component/base/header/listIcons/antibodyIcon'
import RapidIcon from '@fh-health/component/base/header/listIcons/rapidIcons'
import ExpressIcon from '@fh-health/component/base/header/listIcons/expressIcon'
import VaccineIcon from '@fh-health/component/base/header/listIcons/vaccineIcon'
import useTestResultsColor from '@fh-health/hooks/testResultsColorHook'

interface ISingleTestResult {
  testName: string
  patientName: string
  testDate: string
  backgroundClass: string
  status: string
  redirectUrl: string
  type: string
}

enum testStatus {
  InProgress = 'In Progress',
  Invalid = 'Invalid',
}

const SingleTestResult = ({
  testName,
  patientName,
  testDate,
  backgroundClass,
  status,
  redirectUrl,
  type,
}: ISingleTestResult) => {
  const router = useRouter()
  const isResultDisabled =
    status === testStatus.InProgress ||
    (status === testStatus.Invalid && type === TestTypes.RapidAntigen)
  const {testColor, getTestResultListIconColors} = useTestResultsColor()

  const handleRedirect = (link: string | undefined) => {
    if (link) {
      router.push(`/my?testResultId=${link}#carcassFocus`)
    }
  }

  useEffect(() => {
    getTestResultListIconColors(backgroundClass)
  }, [])

  return (
    <div
      onClick={() => handleRedirect(redirectUrl)}
      className={isResultDisabled ? 'single-result single-result_disabled' : 'single-result'}
    >
      <div className="single-result__info">
        {(type === TestTypes.PCR ||
          type === TestTypes.VirtualTravelPCR ||
          type === TestTypes.VirtualPCR ||
          type === TestTypes.CovidFluAB ||
          type === TestTypes.Covid_FluAB) && <PcrIcon color={testColor} large={false} />}

        {(type === TestTypes.AntibodyBiorad || type === TestTypes.AntibodyAll) && (
          <AntibodyIcon color={testColor} large={false} />
        )}

        {(type === TestTypes.VirtualTravelRapidAntigen ||
          type === TestTypes.VirtualRapidAntigen ||
          type === TestTypes.RapidAntigen) && <RapidIcon color={testColor} large={false} />}

        {type === TestTypes.ExpressPCR && <ExpressIcon color={testColor} large={false} />}
        {type === TestTypes.Vaccine && <VaccineIcon color={testColor} large={false} />}
        <div>
          <span>{testName}</span>
          <span>Patient: {patientName}</span>
          <span>{testDate}</span>
        </div>
      </div>
      <div className="single-result__status">
        <div className={`result-status ${backgroundClass}`}>{status.toUpperCase()}</div>
        <Image
          className={isResultDisabled ? 'hidden' : ''}
          alt="next icon"
          src="/next.svg"
          width={16}
          height={16}
        />
      </div>
    </div>
  )
}

export default SingleTestResult
