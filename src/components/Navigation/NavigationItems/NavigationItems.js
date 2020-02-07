import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItems.css';

const navigation = props => {

    return(
        <section className="Navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/world-bank/auth">Login</NavLink>
        </section>
    )
}

export default navigation;