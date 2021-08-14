import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link, Redirect} from "react-router-dom";
import ListaLibros from './ListaLibros';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import  {urlBase, urlAPIversion} from "../constants/urls"

const urlLibros = urlAPIversion+"books/";

const urlLibrosFindAll = urlBase+urlLibros+"findAll";
const urlLibrosSearch  = urlBase+urlLibros+"search";
const urlLibrosSave    = urlBase+urlLibros+"save";
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
    libroId: '',
    nombre: '',
    referencia: '',
    fechaIngreso: '',
    anio: '',
    tipoRegistro: 1,
    numRegistro: '',
    tipoDivulgacion: 1
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
    console.log(error.message);
    this.setState({message: error.message});
  })
}

searchGet=()=>{
  
  this.setState({message: 'Cargando libros...'});
  
  axios.get(urlLibrosSearch+'?name='+this.state.search.searchBook).then(response=>{
    
    this.setState({data: response.data});
    this.setState({message: ''});

  }).catch(error=>{
    console.log(error.message);
    this.setState({message: error.message});
  })
}

peticionPost=async()=>{
  console.log(JSON.stringify(this.state.form))

  if(this.state.form.tipoRegistro == null || this.state.form.tipoDivulgacion == null){
    return;
  }
  
 await axios.post(urlLibrosSave,this.state.form).then(response=>{
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
      libroId: libro.libroId,
      nombre: libro.nombre,
      referencia: libro.referencia,
      fechaIngreso: libro.fechaIngreso,
      anio: libro.anio,
      tipoRegistro: libro.tipoRegistro,
      numRegistro: libro.numRegistro,
      tipoDivulgacion: libro.tipoDivulgacion
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
      <Link className="btn btn-danger" to="/AdminHome">Volver</Link>
      &nbsp;
      <button className="btn btn-primary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Libro</button>
      <br /><br />
        
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <input className="form-control" type="text" name="searchBook" id="searchBook" placeholder="Buscar libro" onChange={this.handleChangeSearch}/>
            <button className="btn btn-primary" onClick={()=>this.searchGet()}><FontAwesomeIcon icon={faSearch}/> Buscar</button>
          </div>
        </div>

        <ListaLibros
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
                        <input className="form-control" type="hidden" name="libroId" id="libroId" readOnly onChange={this.handleChange} value={form?form.libroId: ''}/>
                        
                        <label htmlFor="nombre">Nombre</label>
                        <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre: ''}/>
                        <br />
                        <label htmlFor="referencia">Referencia</label>
                        <input className="form-control" type="text" name="referencia" id="referencia" onChange={this.handleChange} value={form?form.referencia: ''}/>
                        <br />
                        <label htmlFor="anio">Año de publicación</label>
                        <input className="form-control" type="number" name="anio" id="anio" onChange={this.handleChange} value={form?form.anio: ''}/>
                        <br />
                        <label htmlFor="tipoRegistro">Tipo de registro</label>
                        <br />
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="tipoRegistro" id="tipoRegistro1"  onChange={this.handleChange} value="1" checked={form&&form.tipoRegistro==1?true:false} required/>
                          <label className="form-check-label" for="tipoRegistro1">ISBN</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="tipoRegistro" id="tipoRegistro2"  onChange={this.handleChange} value="2" checked={form&&form.tipoRegistro==2?true:false}/>
                          <label className="form-check-label" for="tipoRegistro2">ISSN</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="tipoRegistro" id="tipoRegistro3"  onChange={this.handleChange} value="3" checked={form&&form.tipoRegistro==3?true:false}/>
                          <label className="form-check-label" for="tipoRegistro3">OTRO</label>
                        </div>
                        <br />
                        <br />
                        <label htmlFor="numRegistro">Número de registro</label>
                        <input className="form-control" type="text" name="numRegistro" id="numRegistro" onChange={this.handleChange} value={form?form.numRegistro: ''}/>
                        <br />
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="tipoDivulgacion" id="tipoDivulgacion1"  onChange={this.handleChange} value="1" checked={form&&form.tipoDivulgacion==1?true:false} required/>
                          <label className="form-check-label" for="tipoDivulgacion1">PAPEL</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="tipoDivulgacion" id="tipoDivulgacion2"  onChange={this.handleChange} value="2" checked={form&&form.tipoDivulgacion==2?true:false}/>
                          <label className="form-check-label" for="tipoDivulgacion2">CD</label>
                        </div>
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      {this.state.tipoModal=='insertar'?
                        <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                        Insertar
                      </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                        Actualizar
                      </button>
      }
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
