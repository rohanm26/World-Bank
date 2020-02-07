import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.js';
import Footer from '../../components/Navigation/Footer/Footer.js';

const layout = (props) => {
    return (
        <>
            <Toolbar/>
            <main>
                {props.children}
            </main>
            {/* <Footer/> */}
        </>
    )
}

export default layout;