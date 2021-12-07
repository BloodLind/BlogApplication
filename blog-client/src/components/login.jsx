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



function Login() {
  const [state, setState] = useState({ login: '', password: '' });
  const [isErrorOccurred, setErrorOccuerd] = useState(false);
  const session = useSession({});
  const history = useHistory();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSingIn = async (event) => {
    if(await AccountService.Login(state.login, state.password, session)){
      history.push("/")
    } else {
      setErrorOccuerd(true);
    }
  }
  const handleSingUp = (event) => {
    history.push('/register');
  }
  let error;
  if(isErrorOccurred){
    error = <h3 className="agency danger fs-4 m-2 link-danger">Login or Password is wrong!</h3>;
  }
      return (
       <div className="base" style={{backgroundImage: "url(/drawable/loginBack.png)"}}>
          <div className="loginContainer col-5 d-flex flex-row align-items-center gap-3 bg-light">
            <div className="loginForm p-2 d-flex flex-column       justify-content-center align-items-center">
              <input className="input w-100 ps-4 pe-4" type="text" placeholder="Login" name="login" value={state.login} onChange={handleChange} />
              <input className="input w-100 ps-4 pe-4" type="password" placeholder="Password" name="password" value={state.password}  onChange={handleChange} />
              {error}
              <div class="d-flex gap-5 mt-4 justify-content-center">
                <button className="btn bg-accent round-card fs-4 agency ps-5 pe-5 opacity-button text-nowrap" type="button" onClick={handleSingIn}>Sign in</button>
                <button className="btn bg-accent round-card fs-4 agency ps-5 pe-5 opacity-button text-nowrap" type="button" onClick={handleSingUp}>Sign up</button>
              </div>
              <Link className="dark-link mt-3 mb-3 align-self-center text-center agency fs-4 text-dark" to='/login'>Forgot password?</Link>
              
              <button className="btn bg-dark-color color-light w-100 fs-4 agency opacity-button mt-2 mb-2 round-card d-flex ps-4 p-2 align-items-center">
                <img alt="G" src={window.location.protocol + '//' + window.location.host + '/drawable/google.png'} className="icon me-3"></img>
                Connect with Google</button>

              <button className="btn bg-dark-color color-light w-100 p-2 fs-4 agency  opacity-button mt-3 round-card d-flex ps-4 p-2 align-items-center">
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


export default Login;
