
import '../styles/Login.css';
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
          <div className="loginContainer">
            <div className="loginForm">
          <input className="input" type="text" placeholder="Login" name="login" value={state.login} onChange={handleChange} />
          <input className="input" type="password" placeholder="Password" name="password" value={state.password}  onChange={handleChange} />
          <div class="">
          <input className="yellowBtn" type="button" onClick={handleSingIn} value="Sign in"/>
          <input className="yellowBtn" type="button" onClick={handleSingUp} value="Sing up"></input>
          </div>
          <div>Forgot password?</div>
          <div className="blackBtn">
            Connect with Google</div>
        
          </div>

          <div className="logo">
            <img style={{height:"300px"}} src="/drawable/logowithtextdark.png"/>
          
          </div>
          </div>
       </div>
     
      );
    
  }

export default Login;
