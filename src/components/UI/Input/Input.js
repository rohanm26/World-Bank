import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { Grid, InputAdornment, FormControl, OutlinedInput, InputLabel } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './Input.css';

const Input = (props) => {
    let inputElement = null;
    switch (props.config.type) {
        case "text":
            inputElement = <TextField fullWidth size="medium" margin="normal" variant="outlined" type="text" onChange={props.onchange} {...props} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
            break;
        case "amount":
            inputElement = <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel htmlFor="Amount">Amount</InputLabel>
                <OutlinedInput
                    id="amount"
                    type="number"
                    size="medium"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={60}
                    onChange={props.onchange}
                    {...props}
                />
            </FormControl>
            break;
        case "address":
            inputElement = <TextField fullWidth margin="normal" multiline rows="2" variant="outlined" type="text" onChange={props.onchange} {...props} />
            break;
        case "number":
            inputElement = <TextField fullWidth margin="normal" variant="outlined" type="number" onChange={props.onchange} {...props} />
            break;
        case "email":
            inputElement = <TextField fullWidth margin="normal" variant="outlined" type="email" onChange={props.onchange} {...props} />
            break;
        case "date":
            inputElement =
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker margin="normal" fullWidth variant="outlined" clearable format="MM/dd/yyyy" value={props.date} name={props.label} onChange={props.dob} {...props} />
                    </Grid>
                </MuiPickersUtilsProvider>
            break;
        case "password":
            inputElement = <TextField fullWidth margin="normal" variant="outlined" type="password" onChange={props.onchange} {...props} />
            break;
        default:
            inputElement = <TextField fullWidth margin="normal" type="text" variant="outlined" onChange={props.onchange} {...props} />

    }

    return (
        <>
            {inputElement}
        </>
    )
}

export default Input;