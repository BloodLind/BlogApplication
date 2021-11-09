import {
    Link
  } from "react-router-dom";
import '../styles/site.css'

function Footer(){
    return(
        <div className="footer d-flex flex-column p-2">
        <div className=" align-self-center" style={{
          backgroundColor:'white',
          position:'relative',
          top:'-10px',
          height:'5px',
          width:'37em',
          borderRadius:'10px'
        }}></div>
      <div className="d-flex flex-row justify-content-around align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img className="nav-img" src={window.location.protocol + "//" + window.location.host + "/drawable/logowithTextlight.png"}></img>
          <div className="d-flex flex-row gap-5">
            <div className="text-larger">
              @BloodLind
            </div>
            <a className="light-link text-larger" aria-current="page" href="#">PRIVACY POLICY</a>
            <a className="light-link text-larger" aria-current="page" href="#">TERMS OF SERVICE</a>
          </div>
        </div>
          <div className="d-flex flex-column justify-content-start">
            <Link className="light-link text-super-large" to="/login">Sign in account</Link>
            <Link className="light-link text-super-large" to="/create">Create new memory</Link>
            <Link className="light-link text-super-large" to="/explore">Explore</Link>
       </div>

         
          <div className="d-flex flex-column justify-content-start">
            
            <span className="text-super-large color-sub-light">Follow us on:</span>
               <a className="text-super-large light-link" href="https://www.instagram.com/?hl=ru">Instagram</a>
               <a className="light-link text-super-large" href="https://twitter.com/?lang=ru">Twiter</a>
               <a className="light-link text-super-large" href="https://www.reddit.com/">Reddit</a>
          </div>
      </div>

     
  </div>
    )
}

export default Footer;