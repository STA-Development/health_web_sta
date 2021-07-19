const PcrAnalysisData = ()=>{
    return(
        <div className="analysis-wrapper">
            <h3 className="analysis-wrapper__title" >Test Analysis Data</h3>
            <div className="analysis-wrapper__top-part">
                <div className="analysis-wrapper__parameter">
                    <h3 className="analysis-wrapper__bottom-title">FAM</h3>
                    <div className="analysis-wrapper__results">
                        <div className="analysis-wrapper__first-result">E Gene</div>
                        <div className="analysis-wrapper__second-result">+</div>
                        <div className="analysis-wrapper__third-result">C(t)</div>
                        <div className="analysis-wrapper__forth-result">29.3</div>
                    </div>

                </div>

                <div className="analysis-wrapper__parameter">
                    <h3 className="analysis-wrapper__bottom-title">Cal red 61</h3>
                    <div className="analysis-wrapper__results">
                        <span className="analysis-wrapper__first-result">RdRP Gene</span>
                        <span className="analysis-wrapper__second-result">+</span>
                        <span className="analysis-wrapper__third-result">C(t)</span>
                        <span className="analysis-wrapper__forth-result">29.3</span>
                    </div>
                </div>
            </div>
            <div className="analysis-wrapper__bottom-part">

                <div className="analysis-wrapper__parameter">
                    <h3 className="analysis-wrapper__bottom-title">Quasar 670</h3>
                    <div className="analysis-wrapper__results">
                        <span className="analysis-wrapper__first-result">N gene</span>
                        <span className="analysis-wrapper__second-result">+</span>
                        <span className="analysis-wrapper__third-result">C(t)</span>
                        <span className="analysis-wrapper__forth-result">29.3</span>
                    </div>
                </div>
                <div className="analysis-wrapper__parameter">
                    <h3 className="analysis-wrapper__bottom-title"> HEX</h3>
                    <div className="analysis-wrapper__results">
                        <span className="analysis-wrapper__first-result">IC</span>
                        <span className="analysis-wrapper__second-result">+</span>
                        <span className="analysis-wrapper__third-result">C(t)</span>
                        <span className="analysis-wrapper__forth-result">29.3</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default PcrAnalysisData