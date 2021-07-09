import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import CrudLibros from './components/CrudLibros';
import VistaLisbrosEstudiante from './components/VistaLisbrosEstudiante';
import Home from './components/Home';

class App extends Component {

  state = {
    curSession: null
  }

  render(){
   
  return (
    <div className="App">

      <Router>

        <Switch>

          <Route path="/managebooks">
            <CrudLibros/>
          </Route>

          <Route path="/student">
            <VistaLisbrosEstudiante/>
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
