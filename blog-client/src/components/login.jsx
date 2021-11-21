import '../styles/images.css';
import '../styles/login.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AccountService from "../api/accountService";
import useSession from 'react-session-hook';
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/site.css'



function Login (){
    const [state,setState]  = useState( {login: '',password:''})
    const session=  useSession();
    const history = useHistory();
    const handleChange = (event)=> {    
       setState({...state,[event.target.name]:event.target.value});
    };
   const handleSingIn = (event)=> {
    AccountService.Login( state.login,state.password,session);
    history.push("/")
   }
  
  const handleSingUp = (event)=>{
    alert('data ' + state.login + "   "+state.password);
    
  }


      return (
       <div className="base" style={{backgroundImage: "url(/drawable/loginBack.png)"}}>
          <div className="loginContainer col-5 d-flex flex-row align-items-center gap-3">
            <div className="loginForm p-2 justify-content-center align-items-center">
              <input className="input w-100 ps-4 pe-4" type="text" placeholder="Login" name="login" value={state.login} onChange={handleChange} />
              <input className="input w-100 ps-4 pe-4" type="password" placeholder="Password" name="password" value={state.password}  onChange={handleChange} />
              <div class="d-flex gap-5 mt-4">
                <button className="btn bg-accent round-card text-larger agency ps-5 pe-5 opacity-button text-nowrap" type="button" onClick={handleSingIn}>Sign in</button>
                <button className="btn bg-accent round-card text-larger agency ps-5 pe-5 opacity-button text-nowrap" type="button" onClick={handleSingUp}>Sign up</button>
              </div>
              <Link className="nav-link mt-3 align-self-center text-center agency text-larger text-dark">Forgot password?</Link>
              
              <button className="btn bg-dark-color color-light w-100 p-2 yu-gothic opacity-button mt-2 mb-2 round-card">
                <img alt="G" src={window.location.protocol + '//' + window.location.host + '/drawable/google.png'} className="icon me-3"></img>
                Connect with Google</button>

              <button className="btn bg-dark-color color-light w-100 p-2 yu-gothic opacity-button mt-3 round-card">
                <img alt="R" src={window.location.protocol + '//' + window.location.host + '/drawable/reddit.png'} className="icon me-3"></img>
                Connect with Reddit</button>
          </div>
              <div className="logo m-3 p-1 d-flex flex-column">
                <img style={{height:"300px"}} src="/drawable/logowithtextdark.png"/>
                <h3 className="">... Connect our minds</h3>
              </div>

       </div>
     </div>
      );
    
  }

export default Login;
