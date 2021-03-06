import React, { Component } from 'react';
import { Card, CardContent } from '@material-ui/core';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

class Modal extends Component {
    render() {
        return (
            <>
                <Backdrop show={this.props.show} />
                <Card className="Modal" raised
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0',
                        borderRadius: "20px 20px"
                    }}
                ><CardContent>{this.props.children}</CardContent></Card>
            </>
        )
    }
}

export default Modal;