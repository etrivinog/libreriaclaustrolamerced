import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop } from '@fortawesome/free-solid-svg-icons';

const LendsList = ({state, seleccionarEmpresa, modalInsertar, setModalEliminar, setModalFinalizar, message}) => {
  
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [tooltipOpen2, setTooltipOpen2] = useState(false);
  const toggle2 = () => setTooltipOpen2(!tooltipOpen2);

  const [tooltipOpen3, setTooltipOpen3] = useState(false);
  const toggle3 = () => setTooltipOpen3(!tooltipOpen3);

    return (
      <div>
        <table className="table ">
          <thead>
            <tr>
              <th>C&oacute;digo estudiante</th>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Libro</th>
              <th>Ejemplar</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map(prestamo=>{
              return(
                <tr>
                  <td>{prestamo.codEstudiante}</td>
                  <td>{prestamo.fechaInicio}</td>
                  <td>{prestamo.fechaFin}</td>
                  <td>{prestamo.libroTittle}</td>
                  <td>{prestamo.ejemplarDesc}</td>
                  <td>{prestamo.estado=="E"?"En espera":
                      prestamo.estado=="A"?"Aprobado":
                      prestamo.estado=="R"?"Rechazado":
                      prestamo.estado=="T"?"Terminado":
                      ""}
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

export default LendsList