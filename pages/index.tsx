import Header from "../component/base/header/header";
import TestResult from "../component/testResult";
import LabInformation from "../component/labInformation";
import Footer from "../component/base/footer/footer";
import PcrAnalysisData from "../component/pcrAnalysisData";

export default function Home() {
  return (
    <div className="carcass">
        <Header/>
        <TestResult/>
        <PcrAnalysisData/>
        <LabInformation/>
        <Footer/>
    </div>
  )
}