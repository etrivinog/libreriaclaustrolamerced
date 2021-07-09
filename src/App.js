import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import CrudLibros from './components/CrudLibros';

//const urlBase = "https://hemerotecaudc.herokuapp.com/";
const urlBase = "http://localhost:8080/";

const urlLibros = "api/v1/books/";

const urlLibrosFindAll = urlBase+urlLibros+"findAll";
const urlLibrosSave    = urlBase+urlLibros+"save";
const urlLibrosUpdate  = urlBase+urlLibros+"update";
const urlLibrosDelete  = urlBase+urlLibros+"delete";

const parametroLibroId = "?libroId=";

class App extends Component {

  render(){
   
  return (
    <div className="App">

      <CrudLibros/>
      
    </div>



  );
}
}
export default App;
