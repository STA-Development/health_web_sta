import Header from "../component/base/header/header";
import TestResult from "../component/testResult";
import LabInformation from "../component/labInformation";
import Footer from "../component/base/footer/footer";
import PcrAnalysisData from "../component/pcrAnalysisData";
import AntiBodyAnalysisData from "../component/antyBodyAnalysisData";
import {load, ReCaptchaInstance} from "recaptcha-v3"
import axios from "axios";
import {useEffect} from "react";
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