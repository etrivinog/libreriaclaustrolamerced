import React, { Component } from 'react';
import '../../../App.css';
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link} from "react-router-dom";
import ListaTesis from './ListaTesis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import  {urlBase, urlAPIversion} from "../../../constants/urls"

const urlTesis = urlAPIversion+"tesis/";

const urlTesisFindAll = urlBase+urlTesis+"findAll";
const urlTesisSearch  = urlBase+urlTesis+"search";

const parametroLibroId = "?recursoId=";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  message: '',
  form:{
    idEjemplar: '',
    codEstudiante: ''
  },
  search:{
    searchPhrase: ''
  }
}

peticionGet=()=>{
  this.setState({message: 'Cargando tesis...'});
  axios.get(urlTesisFindAll).then(response=>{
    this.setState({data: response.data});
    this.setState({message: ''});
  }).catch(error=>{
    console.log(error.message);
    this.setState({message: error.message});
  })
}

searchGet=()=>{
  
  // borra los datos en memoria y obtiene los datos de la búsqueda
  this.setState({data: []});
  this.setState({message: 'Cargando tesis...'});
  
  axios.get(urlTesisSearch+'?tittle='+this.state.search.searchPhrase).then(response=>{
    
    this.setState({data: response.data});
    this.setState({message: ''});

  }).catch(error=>{
    console.log(error.message);
    this.setState({message: error.message});
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

setModalEliminar = (value) => {
  this.setState({modalEliminar: value});
}

seleccionarEmpresa=(libro)=>{
  this.setState({
    tipoModal: 'actualizar',
    form:{
      idEjemplar: libro.libroId
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

handleChangeSearch=async e=>{
  e.persist();
  await this.setState({
    search:{
      ...this.state.search,
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
  <Link class="btn btn-danger" to="/StudentPortal">Volver</Link>
  <br /><br />
    
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <input className="form-control" type="text" name="searchPhrase" id="searchPhrase" placeholder="Buscar tesis" onChange={this.handleChangeSearch}/>
        <button className="btn btn-primary" onClick={()=>this.searchGet()}><FontAwesomeIcon icon={faSearch}/> Buscar</button>
      </div>
    </div>

    <ListaTesis
      state = {this.state}
      seleccionarEmpresa = {this.seleccionarEmpresa}
      modalInsertar = {this.modalInsertar}
      setModalEliminar = {this.setModalEliminar}
      message = {this.state.message} />

  </div>



  );
}
}
export default App;
