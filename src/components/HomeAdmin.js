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
            
            <div className="row top"><br /></div>
            
            <div className="row">
                
                <div className="col"></div>

                <div className="col">
                    <Link to="ManageStudents"><button className="btn btn-primary option">Gestionar estudiantes</button></Link>
                </div>
                
                <div className="col">
                    <Link to="ManageBooks"><button className="btn btn-primary option">Gestionar libros</button></Link>
                </div>

                <div className="col"></div>
                
            </div>
            
            <div className="row mid"><br /></div>
            
            <div className="row">
                
                <div className="col"></div>

                <div className="col">
                    <Link to="ManageLends"><button className="btn btn-primary option">Gestionar pr&eacute;stamos</button></Link>
                </div>

                <div className="col">
                    <Link onClick={() => {setSession(null)}} to="/"><button className="btn btn-danger option">Salir</button></Link>
                </div>

                <div className="col"></div>
                
            </div>
            
            <div className="row botton"></div>

        </div>
    )
}

export default Home