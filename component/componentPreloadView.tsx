import React from 'react'

const ComponentPreloadView = () => (
    <div className="preload carcass">
        <div className="header-wrapper">
            <div className="test-type-wrapper">
                <div className="user-logo preload__style"/>
                <div className="test-info">
                    <span className="preload__style preload__lines preload__lines_md preload__lines_width-7"/>
                    <span className="preload__style preload__lines preload__lines_md preload__lines_width-11"/>
                </div>
            </div>
            <div className="user-info">
                <div className="left-column">
                    <div className="field-answer-wrapper">
                        <p className="field">FIRST NAME</p>
                        <span className="answer preload__style preload__lines preload__lines_md preload__lines_width-7"/>
                    </div>
                    <div className="field-answer-wrapper">
                        <p className="field">LAST NAME</p>
                        <span className="answer preload__style preload__lines preload__lines_md preload__lines_width-11"/>
                    </div>
                </div>
                <div className="right-column">
                    <div className="right-column__first">
                        <div className="right-column__first__top">
                            <p className="field">ADDRESS</p>
                            <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-7"/>
                            <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-7"/>
                            <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-7"/>
                            <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-7"/>
                        </div>
                        <div className="right-column__first__bottom">
                            <div className="right-column__first__bottom__left">
                                <p className="field">Gender</p>
                                <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-1"/>

                                <p className="field">country</p>
                                <p className="answer user-secondary-answer">Canada</p>
                            </div>
                            <div className="right-column__first__bottom__right">
                                <p className="field">Phone</p>
                                <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-1"/>

                                <p className="field">OHIP</p>
                                <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-1"/>
                            </div>
                        </div>
                    </div>
                    <div className="right-column__second">
                        <p className="field">date of birth</p>
                        <span className="answer preload__style preload__lines preload__lines_sm"/>
                        <p className="field">passport no.</p>
                        <p className="answer user-secondary-answer">ZE000059</p>
                        <p className="field">issuing country</p>
                        <span className="answer preload__style preload__lines preload__lines_sm preload__lines_width-1"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="test-result-wrapper">
        </div>
        <div className="lab-info-wrapper">
        </div>
        <div className="footer-wrapper">
        </div>
    </div>
);

export default ComponentPreloadView;
