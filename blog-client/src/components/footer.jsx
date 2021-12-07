import {
  Link
} from "react-router-dom";
import '../styles/site.css'
import '../styles/default-namespace.jsx'

function Footer() {
  return (
    <div className="footer d-flex flex-column p-2">
      <div className=" align-self-center" style={{
        backgroundColor: 'white',
        position: 'relative',
        top: '-10px',
        height: '5px',
        width: '37em',
        borderRadius: '10px'
      }}></div>
      <div className="d-flex flex-row justify-content-around align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img className="nav-img" src={window.location.protocol + "//" + window.location.host + "/drawable/logowithTextlight.png"}></img>
          <div className="d-flex flex-row gap-5">
            <div className="fs-5">
              @BloodLind vs @Kyrylchenko
            </div>
            <a className="light-link fs-5" aria-current="page" href="#">PRIVACY POLICY</a>
            <a className="light-link fs-5" aria-current="page" href="#">TERMS OF SERVICE</a>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-start">
          <Link className="light-link fs-4" to="/login">Sign in account</Link>
          <Link className="light-link fs-4" to="/create">Create new memory</Link>
          <Link className="light-link fs-4" to="/explore">Explore</Link>
        </div>


        <div className="d-flex flex-column justify-content-start">

          <span className="fs-4 color-sub-light">Follow us on:</span>
          <a className="fs-4 light-link" href="https://www.instagram.com/?hl=ru">Instagram</a>
          <a className="light-link fs-4" href="https://twitter.com/?lang=ru">Twiter</a>
          <a className="light-link fs-4" href="https://www.reddit.com/">Reddit</a>
        </div>
      </div>


    </div>
  )
}

export default Footer;