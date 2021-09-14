import React, { Component } from 'react';
import '../../App.css';
import axios from "axios";
import {Col, Modal, ModalBody, ModalFooter, ModalHeader,FormGroup, Label, Input } from 'reactstrap';
import {Link} from "react-router-dom";
import LendsList from './LendsList';

import  {urlBase, urlAPIversion} from "../../constants/urls"

const urlLends = urlAPIversion+"lends/";
const urlEjemplar = urlAPIversion+"ejemplar/";

const urlGetCopyDescByBook = urlBase+urlEjemplar+"getCopyDescByBook";

const urlFindAll = urlBase+urlLends+"findAll";
const urlSave    = urlBase+urlLends+"save";
const urlApprove  = urlBase+urlLends+"approve";
const urlReject  = urlBase+urlLends+"reject";
const urlEnd  = urlBase+urlLends+"finalize";

const parameterId = "?idprestamos=";
const ejemplarParam = "&idEjemplar=";
const bookId = "?book=";

class App extends Component {
state={
  data:[],
  copyDescs:[],
  modalInsertar: false,
  modalEliminar: false,
  modalFinalizar: false,
  message: '',
  activeBtn: true,
  form:{
      idprestamos: '',
      fechaInicio: '',
      fechaFin: '',
      ejemplarDesc: '',
      idEjemplar: '',
      libroTittle: '',
      idLibro: '',
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

getCopyDescByBook=(idLibro)=>{

  this.setState({message: 'Consultando ejemplares...', activeBtn: true});
  console.log(JSON.stringify(this.state));
  axios.get(urlGetCopyDescByBook+bookId+idLibro).then(response=>{

    if (response.data.length === 0) {
      this.setState({message: 'No hay ejemplares disponibles para este libro.', activeBtn: false});
    }else{
      this.setState({copyDescs: response.data});
      this.setState({message: ''});
    }

  }).catch(error=>{
    console.log(error.message);
    this.setState({message: error.message});
  })
}

peticionPost=async()=>{

  if(this.state.form.identificacion == null || this.state.form.idtipoidentificacion == null
    || this.state.form.codigo_estudiantil == null ){
    return;
  }
  
  axios.post(urlSave,this.state.form).then(response=>{
    this.peticionGet();
    this.modalInsertar();
  }).catch(error=>{
    console.log(error.response.message);
  })
}

approveLend=()=>{
  if (this.state.activeBtn) {
    axios.put(urlApprove+'?idprestamos='+this.state.form.idprestamos+ejemplarParam+this.state.form.idEjemplar).then(response=>{
      this.setState({copyDescs: []});
      this.peticionGet();
      this.modalInsertar();
    }).catch(error=>{this.setState({message: error.response.data.message})}) 
  }else{
    this.setState({message: 'No es posible aprobar el préstamo.'})
  }
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

  console.log(JSON.stringify(prestamo))
  this.setState({
    tipoModal: 'actualizar',
    form:{
      idprestamos: prestamo.idprestamos,
      fechaInicio: prestamo.fechaInicio,
      fechaFin: prestamo.fechaFin,
      ejemplarDesc: prestamo.ejemplarDesc,
      idEjemplar: prestamo.idEjemplar,
      libroTittle: prestamo.libroTittle,
      idLibro: prestamo.idLibro,
      codEstudiante: prestamo.codEstudiante,
      estado: prestamo.estado
    }
  })
    
  // Obtiene las descripciones de los ejemplares del libro
  this.getCopyDescByBook(prestamo.idLibro);

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
    <br />
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
                  <div className="form-group">
                    <input className="form-control" type="hidden" name="idPrestamos" id="idPrestamos" readOnly onChange={this.handleChange} value={form?form.idPrestamos: ''}/>
                    <FormGroup>
                      <Col sm={10}>Seleccione el ejemplar a prestar:
                      <br />
                      {
                        this.state.copyDescs.map(copy =>{
                          return (
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="idEjemplar" id={'ejemplar'+copy.idejemplar}  onChange={this.handleChange} value={copy.idejemplar} checked={form&&form.idEjemplar==copy.idejemplar?true:false} required/>
                            <label className="form-check-label" for={'ejemplar'+copy.idejemplar}>{copy.descripcion}</label>
                          </div>
                        )
                        }
                      )
                      }
                      </Col>
                      {this.state.message}
                    </FormGroup>
                    <input className="form-control" type="hidden" name="estado" id="estado" onChange={this.handleChange} value="A"/>

                  </div>
                </ModalBody>

                <ModalFooter>
                  {
                    this.state.tipoModal=='insertar'?
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
