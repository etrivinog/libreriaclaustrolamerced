import React from 'react';
import {Link} from "react-router-dom";

import '../../App.css';

const Home = () => {
    
    return (
        <div id="main container" className="container-fluid">
            
            <div className="row top"><br /></div>
            
            <div className="row">
                
                <div className="col"></div>
                <div className="col"></div>

                <div className="col">
                    <Link to="Students/Books"><button className="btn btn-primary option">Libros</button></Link>
                </div>
                
                <div className="col"></div>
                
                <div className="col">
                    <Link to="Students/Tesis"><button className="btn btn-primary option">Tesis</button></Link>
                </div>
                
                <div className="col"></div>
                <div className="col"></div>
                
            </div>
            
            
            <div className="row"><br /></div>
            
            <div className="row">
                
                <div className="col"></div>
                <div className="col"></div>

                <div className="col">
                    <Link to="/"><button className="btn btn-danger option">Salir</button></Link>
                </div>

                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
                
            </div>
            
            <div className="row botton"></div>

            </div>
    )
}

export default Home