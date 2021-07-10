import React, { Component } from 'react';
import '../App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {Link} from "react-router-dom";
import ListaLibrosEstudiante from './ListaLibrosEstudiante';

const urlBase = "https://hemerotecaudc.herokuapp.com/";
//const urlBase = "http://localhost:8080/";

const urlLibros = "api/v1/books/";

const urlLibrosFindAll = urlBase+urlLibros+"findAll";
const urlLibrosSave    = urlBase+urlLibros+"save";
const urlLibrosUpdate  = urlBase+urlLibros+"update";
const urlLibrosDelete  = urlBase+urlLibros+"delete";

const parametroLibroId = "?libroId=";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    libroId: '',
    nombre: '',
    referencia: '',
    fechaIngreso: '',
    anio: '',
    tipoRegistro: 1,
    numRegistro: '',
    tipoDivulgacion: 1
  }
}

peticionGet=()=>{
axios.get(urlLibrosFindAll).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  console.log(JSON.stringify(this.state.form))
  
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
  
  <Link class="btn btn-danger" to="/">Ir a inicio</Link>
  &nbsp;
  <button className="btn btn-primary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Solicitar pr&eacute;stamo</button>
  <br /><br />
  
    <ListaLibrosEstudiante
      state = {this.state}
      seleccionarEmpresa = {this.seleccionarEmpresa}
      modalInsertar = {this.modalInsertar}
      setModalEliminar = {this.setModalEliminar} />

    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
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
