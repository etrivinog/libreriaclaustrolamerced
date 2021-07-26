import React from 'react';
import {Link} from "react-router-dom";

import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div id="main container" className="container-fluid">
            
            <div className="row top"><br /></div>
            
            <div className="row">
                
                <div className="col"></div>
                <div className="col"></div>
                <div className="col">
                    <Link to="StudentPortal"><button className="btn btn-primary option">Estudiante</button></Link>
                </div>
                <div className="col"></div>
                <div className="col">
                    <Link to="AdminHome"><button className="btn btn-primary option">Administrador</button></Link>
                </div>
                <div className="col"></div>
                <div className="col"></div>
                
            </div>
            
            <div className="row botton"></div>
            
            </div>
    )
}

export default Home