import Header from "../component/base/header/header";
import TestResult from "../component/testResult";
import LabInformation from "../component/labInformation";
import Footer from "../component/base/footer/footer";
import PcrAnalysisData from "../component/pcrAnalysisData";
import AntiBodyAnalysisData from "../component/antyBodyAnalysisData";
import {load, ReCaptchaInstance} from "recaptcha-v3"
import axios from "axios";
import {useEffect, useState} from "react";
const getRecaptcha = async ()=>{
        const googleV3RecaptchaToken = await load('6LdsGa0bAAAAAAM-_eEL3JgFUnzF-4vBhj9HBxJ2').then(
            (recaptcha: ReCaptchaInstance) => {
                return recaptcha.execute("submit")
            },
        )
        return googleV3RecaptchaToken
}
const getData = async ()=>{
    const token = await  getRecaptcha()
    const data = await axios.get(`https://user-service-dot-opn-platform-dev.nn.r.appspot.com/user/api/public/v1/pcr-test-results/4f42cff7233d6d400ea33e362bac998b731c2192435debb0d3199dfb5335fc347c99f53cbdcd2e4fc488398dd806dff2`,{
        headers: {
            'opn-device-id':'pugkCDd0IxI-_K66hHDwo',
            'opn-source':'FH_IOS',
            'captcha-token': `${token}`,
            'opn-app-version': '1.0.0',
            'opn-lang': "en",
             'opn-request-id': "k-U6ZDdltbWgZv78TE6BS"
        },
    })
}

export default function Home() {
    const [data, setData] = useState({
        "data": {
            "id": "bTPba6ktCdZSqCMt2OsY",
            "userId": "aUXfK7rc5MMznKPiOCOV",
            "linkedBarCodes": [],
            "testType": "PCR",
            "updatedAt": "2021-03-22T15:21:25.872Z",
            "waitingResult": false,
            "resultMetaData": {
                "resultDate": "2021-03-22",
                "autoResult": "Positive",
                "action": "SendThisResult",
                "notify": true
            },
            "appointmentStatus": "Reported",
            "displayInResult": true,
            "sortOrder": 8,
            "previousResult": "Negative",
            "confirmed": false,
            "adminId": "iVK1tRyuU5znFGptWP6s",
            "dateOfAppointment": "2021-02-17T00:00:00.000Z",
            "firstName": "HSG_TEST1",
            "lastName": "11FEB_8_30AM",
            "result": "Positive",
            "recollected": false,
            "labId": "k0qbPDqTwqitKUwlGHye",
            "dateTime": "2021-02-17T14:00:00.000Z",
            "reCollectNumber": 0,
            "barCode": "A1423",
            "deadline": "2021-02-18T04:59:00.000Z",
            "resultAnalysis": [
                {
                    "label": "LBL1",
                    "value": "1"
                },
                {
                    "value": "2",
                    "label": "LBL1"
                },
                {
                    "value": "3",
                    "label": "LBL2"
                },
                {
                    "value": "4",
                    "label": "LBL3"
                },
                {
                    "value": "5",
                    "label": "LBL4"
                },
                {
                    "label": "LBL4",
                    "value": "6"
                },
                {
                    "value": "7",
                    "label": "LBL4"
                },
                {
                    "value": "8",
                    "label": "LBL4"
                }
            ],
            "organizationId": null,
            "runNumber": 0,
            "templateId": "template1"
        },
        "status": {
            "code": "succeed",
            "message": null
        }
    })
    useEffect(()=>{
        getData()
    },[])
  return (
    <div className="carcass">
        <Header/>
        <TestResult/>
        <AntiBodyAnalysisData/>
        <LabInformation/>
        <Footer/>
    </div>
  )
}