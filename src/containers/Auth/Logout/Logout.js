import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import {Card} from '@material-ui/core';
import * as actions from '../../../store/actions/index';
import './Logout.css'
import Modal from '../../../components/UI/Modal/Modal';
import Spinner from '../../../components/UI/Spinner/Spinner';

const Logout = (props) => {

    const [logout, loggingOut] = useState(true)

    const userLogout = useCallback(() => {
        setTimeout(() => {
            loggingOut(false)
        }, 3000)
    }, [])

    useEffect(() => {
        props.onLogout();
        userLogout();
    }, [props, userLogout])

    return (
        logout ? <div className="Logout">
            <Modal show={logout}>
                <h1>Hang on a moment...</h1>
                <h2>While we sign you out</h2>
                <Spinner />
            </Modal>
        </div> : <Redirect to="/" />
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);