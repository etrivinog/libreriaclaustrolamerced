import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import CrudLibros from './components/CrudLibros';
import CrudTesis from './components/tesis/CrudTesis';
import CrudStudents from './components/StudentsMgr/CrudStudents';
import BookCopys from './components/ejemplares/CrudEjemplares';
import CrudLends from './components/lends/CrudLends';
import VistaLisbrosEstudiante from './components/VistaLisbrosEstudiante';
import Home from './components/Home';
import ValidateAdminLogin from './components/ValidateAdminLogin';

import axios from "axios";

import HomeAdmin from './components/HomeAdmin';
import StudentLogin from './components/StudentLogin';
import ModalRequest from './components/ModalRequest';
import Navbar from './components/Navbar';

import  {urlBase, urlAPIversion} from "./constants/urls";

class App extends Component {

  state = {
    adminSession: null,
    ModalRequest: {
      isOpen: false,
      message: '',
      showButton: false
    }
  }
  


  changeModal = (isOpen, msg, showButton) => {
  
    this.setState({ ModalRequest: {isOpen: isOpen, message: msg, showButton: showButton} });
  
  }

  //Hace la primera petición al servidor para comprobar la disponibilidad de las APISs
  firstget=async()=>{

    this.changeModal(true, 'Iniciando aplicación...', false);

    axios.get(urlBase+urlAPIversion+"verifyServer").then(response=>{
      this.setState({data: response.data});
      
      this.changeModal(false, 'Aplicación inicializada.', false);

    }).catch(error=>{
      console.log(error.message);
      
      this.changeModal(true, error.message, false);
      
    })
    }

  componentDidMount() {
    this.firstget();
  }

  getSession = () => {
    return this.state.adminSession;
  }
  
  setAdminSession = (session) =>{
    this.setState({adminSession: session});
    console.log('this.state.curSession: '+this.state.adminSession);
  }
  
  render(){
   
  return (
    <div className="App">

      <Router>
        <Navbar />
        <ModalRequest isOpen={this.state.ModalRequest.isOpen}
                      message={this.state.ModalRequest.message} 
                      showButton={this.state.ModalRequest.showButton} />

        <ValidateAdminLogin getSession={this.getSession}/>

        <Switch>

          /******************** Portal del admin ********************/
          
          <Route path="/ManageBooks/Copys/:bookId"
                component={BookCopys}>
          </Route>

          <Route path="/ManageBooks">
            <CrudLibros getSession={this.getSession}/>
          </Route>
          
          <Route path="/ManageTesis">
            <CrudTesis getSession={this.getSession}/>
          </Route>
          
          <Route path="/ManageStudents">
            <CrudStudents getSession={this.getSession}/>
          </Route>

          <Route path="/ManageLends">
            <CrudLends getSession={this.getSession}/>
          </Route>

          <Route path="/AdminHome">
            <HomeAdmin getSession={this.getSession} setSession={this.setAdminSession}/>
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
