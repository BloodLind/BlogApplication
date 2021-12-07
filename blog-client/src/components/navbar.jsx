import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/site.css'
import '../styles/background.css'
import '../styles/buttons-links.css'
import '../styles/colors.css'
import '../styles/navigation.css'
import '../styles/text.css'
import '../styles/default-namespace.jsx'
import { Link } from 'react-router-dom'
import useSession  from 'react-session-hook'

function Logout(session){
  session.removeSession();
}
function Navbar() {
  const session = useSession();
  return (<>
    <nav className="navbar bg-dark-gradient navigation-logo navigation opacity-100 nav-top d-flex flex-column justify-content-center">
      <Link to={session.token == undefined ? "/login" : '/account'} style={{ position: "absolute", top: "40px", right: "160px" }}>
        <img style={{
          position: 'relative',
          width: '45px',
          objectFit: 'cover'
        }} src={window.location.protocol + "//" + window.location.host + "/drawable/login.png"}></img>
      </Link>
      <Link to="" onClick={() => Logout(session)} style={{ position: "absolute", top: "40px", right: "100px", display: session.token == undefined ? 'none' : "block"}}>
        <img style={{
          position: 'relative',
          width: '45px',
          objectFit: 'cover'
        }} src={window.location.protocol + "//" + window.location.host + "/drawable/logout.png"}></img>
      </Link>
      <div className="d-flex flex-column justify-content-center">
        <div className="navbar-collapse d-flex flex-row justify-content-around" id="navbarSupportedContent" style={
          {
            borderBottom: '2px solid white',
          }
        }>
          <Link className="nav-link fs-6 color-light" aria-current="page" to="/explore">Explore</Link>
          <Link className="nav-link bg-torqoise-primary fs-6 color-light me-3" to="/check">Check</Link>
          <Link className="nav-link bg-torqoise-primary fs-6 color-light" to="/create">Create</Link>
        </div>
        <div className="line"></div>
        <Link className="nav-img align-self-center" to="/">
          <img className="nav-img align-self-center" src={window.location.protocol + "//" + window.location.host + "/drawable/logowithTextlight.png"}></img>
        </Link>
        <h3 className="fs-6 ocr color-light align-self-end me-5">... Connect our minds</h3>
      </div>


    </nav>


    <nav className="navbar bg-dark-colo navigation opacity-100 position-fixed start-0 top-0 w-100 nav-top-second">
      <div className="navbar-collapse d-flex flex-row justify-content-center gap-5" id="navbarSupportedContent">
        <Link className="nav-link fs-6 color-light" aria-current="page" to="/explore">Explore</Link>
        <Link className="nav-link bg-torqoise-primary fs-6 color-light" to="/check">Check</Link>
        <Link className="nav-link bg-torqoise-primary fs-6 color-light" to="/create">Create</Link>
      </div>
      <Link to={session.token == undefined ? "/login" : '/account'} style={{ position: "absolute", top: "10px", right: "160px" }}>
        <img src={window.location.protocol + "//" + window.location.host + "/drawable/login.png"} style={{
          width: '40px',
          objectFit: 'cover'
        }}></img>
      </Link>
      <Link to="" onClick={() => Logout(session)} style={{ position: "absolute", top: "10px", right: "100px", display: session.token == undefined ? 'none' : "block"}}>
        <img style={{
          position: 'relative',
          width: '40px',
          objectFit: 'cover'
        }} src={window.location.protocol + "//" + window.location.host + "/drawable/logout.png"}></img>
      </Link>
    </nav>
  </>

  );
}

export default Navbar