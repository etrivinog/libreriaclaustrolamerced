import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ListaLibros from './components/ListaLibros';

const urlLibrosFindAll="http://localhost:8080/api/v1/books/findAll";
const urlLibrosSave   ="http://localhost:8080/api/v1/books/save";

class App extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
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
  const requestOptions = {
      method: 'POST',
      headers: { 
                  'Content-Type': 'application/json'
                },
      body: JSON.stringify(this.state.form)
  };
  const response = await fetch(urlLibrosSave, requestOptions);
  const data = await response.json();
      
 /*await axios.post(urlLibrosSave,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })*/
}

peticionPut=()=>{
  axios.put(urlLibrosFindAll+this.state.form.id, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
  axios.delete(urlLibrosFindAll+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarEmpresa=(empresa)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: empresa.id,
      nombre: empresa.nombre,
      pais: empresa.pais,
      capital_bursatil: empresa.capital_bursatil
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
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Libro</button>
  <br /><br />
    <ListaLibros state = {this.state} />



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="nombre">Nombre</label>
                    <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre: ''}/>
                    <br />
                    <label htmlFor="referencia">Referencia</label>
                    <input className="form-control" type="text" name="referencia" id="referencia" onChange={this.handleChange} value={form?form.referencia: ''}/>
                    <br />
                    <label htmlFor="fechaIngreso">Fecha de ingreso</label>
                    <input className="form-control" type="text" name="fechaIngreso" id="fechaIngreso" onChange={this.handleChange} value={form?form.fechaIngreso: ''}/>
                    <br />
                    <label htmlFor="anio">Año de publicación</label>
                    <input className="form-control" type="text" name="anio" id="anio" onChange={this.handleChange} value={form?form.anio: ''}/>
                    <br />
                    <label htmlFor="tipoRegistro">Tipo de registro</label>
                    <input className="form-control" type="number" name="tipoRegistro" id="tipoRegistro" onChange={this.handleChange} />
                    <br />
                    <label htmlFor="numRegistro">Número de registro</label>
                    <input className="form-control" type="text" name="numRegistro" id="numRegistro" onChange={this.handleChange}/>
                    <br />
                    <label htmlFor="tipoDivulgacion">Tipo de divulgación</label>
                    <input className="form-control" type="number" name="tipoDivulgacion" id="tipoDivulgacion" onChange={this.handleChange} />
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
               Estás seguro que deseas eliminar a la empresa {form && form.nombre}
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
