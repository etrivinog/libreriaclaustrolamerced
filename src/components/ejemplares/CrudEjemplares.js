import React, { Component } from 'react';
import '../../App.css';
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link, useParams} from "react-router-dom";
import EjemplaresList from './EjemplaresList';

import  {urlBase, urlAPIversion} from "../../constants/urls"

const urlejemplar = urlAPIversion+"ejemplar/";

const urlFindAll    = urlBase+urlejemplar+"findAll";
const urlFindByBook = urlBase+urlejemplar+"findByBook";
const urlSave       = urlBase+urlejemplar+"save";
const urlUpdate     = urlBase+urlejemplar+"update";
const urlDelete     = urlBase+urlejemplar+"delete";

const parameterId = "?idEjemplar=";
const bookParameter = "?book=";

class App extends Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    message: '',
    form:{
      idEjemplar: '',
      descripcion: '',
      libroid: '',
      idestado: ''
    }
  }

  peticionGet=()=>{
    
    this.setState({message: 'Cargando ejemplares...'});

    axios.get(urlFindByBook+bookParameter+this.props.match.params.bookId).then(response=>{

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
    axios.delete(urlDelete+parameterId+this.state.form.idEjemplar).then(response=>{
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

  seleccionarEjemplar=(ejemplar)=>{
    this.setState({
      tipoModal: 'actualizar',
      form:{
        idEjemplar: ejemplar.idEjemplar,
        descripcion: ejemplar.descripcion,
        libroid: ejemplar.libroid,
        idestado: ejemplar.idestado
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
    
    this.setState({bookId: this.props.match.params.bookId})
    this.peticionGet();
  }
  

  render(){
    const {form, bookId}=this.state;
    
  return (
    <div className="App">
    <br />
    <p><h3>Ejemplares del libro [{bookId}]</h3></p>
  <Link class="btn btn-danger" to="/ManageBooks">Volver</Link>
  &nbsp;
  <button className="btn btn-primary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Ejemplar</button>
  <br /><br />
  
    <EjemplaresList
      state = {this.state}
      seleccionarEjemplar = {this.seleccionarEjemplar}
      modalInsertar = {this.modalInsertar}
      setModalEliminar = {this.setModalEliminar}
      message = {this.state.message} />

    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <input className="form-control" type="hidden" name="idEjemplar" id="idEjemplar" readOnly onChange={this.handleChange} value={form?form.idejemplar: ''}/>
                    
                    <label htmlFor="nombres">Referencia</label>
                    <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} value={form?form.descripcion: ''}/>
                    <br />
                    <input className="form-control" type="hidden" name="libroid" id="libroid" onChange={this.handleChange} value={bookId?bookId : form?form.libroid: ''}/>
                      <input class="form-check-input" type="hidden" name="idestado" id="idestado1"  onChange={this.handleChange} value="1" checked={form?form.idestado: ''} required/>
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
               Estás seguro que deseas eliminar el Ejemplar [{form && form.descripcion}]
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
