import React, {useEffect, useState} from "react"
import Image from 'next/image'
import {useRouter} from 'next/router'
import {TestTypes, TestResultColors} from '@fh-health/types/context/testResultContext'
import PcrIcon from '@fh-health/component/base/header/listIcons/pcrIcon'
import AntibodyIcon from '@fh-health/component/base/header/listIcons/antibodyIcon'
import RapidIcon from '@fh-health/component/base/header/listIcons/rapidIcons'
import ExpressIcon from '@fh-health/component/base/header/listIcons/expressIcon'
import VaccineIcon from "@fh-health/component/base/header/listIcons/vaccineIcon"

interface ITestResults {
  testName: string
  patientName: string
  testDate: string
  backgroundClass: string
  status: string
  redirectUrl: string
  type: string
}

enum testStatus {
    InProgress = "In Progress"
}

const SingleTestResult = ({
  testName,
  patientName,
  testDate,
  backgroundClass,
  status,
  redirectUrl,
  type,
}: ITestResults) => {
  const router = useRouter()
  const [testColor, setTestColor] = useState({
    outer: "",
    inner: ""
  })

  const handleRedirect = (link: string | undefined) => {
    if (link) {
      router.push(`/my?testResultId=${link}#carcassFocus`)
    }
  }

  useEffect(() => {
     switch (backgroundClass) {
      case TestResultColors.Green:
        setTestColor({
          outer: "#DCF3E5",
          inner: "#52c17c"
        })
        break;
      case TestResultColors.Red:
        setTestColor({
          outer: "#ffc9ce",
          inner: "#ff394d"
        })
        break;
      case TestResultColors.Blue:
        setTestColor({
          outer: "#c0deff",
          inner: "#007aff"
        })
        break;
       case TestResultColors.Yellow:
         setTestColor({
           outer: "#ffe7bf",
           inner: "#ffb439"
         })
         break;
      default:
        setTestColor({
          outer: "#e3e3e3",
          inner: "#212121"
        })
        break;
    }
  }, [])

  return (
    <div onClick={() => handleRedirect(redirectUrl)} className={`single-result link-to-test ${(status === testStatus.InProgress) && "single-result_disabled"}`}>
      <div className="left">
        {(type === TestTypes.PCR
          || type === TestTypes.VirtualTravelPCR
          || type === TestTypes.VirtualPCR
          || type === TestTypes.CovidFluAB
          || type === TestTypes.Covid_FluAB)
        && <PcrIcon color={testColor} large={false} />}

        {(type === TestTypes.AntibodyBiorad || type === TestTypes.AntibodyAll) && <AntibodyIcon color={testColor} large={false} />}

        {(type === TestTypes.VirtualTravelRapidAntigen ||
          type === TestTypes.VirtualRapidAntigen ||
          type === TestTypes.RapidAntigen) && <RapidIcon color={testColor} large={false} />
        }

        {type === TestTypes.ExpressPCR && <ExpressIcon color={testColor} large={false} />}
        {type === TestTypes.Vaccine && <VaccineIcon color={testColor} large={false} />}
        <div>
          <span>{testName}</span>
          <span>Patient: {patientName}</span>
          <span>{testDate}</span>
        </div>
      </div>
      <div className="right">
        <div className={`result-status ${backgroundClass}`}>{status.toUpperCase()}</div>
        {!(status === testStatus.InProgress) && <Image className="link-to-test" alt="next icon" src="/next.svg" width={16} height={16} />}
      </div>
    </div>
  )
}

export default SingleTestResult
