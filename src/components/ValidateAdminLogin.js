import React from 'react';
import {Redirect} from "react-router-dom";

const ValidateAdminLogin = ({getSession}) => {

    console.log('validating session: '+getSession());
    if (getSession() == null) {
        return (<div><Redirect to="/" /> </div>);
    }
    return (<div></div>)
}

export default ValidateAdminLogin;