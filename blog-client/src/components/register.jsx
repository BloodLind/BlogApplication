import '../styles/images.css';
import '../styles/login.css';
import '../styles/default-namespace.jsx'
import '../styles/site.css'

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AccountService from "../api/accountService";
import useSession from 'react-session-hook';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';



function Register() {
  const [state, setState] = useState({ login: '', password: '', email : ''});
  const [isErrorOccurred, setErrorOccuerd] = useState(false);
  const session = useSession();
  const history = useHistory();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSingIn = async (event) => {
    if(await AccountService.Register(state.login, state.password, state.email, session)){
      history.push("/")
    } else {
      setErrorOccuerd(!isErrorOccurred);
    }
  }
  const handleSingUp = (event) => {
    alert(event);
  }
  let error = AccountService.Errors.map(x => <h3 className="agency danger fs-6 m-2 link-danger">{x}</h3>);

      return (  
       <div className="base" style={{backgroundImage: "url(/drawable/loginBack.png)"}}>
          <div className="loginContainer col-5 d-flex flex-row align-items-center gap-3 bg-light">
            <div className="loginForm p-2 d-flex flex-column       justify-content-center align-items-center">
              <input className="input w-100 ps-4 pe-4" type="text" placeholder="Login" name="login" value={state.login} onChange={handleChange} />
              <input className="input w-100 ps-4 pe-4" type="text" placeholder="Email" name="email" value={state.email}  onChange={handleChange} />
              <input className="input w-100 mb-1 ps-4 pe-4" type="password" placeholder="Password" name="password" value={state.password}  onChange={handleChange} />
              <div>
              {error}
              </div>
              <Link className='agency fs-4 color-dark dark-link' to='/login'>Already have account?</Link>
              <button className="btn bg-accent round-card fs-4 agency mt-3 ps-5 pe-5 opacity-button text-nowrap w-100" type="button" onClick={handleSingIn}>Sign up</button>
              <button className="btn bg-dark-color color-light ps-5 pe-5 w-100 yu-gothic opacity-button mt-2 mb-2 round-card d-flex ps-4 p-2 align-items-center">
                <img alt="G" src={window.location.protocol + '//' + window.location.host + '/drawable/google.png'} className="icon me-3"></img>
                Connect with Google</button>
              <button className="btn bg-dark-color color-light w-100 ps-5 pe-5 p-2 yu-gothic opacity-button round-card d-flex ps-4 p-2 align-items-center">
                <img alt="R" src={window.location.protocol + '//' + window.location.host + '/drawable/reddit.png'} className="icon me-3"></img>
                Connect with Reddit</button>
          </div>

              <div className="logo m-4 d-flex flex-column">
                <img style={{height:"300px"}} src="/drawable/logowithtextdark.png"/>
                <h3 className='ocr fs-6 align-self-end' style={{
                  marginTop:'-50px',
                }}>... Connect our minds</h3>
              </div>
       </div>
     </div>
      );
    
  }


export default Register;
