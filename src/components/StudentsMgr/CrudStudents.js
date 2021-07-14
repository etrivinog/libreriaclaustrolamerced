import React, { Component } from 'react';
import '../../App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
  form:{
    idEstudiante: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    codigo_estudiantil: '',
    identificacion: '',
    idtipoidentificacion: ''
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

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  
  <Link class="btn btn-danger" to="/AdminHome">Volver</Link>
  &nbsp;
  <button className="btn btn-primary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Estudiante</button>
  <br /><br />
  
    <StudentsList
      state = {this.state}
      seleccionarEmpresa = {this.seleccionarEmpresa}
      modalInsertar = {this.modalInsertar}
      setModalEliminar = {this.setModalEliminar} />

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
                    <label htmlFor="apellidos">Apellidos</label>
                    <input className="form-control" type="text" name="apellidos" id="apellidos" onChange={this.handleChange} value={form?form.apellidos: ''}/>
                    <br />
                    <label htmlFor="email">Correo electr&oacute;nico</label>
                    <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={form?form.email: ''}/>
                    <br />
                    <label htmlFor="telefono">Telefono</label>
                    <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono: ''}/>
                    <br />
                    <label htmlFor="codigo_estudiantil">C&oacute;digo de estudiante</label>
                    <input className="form-control" type="text" name="codigo_estudiantil" id="codigo_estudiantil" onChange={this.handleChange} value={form?form.codigo_estudiantil: ''}/>
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
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="idtipoidentificacion" id="idtipoidentificacion2"  onChange={this.handleChange} value="2" checked={form&&form.idtipoidentificacion==2?true:false}/>
                      <label class="form-check-label" for="idtipoidentificacion2">Tarjeta de identidad</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="idtipoidentificacion" id="idtipoidentificacion3"  onChange={this.handleChange} value="3" checked={form&&form.idtipoidentificacion==3?true:false}/>
                      <label class="form-check-label" for="idtipoidentificacion3">Pasaporte</label>
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
