import React from'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const StudentsList = ({state, seleccionarEjemplar, modalInsertar, setModalEliminar, message}) => {
    return (
      <div>
        <table className="table ">
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map(ejemplar=>{
              return(
                <tr>
                  <td>{ejemplar.descripcion}</td>
                  <td>{ejemplar.idestado===1?"Disponible":
                      ejemplar.idestado===2?"En préstamo":
                      ""}
                  </td>
                  <td>
                        <button className="btn btn-primary" onClick={()=>{seleccionarEjemplar(ejemplar); modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                        {"   "}
                        <button className="btn btn-danger" onClick={()=>{seleccionarEjemplar(ejemplar); setModalEliminar(true)}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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