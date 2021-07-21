import Header from "../component/base/header/header";
import TestResult from "../component/testResult";
import LabInformation from "../component/labInformation";
import Footer from "../component/base/footer/footer";
import PcrAnalysisData from "../component/pcrAnalysisData";
import AntiBodyAnalysisData from "../component/antyBodyAnalysisData";
import {load, ReCaptchaInstance} from "recaptcha-v3"
import axios from "axios";
import {useEffect, useState} from "react";
import {UseTestResultDataStateValue} from "../context/testResultContext"
import {TestResultContextStaticData} from "../static/TestResultContextStaticData";

export default function Home() {
    const {testResultState,setTestResultState} = UseTestResultDataStateValue()
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
        try {
            const response = await axios.get(`https://user-service-dot-opn-platform-dev.nn.r.appspot.com/user/api/public/v1/pcr-test-results/30286d6f7fb6fd55d9d9dd2975ad08bad3cb819bb51eca309228703f080b546df7a4efd8709197145db79a81099b8eb8`,{
                headers: {
                    'opn-device-id':'pugkCDd0IxI-_K66hHDwo',
                    'opn-source':'FH_IOS',
                    'captcha-token': `${token}`,
                    'opn-app-version': '1.0.0',
                    'opn-lang': "en",
                    'opn-request-id': "k-U6ZDdltbWgZv78TE6BS"
                },
            })
            if (response.status === 200){
                const data = response.data.data
                setTestResultState({type: TestResultContextStaticData.UPDATE_TEST_RESULT,  data})
            }

        } catch (e){
            console.log(e)
        }


    }

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