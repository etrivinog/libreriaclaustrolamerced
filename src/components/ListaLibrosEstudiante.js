import React from'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEdit, faHandPointUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ListaLibros = ({state, seleccionarEmpresa, modalInsertar, setModalEliminar}) => {
    return (
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
                <button tooltip="Seleccionar para pr&eacute;stamo" className="btn btn-primary" onClick={()=>{seleccionarEmpresa(libro); modalInsertar()}}>Prestar</button>
          </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    )
}

export default ListaLibros