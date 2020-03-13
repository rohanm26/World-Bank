import React, {Component } from 'react';
import { Paper, Typography, TextField, Grid } from "@material-ui/core";
import './OtherServices.css';

class PaymentHistory extends Component {
    state = {
        data: [
            { label: "Loan Amount", type: "number", min: "300000", max: "30000000" },
            { label: "Interest Rate", type: "number", min: "8", max: "16" },
            { label: "Tenure", type: "number", min: "1", max: "20" }
        ],
        emi: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    calculate = (e) => {
        e.preventDefault();
        const calcultedemi =  this.state.LoanAmount * ((1 + this.state.InterestRate) ** this.state.Tenure) / ((1 + this.state.InterestRate) ** this.state.Tenure) - 1;
        console.log(calcultedemi)
        this.setState({
            emi: calcultedemi
        })
    }

    render() {
        return (
            <Grid className="Page">
            <Paper>
                <Typography variant="h2" color="textPrimary" paragraph>EMI Calculator</Typography>
                <Grid className="Calculator">
                    <form onSubmit={this.calculate}>
                        {
                            this.state.data.map(item => {
                                const inputProps = {
                                    min: item.min,
                                    max: item.max
                                }
                                return (
                                    < TextField
                                        type={item.type}
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        label={item.label}
                                        name={item.label.split(" ").join("")}
                                        onChange={this.handleChange}
                                        inputProps={inputProps}
                                        required
                                    />)
                            })
                        }
                        <button className="btn btn-primary my-4">Calculate EMI</button>
                    </form>
                    {this.state.emi ? <Typography variant="h6" color="textSecondary">Calculated EMI: ${Math.round(this.state.emi)}</Typography> : null}
                </Grid>
            </Paper>
            </Grid>
        )
    }
}

export default PaymentHistory;