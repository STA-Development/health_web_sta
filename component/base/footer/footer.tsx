import Image from "next/image"
const Footer = ()=> {
    return (
        <div className="footer-wrapper">
            <div className="important-information">
                <p className="important-information__title">Important Information</p>
                <p className='important-information__description'>
                    The human immune system antibody response
                    has beenstudied for decades. In general, IgMisotype antibodies develop in 5 to 7
                    days and usuallyremain in circulation for 2 to 4 months.IgG isotype antibodies develop
                    after 10 days and remainin circulation longer. The onset andpersistence of IgA isotype
                    antibodies is variable. <br/> <br/>
                </p>
                <p className="important-information__description">
                    Studies of the antibody response to SARS-CoV-2 alsoknown as COVID-19 are limited as
                    the firstcases were only reported toward the end of 2019. Antibodylevels in these
                    patients have beenmonitored for less than 6 months. In the first COVID-19studies
                    published, antibody isotypeoccurrence varies widely, likely impacted by lackof
                    standardization. Guo et al reported that IgMand IgA antibodies were detected in
                    COVID 19 infectedpatients 5 days after onset of symptomsand IgG at 14 days. In this
                    study the antibody positiverate in clinical COVID-19 cases was 85.4%for IgM, 92.7%
                    for IgA and 77.9% for IgG. Anotherstudy reported that IgM antibodies
                    startedincreasing around day 9 and peaked at day 18. IgGbegan increasing from
                    day 9 to 15 and slowlyincreased from day 15 to 39. The positive rate forIgG
                    reached 100% 20 days after onset ofsymptoms (Zheng, 2020). Long et al., reported
                    thatthe median day of seroconversion for bothIgG and IgM was 13 days after symptoms
                    onset. Seroconversionof IgM occurred at the sametime, or earlier, or later than
                    that of IgG. IgG levelswere seen in 100% of patients (19/19) andreached a plateau
                    within 6 days after seroconversion. <br/> <br/>
                </p>
                <p className="important-information__description">
                    Positive results for IgG, IgA and IgM antibodies againstSARS-CoV-2 are generally
                    indicative of anindividual’s current or prior infection with the COVID-19virus,
                    however, the duration theseantibodies remain in circulation is not yet
                    established,however, these test results should alwaysbe considered in the
                    context of a patient’s clinicalhistory, physical examination, andepidemiologic
                    exposures when making the final diagnosis.Measurement Uncertainty for SARSCoV-2
                    IgA is 0.12 with an average control value of1.57. Measurement Uncertainty for
                    SARSCoV-2 IgG is 2.82 with an average control value of43.70. Measurement
                    Uncertainty for SARSCoV-2 IgM is 0.83 with an average control value of6.90. <br/>
                </p>
            </div>
            <div className="doctor-info">
                <Image priority={true} src="/signage.webp" alt="signage" width={"225"} height={"77px"} />
                <div className="doctor-info-title">
                    Dr. Peter Blecher <br/>
                    FH Health Physician
                </div>

            </div>
            <div className="legal-notice">
                <h4 className="legal-notice__title">Legal Notice</h4>
                <p className="legal-notice__description"> Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p className="legal-notice__description">     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
        </div>
    )
}
export default Footer

