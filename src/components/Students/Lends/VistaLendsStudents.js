import React, { Component } from 'react';
import '../../../App.css';
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link, useParams} from "react-router-dom";
import ListaLendsStudents from './ListaLendsStudents';

import  {urlBase, urlAPIversion} from "../../../constants/urls"

const urlPrestamo = urlAPIversion+"lends/";

const urlFindAll  = urlBase+urlPrestamo+"findByStudentCode";
const urlUpdate   = urlBase+urlPrestamo+"update";

const studentCodeParam = "?code=";

class App extends Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    message: '',
    studentCode: '',
    form:{
      idEjemplar: '',
      descripcion: '',
      libroid: '',
      idestado: ''
    }
  }

  peticionGet=()=>{
    
    this.setState({message: 'Cargando préstamos...', studentCode: this.props.match.params.studentCode});

    axios.get(urlFindAll+studentCodeParam+this.props.match.params.studentCode).then(response=>{

      this.setState({data: response.data});
      this.setState({message: ''});

    }).catch(error=>{
      this.setState({message: error.response.data.message});
    })
  }

  peticionPut=()=>{
    axios.put(urlUpdate, this.state.form).then(response=>{
      this.modalInsertar();
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
    this.peticionGet();
  }
  

  render(){
    const {form, studentCode}=this.state;
    
  return (
    <div className="App">
    <br />
    <p><h3>Pr&eacute;stamos del estudiante [{studentCode}]</h3></p>
  <Link class="btn btn-danger" to="/Students/Books">Volver</Link>
  <br /><br />
  
    <ListaLendsStudents
      state = {this.state}
      seleccionarEjemplar = {this.seleccionarEjemplar}
      modalInsertar = {this.modalInsertar}
      setModalEliminar = {this.setModalEliminar}
      message = {this.state.message} />

      <Modal isOpen={this.state.modalEliminar}>
        <ModalBody>
            Estás seguro que deseas eliminar el pr&eacute;stamo [{form && form.idprestamos}]
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
