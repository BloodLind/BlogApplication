
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
//   this.handleChange = this.handleChange.bind(this);
//   this.handleSingIn = this.handleSingIn.bind(this);
//   this.handleSingUp = this.handleSingUp.bind(this);

  

      return (
       
       <div className="base" style={{backgroundImage: "url(/drawable/loginBack.png)"}}>
          <div className="loginContainer col-5 d-flex flex-row align-items-center">
            <div className="loginForm p-2 justify-content-center align-items-center">
              <input className="input w-100" type="text" placeholder="Login" name="login" value={state.login} onChange={handleChange} />
              <input className="input w-100" type="password" placeholder="Password" name="password" value={state.password}  onChange={handleChange} />
              <div class="d-flex gap-5">
                <button className="btn bg-accent text-larger agency ps-5 pe-5" type="button" onClick={handleSingIn}>Sign in</button>
                <button className="btn bg-accent text-larger agency ps-5 pe-5" type="button" onClick={handleSingUp}>Sign up</button>
              </div>
              <Link className="nav-link">Forgot password?</Link>
              
              <button className="btn bg-dark-color color-sub-light w-100 p-2">Connect with Google</button>
          </div>

              <div className="logo">
                <img style={{height:"300px"}} src="/drawable/logowithtextdark.png"/>
              </div>
       </div>
     </div>
      );
    
  }

export default Login;
