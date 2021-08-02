import React from "react"

const ComponentPreloadView = () => (
  <div className="preload carcass">
    <div className="header-wrapper">
      <div className="test-type-wrapper">
        <div className="user-logo preload__style" />
        <div className="test-info">
          <span className="preload__style preload__lines preload__lines_md preload__lines_width-7" />
          <span className="preload__style preload__lines preload__lines_md preload__lines_width-11" />
        </div>
      </div>
      <div className="user-info">
        <div className="left-column">
          <div className="field-answer-wrapper">
            <p className="field">FIRST NAME</p>
            <span className="answer preload__style preload__lines preload__lines_md preload__lines_width-7" />
          </div>
          <div className="field-answer-wrapper">
            <p className="field">LAST NAME</p>
            <span className="answer preload__style preload__lines preload__lines_md preload__lines_width-11" />
          </div>
        </div>
        <div className="right-column">
          <div className="right-column__first">
            <div className="right-column__first__top">
              <p className="field">ADDRESS</p>
              <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-7" />
              <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-7" />
              <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-7" />
              <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-7" />
            </div>
            <div className="right-column__first__bottom">
              <div className="right-column__first__bottom__left">
                <p className="field">Gender</p>
                <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-1" />

                <p className="field">country</p>
                <p className="answer user-secondary-answer">Canada</p>
              </div>
              <div className="right-column__first__bottom__right">
                <p className="field">Phone</p>
                <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-1" />

                <p className="field">OHIP</p>
                <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-1" />
              </div>
            </div>
          </div>
          <div className="right-column__second">
            <p className="field">date of birth</p>
            <span className="answer preload__style preload__lines preload__lines_sm" />
            <p className="field">passport no.</p>
            <p className="answer user-secondary-answer">ZE000059</p>
            <p className="field">issuing country</p>
            <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-1" />
          </div>
        </div>
      </div>
    </div>
    <div className="test-result-wrapper"></div>
    <div className="lab-info-wrapper">
      <div className="left-part-wrapper">
        <div className="left-top-wrapper">
          <div className="first-column">
            <p className="field">date of test</p>
            <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />
            <p className="field">test-type</p>
            <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />
          </div>

          <div className="second-column">
            <p className="field">date of results</p>
            <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />
            <p className="field">collection method</p>
            <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />{" "}
          </div>
        </div>
        <div className="left-bottom-wrapper">
          <p className="field">test equipment (health canada approved)</p>
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-10" />
        </div>
      </div>
      <div className="right-part-wrapper">
        <div className="right-part-first-column">
          <p className="field">collection nurse</p>
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />

          <p className="field">Testing Clinic</p>
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />

          <p className="field">Testing Lab</p>
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5 small-margin-bt" />
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5 " />
        </div>
        <div className="right-part-second-column">
          <p className="field">ordering physician</p>
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />
          <p className="field">location</p>
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5 small-margin-bt" />
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5 small-margin" />
        </div>
      </div>
    </div>
    <div className="footer-wrapper">
      <div className="information-loader-wrapper">
        <p className="important-information__title">Important Information</p>
        <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-15" />
        <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-15" />
        <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-13" />
        <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-14" />
      </div>
      <div className="notice-loader-wrapper">
        <p className="important-information__title">Legal Notice</p>
        <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-15" />
        <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-15" />
        <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-13" />
        <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-14" />
      </div>
    </div>
  </div>
)

export default ComponentPreloadView
