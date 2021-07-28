import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown,faFlagCheckered } from '@fortawesome/free-solid-svg-icons';

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
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map(prestamo=>{
              return(
                <tr>
              <td>{prestamo.codEstudiante}</td>
              <td>{prestamo.fechaInicio}</td>
              <td>{prestamo.fechaFin}</td>
              <td>{prestamo.idEjemplar}</td>
              <td>{prestamo.estado=="E"?"En espera":
                  prestamo.estado=="A"?"Aprobado":
                  prestamo.estado=="R"?"Rechazado":
                  prestamo.estado=="T"?"Terminado":
                  ""}</td>
              <td>
                    {prestamo.estado=="E"?
                    <a>
                      <Tooltip placement="left" isOpen={tooltipOpen} target={prestamo.idPrestamos+"A"} toggle={toggle}>
                        Aprobar
                      </Tooltip>
                      <button id={prestamo.idPrestamos+"A"} className="btn btn-primary" onClick={()=>{seleccionarEmpresa(prestamo); modalInsertar()}}><FontAwesomeIcon icon={faThumbsUp}/></button>
                    </a>
                    :""}

                    {"   "}

                    {prestamo.estado=="E"?
                    <a>
                      <Tooltip placement="right" isOpen={tooltipOpen2} target={prestamo.idPrestamos+"R"} toggle={toggle2}>
                        Rechazar
                      </Tooltip>
                      <button id={prestamo.idPrestamos+"R"} className="btn btn-danger" onClick={()=>{seleccionarEmpresa(prestamo); setModalEliminar(true)}}><FontAwesomeIcon icon={faThumbsDown}/></button>
                    </a>
                    :""}

                    {"   "}

                    {prestamo.estado=="A"?
                    <a>
                      <Tooltip placement="left" isOpen={tooltipOpen3} target={prestamo.idPrestamos+"T"} toggle={toggle3}>
                        Finalizar
                      </Tooltip>
                      <button id={prestamo.idPrestamos+"T"} className="btn btn-success" onClick={()=>{seleccionarEmpresa(prestamo); setModalFinalizar(true)}}><FontAwesomeIcon icon={faFlagCheckered}/></button>
                    </a>
                    :""}
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