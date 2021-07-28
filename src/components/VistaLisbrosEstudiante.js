import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link} from "react-router-dom";
import ListaLibrosEstudiante from './ListaLibrosEstudiante';

import  {urlBase, urlAPIversion} from "../constants/urls"

const urlLibros = urlAPIversion+"books/";
const urlPrestamos = urlAPIversion+"lends/";

const urlLibrosFindAll = urlBase+urlLibros+"findAll";
const urlPrestamosSave    = urlBase+urlPrestamos+"save";
const urlLibrosUpdate  = urlBase+urlLibros+"update";
const urlLibrosDelete  = urlBase+urlLibros+"delete";

const parametroLibroId = "?libroId=";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  message: '',
  form:{
    idEjemplar: '',
    codEstudiante: ''
  }
}

peticionGet=()=>{
  this.setState({message: 'Cargando libros...'});
  axios.get(urlLibrosFindAll).then(response=>{
    this.setState({data: response.data});
    this.setState({message: ''});
  }).catch(error=>{
    console.log(error.message);
    this.setState({message: error.message});
  })
}

peticionPost=async()=>{
  console.log(JSON.stringify(this.state.form))
  
 await axios.post(urlPrestamosSave,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
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

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  
  <Link class="btn btn-danger" to="/">Salir</Link>
  &nbsp;
  <Link className="btn btn-primary" to="#" onClick={()=>{}}>Ver mis pr&eacute;stamos</Link>
  <br /><br />
  
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
                  </div>
                </ModalBody>

                <ModalFooter>
                  <button className="btn btn-primary" onClick={()=>this.peticionPost()}>
                    Solicitar pr&eacute;stamo
                  </button>
  
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
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
