import React, { Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import About from './components/pages/About'
import Home from './components/pages/Home'
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/authState';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Alert from './components/layout/Alert';
import AlertState from './context/alert/alertState';
import setAuthToken from './setAuthToken';
import PrivateRoute from './components/routes/PrivateRoute';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
    <ContactState>
    <AlertState>
    <Router>
    <Fragment>
    <Navbar />
    <div className="container">
      <Alert/>
     <Switch>
       <PrivateRoute exact path="/" component={Home} />
       <Route exact path="/about" component={About} />
       <Route exact path="/register" component={Register} />
       <Route exact path="/login" component={Login} />
     </Switch>
    </div>
    </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
