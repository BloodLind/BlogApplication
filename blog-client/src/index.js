import './styles/site.css'
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import useSession, { UseSessionProvider } from 'react-session-hook';
import { removeParam } from './services/stringOperations';
import Main from './components/main'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Article from './components/article'
import Explore from './components/explore';
import Login from './components/login'
import Account from './components/account';
import Register from './components/register';
import Create from './components/create'



ReactDOM.render(
  <UseSessionProvider>
    <Router>
        <Switch>

        <Route path="/" exact>
            <Navbar />
            <Main></Main>
            <Footer /> 
        </Route>

        <Route path="/create">
          <Navbar />
           <Create></Create>
            <Footer /> 
        </Route>

        <Route path="/check">
         <Navbar />
            Check
            <Footer /> 
        </Route>

        <Route path="/explore" exact>
            <Navbar />
            <Explore></Explore>
            <Footer /> 
        </Route>
        
        <Route path="/login">
          <Login/>
        </Route>
        
        <Route path="/register">
          <Register></Register>
        </Route>

        <Route path="/article/:id">
            <Navbar></Navbar>
            <Article></Article>
            <Footer></Footer>
        </Route>

        <Route path="/account">
            <Navbar></Navbar>
            <Account></Account>
            <Footer></Footer>
        </Route>
        </Switch>

    </Router>
 
  </UseSessionProvider>,
  document.getElementById('root')
  
);


