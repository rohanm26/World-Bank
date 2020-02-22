import React from 'react';
import {Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Snack = props => {
    return (
        <Snackbar
            open={props.open}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            autoHideDuration={3000}
            onClose={props.close}>
            <Alert severity={props.open === "success" ? "success" : "error"} variant="filled">
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default Snack;