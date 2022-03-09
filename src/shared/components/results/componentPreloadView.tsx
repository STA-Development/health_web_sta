import React from 'react'

const ComponentPreloadView = () => (
  <div className="preload carcass">
    <div className="testResult-header">
      <div className="testResult-header__type">
        <div className="user-logo preload__style" />
        <div className="testResult-header__type-info">
          <span className="preload__style preload__lines preload__lines_md preload__lines_width-7" />
          <span className="preload__style preload__lines preload__lines_md preload__lines_width-11" />
        </div>
      </div>
      <div className="testResult-header__user">
        <div className="testResult-header__user-info">
          <div>
            <p className="field">FIRST NAME</p>
            <span className="answer preload__style preload__lines preload__lines_md preload__lines_width-7" />
          </div>
          <div>
            <p className="field">LAST NAME</p>
            <span className="answer preload__style preload__lines preload__lines_md preload__lines_width-11" />
          </div>
        </div>
        <div className="testResult-header__user-creds">
          <div>
            <div className="testResult-header__user-block">
              <p className="field">ADDRESS</p>
              <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-7" />
              <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-2" />
              <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-3" />
              <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-1" />
            </div>
            <div className="testResult-header__user-block">
              <p className="field">Gender</p>
              <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-1" />
            </div>
            <div className="testResult-header__user-block">
              <p className="field">Phone</p>
              <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-4" />

              <p className="field">OHIP</p>
              <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-4" />
            </div>
          </div>

          <div className="testResult-header__user-data">
            <p className="field">date of birth</p>
            <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-4" />
            <p className="field">passport no.</p>
            <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-4" />
          </div>
        </div>
      </div>
    </div>
    <div className="testResult-wrapper testResult-wrapper_biorad-color padding ">
      <span className="answer preload__style preload__lines preload__lines_lg preload__lines_width-12" />
    </div>
    <div className="testResult-wrapper" />
    <div className="preload__test-analysis-data">
      <h3 className="preload__test-analysis-data__title">Test Analysis Data</h3>
      <div className="preload__test-analysis-data__content">
        <div className="preload__test-analysis-data__content__half">
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />
          <span className="answer preload__style preload__lines preload__lines_lg preload__lines_width-12 margins" />
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />
          <span className="answer preload__style preload__lines preload__lines_lg preload__lines_width-12 margins" />
        </div>
        <div className="preload__test-analysis-data__content__half">
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />
          <span className="answer preload__style preload__lines preload__lines_lg preload__lines_width-12 margins" />
          <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-5" />
          <span className="answer preload__style preload__lines preload__lines_lg preload__lines_width-12 margins" />
        </div>
      </div>
    </div>
    <div className="labInfo-wrapper">
      <div className="labInfo-wrapper__left">
        <div className="labInfo-wrapper__left-first-col">
          <p className="field">date of test</p>
          <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-5" />
          <p className="field">test-type</p>
          <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-5" />
        </div>

        <div className="labInfo-wrapper__left-second-col">
          <p className="field">date of results</p>
          <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-5" />
          <p className="field">collection method</p>
          <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-5" />{' '}
        </div>
      </div>
      <div className="labInfo-wrapper__right">
        <div className="labInfo-wrapper__right-first-col">
          <p className="field">collection nurse</p>
          <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-5" />

          <p className="field">Testing Clinic</p>
          <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-5" />
        </div>
        <div className="labInfo-wrapper__right-second-col">
          <p className="field">ordering physician</p>
          <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-5" />
          <p className="field">location</p>
          <span className="answer answer_sm preload__style preload__lines preload__lines_sm preload__lines_width-5 small-margin-bt" />
        </div>
      </div>
    </div>
    <div className="testResult-footer">
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
