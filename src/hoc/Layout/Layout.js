import React, { useState } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.js';
import Popover from '@material-ui/core/Popover';
import './Layout.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Layout = (props) => {
    const [show, handlePopover] = useState(null);

    const showPopover = (e) => {
        handlePopover(e.currentTarget);
    }

    const id = show ? 'simple-popover' : undefined

    const loggingOut = () => {
        props.history.push('/logout');
        handlePopover(null)
    }

    const handleClose = () => {
        handlePopover(null)
    }

    return (
        <>
            <Toolbar showPopover={showPopover} isLoggedIn={props.isLoggedIn} user={props.user} />
            {
                show ? <Popover
                    id={id}
                    open={Boolean(show)}
                    anchorEl={show}
                    style={{ transform: "translateY(-5px) translateX(20px)" }}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >   <section className="profile">
                        <h1>{props.user}</h1>
                        <h3>{props.userAccount}</h3>
                        <h5>{props.email}</h5>
                        <button className="btn btn-primary mx-2 mt-4">Profile</button>
                        <button className="btn btn-danger mx-2 mt-4" onClick={loggingOut}>Logout</button>
                    </section>
                </Popover> : null
            }
            <main>
                {props.children}
            </main>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        userAccount: state.auth.userAccount,
        email: state.auth.userEmail,
        isLoggedIn: state.auth.isLoggedIn,
    }
}

export default connect(mapStateToProps, null)(withRouter(Layout));