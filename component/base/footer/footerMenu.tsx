import Image from 'next/image'

const FooterMenu = () => (
  <footer className="main-footer">
    <div>
      <Image src="/fh-health-logos-hor-gold.svg" width={150} height={40} alt="fh-health-logos" />
    </div>
    <div>
      <ul>
        <li><a href="https://www.fhhealth.com/">Home</a></li>
        <li><a href="https://www.fhhealth.com/privacy-policy">Privacy Policy</a></li>
        <li><a href="https://www.fhhealth.com/terms-of-service">Terms of Service</a></li>
      </ul>
    </div>
    <div className="helpBlock">
      <p>Need help?</p>
      <p>
        Live Chat available on
        <span><a href="https://www.fhhealth.com/">fhhealth.com</a></span>
      </p>
    </div>
  </footer>
)
export default FooterMenu
