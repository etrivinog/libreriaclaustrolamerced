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
                    <Link to="student">Ingreso estudiantes</Link>
                    <br />
                    <Link to="managebook">Ingreso administrador</Link>
                </div>
                
            </div>
            
            <div class="row botton"></div>
            
            </div>
    )
}

export default Home