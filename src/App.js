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
import CrudStudents from './components/StudentsMgr/CrudStudents';
import VistaLisbrosEstudiante from './components/VistaLisbrosEstudiante';
import Home from './components/Home';

import axios from "axios";

import HomeAdmin from './components/HomeAdmin';
import StudentLogin from './components/StudentLogin';

import  {urlBase, urlAPIversion} from "./constants/urls";

class App extends Component {

  state = {
    curSession: null
  }
  

  //Hace la primera petición al servidor para comprobar la disponibilidad de las APISs
  firstget=async()=>{
    axios.get(urlBase+urlAPIversion+"verifyServer").then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
    }

  componentDidMount() {
    this.firstget();
  }

  render(){
   
  return (
    <div className="App">

      <Router>

        <Switch>

          /******************** Portal del admin ********************/
          <Route path="/ManageBooks">
            <CrudLibros/>
          </Route>

          <Route path="/ManageStudents">
            <CrudStudents/>
          </Route>

          <Route path="/AdminHome">
            <HomeAdmin/>
          </Route>

          /******************** Portal del estudiante ***********************/
          <Route path="/StudentSite">
            <StudentLogin/>
          </Route>

          <Route path="/StudentPortal">
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
