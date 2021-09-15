import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link, Redirect} from "react-router-dom";
import ListaLibrosEstudiante from './ListaLibrosEstudiante';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import  {urlBase, urlAPIversion} from "../constants/urls"

const urlLibros = urlAPIversion+"books/";
const urlPrestamos = urlAPIversion+"lends/";
const urlStudents = urlAPIversion+"students/";

const urlLibrosFindAll = urlBase+urlLibros+"findAll";
const urlLibrosSearch  = urlBase+urlLibros+"search";
const urlPrestamosSave    = urlBase+urlPrestamos+"save";
const urlLibrosUpdate  = urlBase+urlLibros+"update";
const urlLibrosDelete  = urlBase+urlLibros+"delete";
const urlStudentsExists = urlBase+urlStudents+"studentExists";

const parametroLibroId = "?libroId=";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  modalCodigo: false,
  redirect: false,
  message: '',
  modalMessage: '',
  studentCode: '',
  form:{
    idEjemplar: '',
    codEstudiante: ''
  },
  search:{
    searchBook: ''
  }
}

peticionGet=()=>{
  this.setState({message: 'Cargando libros...'});
  axios.get(urlLibrosFindAll).then(response=>{
    this.setState({data: response.data});
    this.setState({message: ''});
  }).catch(error=>{
    this.setState({message: error.message});
  })
}

searchGet=()=>{
  
  this.setState({message: 'Cargando libros...'});
  
  axios.get(urlLibrosSearch+'?name='+this.state.search.searchBook).then(response=>{
    
    this.setState({data: response.data});
    this.setState({message: ''});

  }).catch(error=>{
    this.setState({message: error.message});
  })
}

peticionPost=async()=>{

  if(this.state.form.codEstudiante == null){
    this.setState({modalMessage: 'Ingrese el código del estudiante'});
    return;
  }
  
  axios.post(urlPrestamosSave,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    if (error.response) {
      this.setState({modalMessage: error.response.data.message}); 
    }
  })
}

peticionPut=()=>{
  axios.put(urlLibrosUpdate, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete(urlLibrosDelete+parametroLibroId+this.state.form.libroId).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar, modalMessage: ''});
}

setModalEliminar = (value) => {
  this.setState({modalEliminar: value, modalMessage: ''});
}

setModalCodigo = (value) => {
  this.setState({modalCodigo: value, modalMessage:''});
}

seleccionarEmpresa=(libro)=>{
  this.setState({
    message: '',
    tipoModal: 'actualizar',
    form:{
      idLibro: libro.libroId
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

handleCodeChange=async e=>{
  e.persist();
  await this.setState({
      ...this.state,
      [e.target.name]: e.target.value
  });
}

handleChangeSearch=async e=>{
  e.persist();
  await this.setState({
    search:{
      ...this.state.search,
      [e.target.name]: e.target.value
    }
  });
}

validateStudentCode = ()=>{

  axios.get(urlStudentsExists+'?code='+this.state.studentCode).then(response=>{
    if (response.data.exists == 0) {
      this.setState({modalMessage: 'No existe un estudiante con el código ingresado.'})
    }else{
      this.setState({redirect: true}) 
    }
  }).catch(error=>{
    this.setState({modalMessage: error.response.data.message});
  })
}

redirectToLends = ()=>{
  this.setState({redirect: false});
  return <Redirect to={'/Students/Lends/'+this.state.studentCode}/>;
}

validateLoadLends = ()=>{
  if (this.state.studentCode) {
    var exists = this.validateStudentCode();
  }else {
    this.setState({modalMessage: 'Ingrese el código del estudiante.'})
  }
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form, redirect}=this.state;
    
    // Redirecciona a la vista de los préstamos de un estudiante
    if (redirect) {
      return this.redirectToLends();
    }

  return (
    <div className="App">
    <br />  
  <Link class="btn btn-danger" to="/StudentPortal">Volver</Link>
  &nbsp;
  <button className="btn btn-primary" onClick={()=>{this.setModalCodigo(true)}}>Ver mis pr&eacute;stamos</button>
  <br /><br />
    
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <input className="form-control" type="text" name="searchBook" id="searchBook" placeholder="Buscar libro" onChange={this.handleChangeSearch}/>
        <button className="btn btn-primary" onClick={()=>this.searchGet()}><FontAwesomeIcon icon={faSearch}/> Buscar</button>
      </div>
    </div>

    <ListaLibrosEstudiante
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
          
          <label htmlFor="codEstudiante">C&oacute;digo de estudiante</label>
          <input className="form-control" type="text" name="codEstudiante" id="codEstudiante" onChange={this.handleChange} value={form?form.cod: ''}/>
          <br />
          {this.state.modalMessage}
        </div>
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.peticionPost()}>
          Solicitar pr&eacute;stamo
        </button>

        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    
    <Modal isOpen={this.state.modalCodigo}>
      <ModalHeader style={{display: 'block'}}>
        <span style={{float: 'right'}} onClick={()=>this.setModalCodigo(false)}>x</span>
      </ModalHeader>
      <ModalBody>
      <div className="form-group">
          <label htmlFor="studentCode">C&oacute;digo de estudiante</label>
          <input className="form-control" type="text" name="studentCode" id="studentCode" onChange={this.handleCodeChange} value={this.state.studentCode}/>
          <br />
          {this.state.modalMessage}
        </div>
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>this.validateLoadLends()} >
          Ver pr&eacute;stamos
        </button>

        <button className="btn btn-danger" onClick={()=>this.setModalCodigo(false)}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={this.state.modalEliminar}>
      <ModalBody>
          Estás seguro que deseas eliminar el libro "{form && form.nombre}"
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
