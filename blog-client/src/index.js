import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Main from './components/main'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Article from './components/article'
import Explore from './components/explore';
import Login from './components/login'
import './styles/site.css'
import useSession, { UseSessionProvider } from 'react-session-hook';
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
            Create
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
          Login
        </Route>
          <Route path="/article/:id">
            <Navbar></Navbar>
            <Article></Article>
            <Footer></Footer>
          </Route>
        </Switch>

    </Router>
 
  </UseSessionProvider>,
  document.getElementById('root')
  
);


