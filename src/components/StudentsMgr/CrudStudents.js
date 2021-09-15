import React, { Component } from 'react';
import '../../App.css';
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link} from "react-router-dom";
import StudentsList from './StudentsList';

import  {urlBase, urlAPIversion} from "../../constants/urls"

const urlStudents = urlAPIversion+"students/";

const urlFindAll = urlBase+urlStudents+"findAll";
const urlSave    = urlBase+urlStudents+"save";
const urlUpdate  = urlBase+urlStudents+"update";
const urlDelete  = urlBase+urlStudents+"delete";

const parameterId = "?idEstudiante=";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  validEmail: false,
  validName: false,
  validLastName: false,
  message: '',
  modalMessage: '',
  emailMessage: '',
  nameMessage: '',
  lastNameMessage: '',
  form:{
    idEstudiante: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    codigoestudiantil: '',
    identificacion: '',
    idtipoidentificacion: ''
  }
}

peticionGet=()=>{
  
  this.setState({message: 'Cargando estudiantes...'});

  axios.get(urlFindAll).then(response=>{

    this.setState({data: response.data});
    this.setState({message: ''});

  }).catch(error=>{
    this.setState({message: error.message});
  })
}

validateForm = ()=>{
  
  this.validateEmail(this.state.form?this.state.form.email:'-');
  this.validateName(this.state.form?this.state.form.nombres:'-');
  this.validateLastName(this.state.form?this.state.form.apellidos:'-');

  console.log(this.state);

  if( this.state.validEmail == false
      || this.state.validName == false
      || this.state.validLastName == false
      || this.state.form.nombres == null
      || this.state.form.nombres == ''
      || this.state.form.apellidos == null
      || this.state.form.apellidos == ''
      || this.state.form.email == null
      || this.state.form.email == ''
      || this.state.form.telefono == null
      || this.state.form.telefono == ''
      || this.state.form.codigoestudiantil == null
      || this.state.form.codigoestudiantil == ''
      || this.state.form.identificacion == null
      || this.state.form.identificacion == ''
      || this.state.form.idtipoidentificacion == null
      || this.state.form.idtipoidentificacion == '' ){

    this.setState({modalMessage: 'Verifique que todos los campos se encuentren diligenciados correctamente.'});
    return false;

  }

  return true;
  
}

peticionPost=async()=>{

  if(this.validateForm()){

    await axios.post(urlSave,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
      this.setState({emailMessage: '', modalMessage: '', nameMessage:'', emailMessage:'', validEmail: false, 
                            validName: false, validLastName: false});
    })

  }
}

peticionPut=()=>{
  if (this.validateForm()) {
    axios.put(urlUpdate, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
}

peticionDelete=()=>{
  axios.delete(urlDelete+parameterId+this.state.form.idEstudiante).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar, emailMessage: '', modalMessage: ''});
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
      codigoestudiantil: estudiante.codigoestudiantil,
      identificacion: estudiante.identificacion,
      idtipoidentificacion: estudiante.idtipoidentificacion
    }
  })
}

validateEmail = (email) => {

  if(email != null && email != ''){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(email)){
      this.setState({validEmail: true, emailMessage: ''});
    }else{
      this.setState({validEmail: false, emailMessage: 'El email tiene un formato incorrecto.'});
    }
  }
}

validateName = (name) => {

  if(name != null && name != ''){
    const re = /^(([a-zA-Z]{2,}))$/;
    
    if (re.test(name)){
      this.setState({validName: true, nameMessage: ''});
    }else{
      this.setState({validName: false, nameMessage: 'El nombre tiene un formato incorrecto.'});
    }
  }
}

validateLastName = (lastName) => {

  if(lastName != null && lastName != ''){
    const re = /^(([a-zA-Z]{2,}))$/;
    
    if (re.test(lastName)){
      this.setState({validLastName: true, lastNameMessage: ''});
    }else{
      this.setState({validLastName: false, lastNameMessage: 'El apellido tiene un formato incorrecto.'});
    }
  }
}

handleChange=async e=>{
  
  if(e.target.id == 'email'){
    this.validateEmail(e.target.value);
  }else if(e.target.id == 'nombres'){
    this.validateName(e.target.value);
  }else if(e.target.id == 'apellidos'){
    this.validateLastName(e.target.value);
  }

  e.persist();
  await this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  });

}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br />
  <Link class="btn btn-danger" to="/AdminHome">Volver</Link>
  &nbsp;
  <button className="btn btn-primary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Estudiante</button>
  <br /><br />
  
    <StudentsList
      state = {this.state}
      seleccionarEmpresa = {this.seleccionarEmpresa}
      modalInsertar = {this.modalInsertar}
      setModalEliminar = {this.setModalEliminar}
      message = {this.state.message} />

    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <input className="form-control" type="hidden" name="idEstudiante" id="idEstudiante" readOnly onChange={this.handleChange} value={form?form.idEstudiante: ''}/>
                    
                    <label htmlFor="nombres">Nombres</label>
                    <input className="form-control" type="text" name="nombres" id="nombres" onChange={this.handleChange} value={form?form.nombres: ''}/>
                    <br />
                    <div className="valMessage">{this.state.nameMessage}</div>
                    <br />
                    <label htmlFor="apellidos">Apellidos</label>
                    <input className="form-control" type="text" name="apellidos" id="apellidos" onChange={this.handleChange} value={form?form.apellidos: ''}/>
                    <br />
                    <div className="valMessage">{this.state.lastNameMessage}</div>
                    <br />
                    <label htmlFor="email">Correo electr&oacute;nico</label>
                    <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={form?form.email: ''}/>
                    <br />
                    <div className="valMessage">{this.state.emailMessage}</div>
                    <br />
                    <label htmlFor="telefono">Telefono</label>
                    <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono: ''}/>
                    <br />
                    <label htmlFor="codigoestudiantil">C&oacute;digo de estudiante</label>
                    <input className="form-control" type="text" name="codigoestudiantil" id="codigoestudiantil" onChange={this.handleChange} value={form?form.codigoestudiantil: ''}/>
                    <br />
                    <label htmlFor="identificacion">Identificaci&oacute;n</label>
                    <input className="form-control" type="text" name="identificacion" id="identificacion" onChange={this.handleChange} value={form?form.identificacion: ''}/>
                    <br />
                    <br />
                    <label htmlFor="idtipoidentificacion">Tipo de identificaci&oacute;n</label>
                    <br />
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="idtipoidentificacion" id="idtipoidentificacion1"  onChange={this.handleChange} value="1" checked={form&&form.idtipoidentificacion==1?true:false} required/>
                      <label class="form-check-label" for="idtipoidentificacion1">C&eacute;dula de ciudadanía</label>
                    </div>
                    <br />
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="idtipoidentificacion" id="idtipoidentificacion2"  onChange={this.handleChange} value="2" checked={form&&form.idtipoidentificacion==2?true:false}/>
                      <label class="form-check-label" for="idtipoidentificacion2">Tarjeta de identidad</label>
                    </div>
                    <br />
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="idtipoidentificacion" id="idtipoidentificacion3"  onChange={this.handleChange} value="3" checked={form&&form.idtipoidentificacion==3?true:false}/>
                      <label class="form-check-label" for="idtipoidentificacion3">Pasaporte</label>
                    </div>
                    <br /><br />
                    <div className="valMessage">{this.state.modalMessage}</div>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Guardar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar el Estudiante "{form && form.nombres}"
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default App;
