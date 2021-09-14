import React, { Component } from 'react';
import '../../App.css';
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link, useParams} from "react-router-dom";
import TesisList from './TesisList';

import  {urlBase, urlAPIversion} from "../../constants/urls"

const urlejemplar = urlAPIversion+"tesis/";

const urlFindAll    = urlBase+urlejemplar+"findAll";
const search        = urlBase+urlejemplar+"search";
const urlSave       = urlBase+urlejemplar+"save";
const urlUpdate     = urlBase+urlejemplar+"update";
const urlDelete     = urlBase+urlejemplar+"delete";

const parameterId = "?recursoId=";

class App extends Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    message: '',
    form:{
      recursoId: '',
      cohorteCade: '',
      cohorteNal: '',
      titulo: '',
      lineaFormacion: '',
      directorNacional: '',
      directorInternac: '',
      enlace: ''
    }
  }

  peticionGet=()=>{
    
    this.setState({message: 'Cargando ejemplares...'});

    axios.get(urlFindAll).then(response=>{

      this.setState({data: response.data});
      this.setState({message: ''});

    }).catch(error=>{
      console.log(error.message);
      this.setState({message: error.message});
    })
  }

  peticionPost=async()=>{

    var form = this.state.form;
    form.libroid = this.state.bookId;
    
    console.log(JSON.stringify(this.state.form))

    await axios.post(urlSave,form).then(response=>{
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
    axios.delete(urlDelete+parameterId+this.state.form.recursoId).then(response=>{
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

  seleccionarTesis=(recurso)=>{
    this.setState({
      tipoModal: 'actualizar',
      form:{
        recursoId: recurso.recursoId,
        cohorteCade: recurso.cohorteCade,
        cohorteNal: recurso.cohorteNal,
        titulo: recurso.titulo,
        lineaFormacion: recurso.lineaFormacion,
        directorNacional: recurso.directorNacional,
        directorInternac: recurso.directorInternac,
        enlace: recurso.enlace
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
    const {form, bookId}=this.state;
    
  return (
    <div className="App">
    <br />
  <Link class="btn btn-danger" to="/AdminHome">Volver</Link>
  &nbsp;
  <button className="btn btn-primary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Tesis</button>
  <br /><br />
  
    <TesisList
      state = {this.state}
      seleccionarTesis = {this.seleccionarTesis}
      modalInsertar = {this.modalInsertar}
      setModalEliminar = {this.setModalEliminar}
      message = {this.state.message} />

    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <input className="form-control" type="hidden" name="recursoId" id="recursoId" readOnly onChange={this.handleChange} value={form?form.recursoId: ''}/>
                    
                    <label htmlFor="nombres">Título de la tesis</label>
                    <input className="form-control" type="text" name="titulo" id="titulo" onChange={this.handleChange} value={form?form.titulo: ''}/>
                    <br />
                    <label htmlFor="nombres">Cohorte CADE</label>
                    <input className="form-control" type="text" name="cohorteCade" id="cohorteCade" onChange={this.handleChange} value={form?form.cohorteCade: ''}/>
                    <br />
                    <label htmlFor="nombres">Cohorte Nal</label>
                    <input className="form-control" type="text" name="cohorteNal" id="cohorteNal" onChange={this.handleChange} value={form?form.cohorteNal: ''}/>
                    <br />
                    <label htmlFor="nombres">Linea de formación</label>
                    <input className="form-control" type="text" name="lineaFormacion" id="lineaFormacion" onChange={this.handleChange} value={form?form.lineaFormacion: ''}/>
                    <br />
                    <label htmlFor="nombres">Director nacional</label>
                    <input className="form-control" type="text" name="directorNacional" id="directorNacional" onChange={this.handleChange} value={form?form.directorNacional: ''}/>
                    <br />
                    <label htmlFor="nombres">Director internacional</label>
                    <input className="form-control" type="text" name="directorInternac" id="directorInternac" onChange={this.handleChange} value={form?form.directorInternac: ''}/>
                    <br />
                    <label htmlFor="nombres">Enlace externo</label>
                    <input className="form-control" type="text" name="enlace" id="enlace" onChange={this.handleChange} value={form?form.enlace: ''}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {
                    this.state.tipoModal=='insertar'?
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
               Estás seguro que deseas eliminar la tesis [{form && form.titulo}]
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
