import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import  {urlBase, urlAPIversion} from "../constants/urls"

import '../Login.css';

const urlStudents = urlAPIversion+"students/";

const urlFindAll = urlBase+urlStudents+"findAll";
const urlSave    = urlBase+urlStudents+"save";
const urlUpdate  = urlBase+urlStudents+"update";
const urlDelete  = urlBase+urlStudents+"delete";

const parameterId = "?Id=";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    user: '',
    pass: ''
  }
}

peticionGet=()=>{
axios.get(urlFindAll).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  console.log(JSON.stringify(this.state.form))

  if(this.state.form.identificacion == null || this.state.form.idtipoidentificacion == null
    || this.state.form.codigo_estudiantil == null ){
    return;
  }
  
 await axios.post(urlSave,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(urlUpdate, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete(urlDelete+parameterId+this.state.form.idEstudiante).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

setModalEliminar = (value) => {
  this.setState({modalEliminar: value});
}

seleccionarEmpresa=(estudiante)=>{
  this.setState({
    tipoModal: 'actualizar',
    form:{
      idEstudiante: estudiante.idEstudiante,
      nombres: estudiante.nombres,
      apellidos: estudiante.apellidos,
      email: estudiante.email,
      telefono: estudiante.telefono,
      codigo_estudiantil: estudiante.codigo_estudiantil,
      identificacion: estudiante.identificacion,
      idtipoidentificacion: estudiante.idtipoidentificacion
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
console.log(this.state.form);
}


  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  
  <Link class="btn btn-danger" to="/">Volver</Link>
  <br /><br />
  
          <div class="wrapper fadeInDown">
            <div id="formContent">
                <h2 className="active"> Iniciar sesi&oacute;n </h2>

                <form>
                <input type="text" id="user" class="fadeIn second" onChange={this.handleChange} name="user" placeholder="Correo electr&oacute;nico" />
                <input type="text" id="pass" class="fadeIn third" onChange={this.handleChange} name="pass" placeholder="Contrase&ntilde;a" />
                <input type="button" onClick={()=>this.peticionPost()} class="fadeIn fourth" value="Iniciar sesi&oacute;n" />
                </form>

                <div id="formFooter">
                <a class="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div>
        </div>

  </div>



  );
}
}
export default App;