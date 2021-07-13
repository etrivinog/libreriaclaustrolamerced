import React from'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const StudentsList = ({state, seleccionarEmpresa, modalInsertar, setModalEliminar}) => {
    return (
        <table className="table ">
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Correo electr&oacute;nico</th>
          <th>Telefono</th>
          <th>C&oacute;digo de estudiante</th>
          <th>Identificaci&oacute;n</th>
          <th>Tipo de identificaci&oacute;n</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {state.data.map(estudiante=>{
          return(
            <tr>
          <td>{estudiante.nombres}</td>
          <td>{estudiante.apellidos}</td>
          <td>{estudiante.email}</td>
          <td>{estudiante.telefono}</td>
          <td>{estudiante.codigo_estudiantil}</td>
          <td>{estudiante.identificacion}</td>
          <td>{estudiante.idtipoidentificacion==1?"Cédula de ciudadanía":
               estudiante.idtipoidentificacion==2?"Tarjeta de identidad":
               estudiante.idtipoidentificacion==3?"Pasaporte":
               ""}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{seleccionarEmpresa(estudiante); modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{seleccionarEmpresa(estudiante); setModalEliminar(true)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    )
}

export default StudentsList