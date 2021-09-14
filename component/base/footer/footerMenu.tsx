import Image from "next/image"
const FooterMenu = () => {
    return (
        <div className="Rectangle">
            <div>
                <Image src="/fh-health-logos-hor-gold.svg" width={150} height={40}/>
            </div>
            <div>
                <ul>
                    <li>Home</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                </ul>
            </div>
            <div className="helpBlock">
                <p>Need help?</p>
                <p>Live Chat available on <span><a href="fhhealth.com">fhhealth.com</a></span></p>
            </div>
        </div>
    )
}
export default FooterMenu
