import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import  {urlBase, urlAPIversion} from "../constants/urls";
import ModalRequest from './ModalRequest';

import '../Login.css';

const urlAuth = urlAPIversion+"auth/";

const urlSave    = urlBase+urlAuth+"login/";

const parameterId = "?Id=";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  ModalRequest: {
    isOpen: false,
    message: '',
    showButton: false
  },
  form:{
    user: '',
    pass: ''
  }
}

changeModal = (isOpen, msg, showButton) => {
  
  this.setState({ ModalRequest: {isOpen: isOpen, message: msg, showButton: showButton} });

}

closeModal = () => {
  
  this.setState({ ModalRequest: {isOpen: false, message: '', showButton: false} });

}

loginGet=()=>{

  if(this.state.form.user == null || this.state.form.pass == null){
    return;
  }
  
  this.changeModal(false, 'Iniciando sesión...', false);

  axios.get(urlSave+'?user='+this.state.form.user+'&pass='+this.state.form.pass,).then(response=>{
    console.log(response.data);
    if(response.data == 'OK'){
      this.props.setSession(response.data);
      this.closeModal();
    }else if(response.data == 'FAIL'){
      this.changeModal(false, 'Datos de inicio incorrectos!', true);
    }

  }).catch(error=>{
    console.log(error.message);
    this.changeModal(true, 'Datos de inicio incorrectos!', true);
  })
}

seleccionarEmpresa=(admin)=>{
  this.setState({
    tipoModal: 'actualizar',
    form:{
      user: '',
      pass: ''
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
}


  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  
  <Link className="btn btn-danger" to="/">Volver</Link>
  <br /><br />
  
          <div className="wrapper fadeInDown">
            <div id="formContent">
                <h2 className="active"> Iniciar sesi&oacute;n </h2>

                <form>
                <input type="text" id="user" className="fadeIn second" onChange={this.handleChange} name="user" placeholder="Correo electr&oacute;nico" />
                <input type="text" id="pass" className="fadeIn third" onChange={this.handleChange} name="pass" placeholder="Contrase&ntilde;a" />
                <input type="button" onClick={()=>this.loginGet()} className="fadeIn fourth" value="Iniciar sesi&oacute;n" />
                <br />
                <a className="loginMessage">{this.state.ModalRequest.message}</a>
                </form>
                <div id="formFooter">
                <a className="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div>

            <ModalRequest isOpen={this.state.ModalRequest.isOpen}
                          message={this.state.ModalRequest.message} 
                          showButton={this.state.ModalRequest.showButton}
                          closeModal={this.closeModal} />

        </div>

  </div>



  );
}
}
export default App;