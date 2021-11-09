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
import './styles/site.css'

ReactDOM.render(
  <React.StrictMode>
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
            Explore
            <Footer /> 
        </Route>
        
        <Route path="/login">
          Login
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
  </React.StrictMode>,
  document.getElementById('root')
  
);


