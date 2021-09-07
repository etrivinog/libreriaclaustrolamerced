import React from'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const StudentsList = ({state, seleccionarTesis, modalInsertar, setModalEliminar, message}) => {
    return (
      <div>
        <table className="table ">
          <thead>
            <tr>
              <th>Título de la tesis</th>
              <th>Cohorte CADE</th>
              <th>Cohorte nacional</th>
              <th>Línea de formación</th>
              <th>Director nacional</th>
              <th>Director internacional</th>
              <th>Enlace</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map(tesis=>{
              return(
                <tr>
                  <td>{tesis.titulo}</td>
                  <td>{tesis.cohorteCade}</td>
                  <td>{tesis.cohorteNal}</td>
                  <td>{tesis.lineaFormacion}</td>
                  <td>{tesis.directorNacional}</td>
                  <td>{tesis.directorInternac}</td>
                  <td><a href={tesis.enlace} target="_blank">{tesis.enlace}</a></td>
                  <td>
                        <button className="btn btn-primary" onClick={()=>{seleccionarTesis(tesis); modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger" onClick={()=>{seleccionarTesis(tesis); setModalEliminar(true)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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

export default StudentsList