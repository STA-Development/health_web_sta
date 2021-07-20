const AntiBodyAnalysisData = ()=>{
    return(
        <div className="anti-body">
            <h3 className="anti-body__title">Test Analysis Data</h3>
            <p className="anti-body__description">Antibody Cut-off Index Values</p>
            <div className="result-button">
                <div className="result-button__left-part">IgG</div>
                <div className="result-button__right-part">Positive</div>

            </div>
            <div className="result-button">
                <div className="result-button__left-part">IgG</div>
                <div className="result-button__right-part green">Positive</div>
            </div>
            <p className="anti-body__results-title" >Reference Cut-off Index:</p>
           <p className="anti-body__results-description"> 0.8 - &#60; 1.0 = Indeterminate <br/>
               ≥ 1.0 = Positive <br/>
               &#62; 0.8 = Negative </p>
        </div>)
}
export  default AntiBodyAnalysisData
