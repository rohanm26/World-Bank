import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../UI/Logo/Logo';
import './Toolbar.css';

const toolbar = props => {
    return (
        <header className="Toolbar">
            <div><Logo/></div>
            <h1>The World Bank</h1>
            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default toolbar;