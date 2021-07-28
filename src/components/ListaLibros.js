import React from'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ListaLibros = ({state, seleccionarEmpresa, modalInsertar, setModalEliminar, message}) => {
    return (
      <div>
        <table className="table ">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Referencia</th>
              <th>Disponibles</th>
              <th>Año de publicación</th>
              <th>Tipo de registro</th>
              <th>Número de registro</th>
              <th>Tipo de divulgación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map(libro=>{
              return(
                <tr>
              <td>{libro.nombre}</td>
              <td>{libro.referencia}</td>
              <td>{libro.disponibles}</td>
              <td>{libro.anio}</td>
              <td>{libro.tipoRegistro==1?"ISBN":libro.tipoRegistro==2?"ISSN":"OTRO"}</td>
              <td>{libro.numRegistro}</td>
              <td>{libro.tipoDivulgacion==1?"PAPEL":libro.tipoDivulgacion==2?"CD":""}</td>
              <td>
                    <button className="btn btn-primary" onClick={()=>{seleccionarEmpresa(libro); modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{seleccionarEmpresa(libro); setModalEliminar(true)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                    </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        {message? <a className="option">{message}</a> :'' }
      </div>
    )
}

export default ListaLibros