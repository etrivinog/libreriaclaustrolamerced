import React from 'react';
import {Link} from "react-router-dom";

import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AdminLogin from './AdminLogin';

const Home = ({getSession, setSession}) => {
    
    if (getSession() == null) {
        return <AdminLogin setSession={setSession}/>
    }
    return (
        <div id="main container" className="container-fluid">
            
            <div className="row top"></div>
            
            <div className="row">
                
                <div className="col">
                    <Link to="ManageStudents">Gestionar estudiantes</Link>
                    <br />
                    <Link to="ManageBooks">Gestionar libros</Link>
                    <br />
                    <Link to="ManageLends">Gestionar pr&eacute;stamos</Link>
                    <br />
                    <Link onClick={() => {setSession(null)}} to="/">Salir</Link>
                </div>
                
            </div>
            
            <div className="row botton"></div>

        </div>
    )
}

export default Home