import React from 'react';
import {Link} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div class="container">
            <div class="row align-items-center">
                <div class="col">
                    <Link to="/managebooks">Gestionar libros</Link>
                </div>
                <div class="col">
                    <Link to="/managebooks">Gestionar usuarios</Link>
                </div>
            </div>
        </div>
    )
}

export default Home