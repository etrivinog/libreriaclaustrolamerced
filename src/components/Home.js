import React from 'react';
import {Link} from "react-router-dom";

import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div id="main container" className="container-fluid">
            
            <div className="row top"></div>
            
            <div className="row">
                
                <div className="col">
                    <Link to="StudentPortal">Ingreso estudiantes</Link>
                    <br />
                    <Link to="AdminHome">Ingreso administrador</Link>
                </div>
                
            </div>
            
            <div className="row botton"></div>
            
            </div>
    )
}

export default Home