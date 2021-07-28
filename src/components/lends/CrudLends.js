import React, { Component } from 'react';
import '../../App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link} from "react-router-dom";
import LendsList from './LendsList';

import  {urlBase, urlAPIversion} from "../../constants/urls"

const urlLends = urlAPIversion+"lends/";

const urlFindAll = urlBase+urlLends+"findAll";
const urlSave    = urlBase+urlLends+"save";
const urlApprove  = urlBase+urlLends+"approve";
const urlReject  = urlBase+urlLends+"reject";
const urlEnd  = urlBase+urlLends+"finalize";

const parameterId = "?idprestamos=";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  modalFinalizar: false,
  message: '',
  form:{
    idprestamos: '',
    fechaInicio: '',
    fechaFin: '',
    idEjemplar: '',
    codEstudiante: '',
    estado: ''
  }
}

peticionGet=()=>{

  this.setState({message: 'Cargando préstamos...'});

  axios.get(urlFindAll).then(response=>{

    this.setState({data: response.data});
    this.setState({message: ''});
    
  }).catch(error=>{
    console.log(error.message);
    this.setState({message: error.message});
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

approveLend=()=>{
  axios.put(urlApprove+'?idprestamos='+this.state.form.idprestamos).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

rejectLend=()=>{
  axios.delete(urlReject+parameterId+this.state.form.idprestamos).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

finalizeLend=()=>{
  axios.delete(urlEnd+parameterId+this.state.form.idprestamos).then(response=>{
    this.setState({modalFinalizar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

setModalEliminar = (value) => {
  this.setState({modalEliminar: value});
}

setModalFinalizar = (value) => {
  this.setState({modalFinalizar: value});
}

seleccionarEmpresa=(prestamo)=>{
  this.setState({
    tipoModal: 'actualizar',
    form:{
      idprestamos: prestamo.idprestamos,
      fechaInicio: prestamo.fechaInicio,
      fechaFin: prestamo.fechaFin,
      idEjemplar: prestamo.idEjemplar,
      codEstudiante: prestamo.codEstudiante,
      estado: prestamo.estado
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
  
  <Link class="btn btn-danger" to="/AdminHome">Volver</Link>
  <br /><br />
  
    <LendsList
      state = {this.state}
      seleccionarEmpresa = {this.seleccionarEmpresa}
      modalInsertar = {this.modalInsertar}
      setModalEliminar = {this.setModalEliminar} 
      setModalFinalizar = {this.setModalFinalizar}
      message = {this.state.message} />

    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                ¿Está seguro que desea aprobar la solicitud de pr&eacute;stamo?
                  <div className="form-group">
                    <input className="form-control" type="hidden" name="idPrestamos" id="idPrestamos" readOnly onChange={this.handleChange} value={form?form.idPrestamos: ''}/>
                    
                    <input className="form-control" type="hidden" name="estado" id="estado" onChange={this.handleChange} value="A"/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.approveLend()}>
                    Aprobar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
              ¿Está seguro que desea rechazar la solicitud de pr&eacute;stamo?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.rejectLend()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>

          
          <Modal isOpen={this.state.modalFinalizar}>
            <ModalBody>
              ¿Está seguro que desea Finalizar el pr&eacute;stamo?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-success" onClick={()=>this.finalizeLend()}>Finalizar</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalFinalizar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default App;
