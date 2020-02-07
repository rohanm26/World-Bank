import React from 'react';
import Logo from '../../../assets/logo.png';
import './Logo.css';

const logo = (props) => {
    return(
        <div className="Logo" style={{height: props.height}}>
            <img src={Logo} alt="banklogo"/>
        </div>
    )
}

export default logo;