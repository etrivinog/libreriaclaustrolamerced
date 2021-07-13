import React from 'react';
import {Link} from "react-router-dom";

import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div id="main container" class="container-fluid">
            
            <div class="row top"></div>
            
            <div class="row">
                
                <div class="col">
                    <Link to="ManageStudents">Gestionar estudiantes</Link>
                    <br />
                    <Link to="ManageBooks">Gestionar libros</Link>
                    <br />
                    <Link to="/">Salir</Link>
                </div>
                
            </div>
            
            <div class="row botton"></div>

        </div>
    )
}

export default Home