import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CrudLibros from './components/CrudLibros';
import Home from './components/Home';

class App extends Component {

  render(){
   
  return (
    <div className="App">

      <Router>

        <Switch>

        <Route path="/managebooks">
            <CrudLibros/>
          </Route>

          <Route path="/">
            <Home/>
          </Route>

        </Switch>

      </Router>

    </div>



  );
}
}
export default App;
