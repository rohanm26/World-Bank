import React, { Component } from 'react';
import * as actions from '../../../store/actions/index';
import { Grid, Typography } from "@material-ui/core";
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './TransactionHistory.css';

class TransactionHistory extends Component {
    state = {
        columnDefs: [{ headerName: "id", field: "id", checkboxSelection: true }],
        rowData: [],
        hasError: false
    }
    componentDidMount() {
        this.props.getHistory(this.props.token, this.props.account.accountId, `${this.props.account.name} ${this.props.account.account}`);
        let columnHead = [];
        setTimeout(() => {
                return this.props.error === null ? Object.keys(this.props.history[0]).map(item => {
                    columnHead.push({
                        headerName: item.toUpperCase(),
                        field: item,
                        filter: true,
                        resizable: true
                    })
                }) : this.showNoData(),
                this.setState({
                    columnDefs: columnHead,
                    rowData: this.props.history
                })
        }, 2000)
    }

    showNoData = () => {
        this.setState({
            hasError: true
        })
    }

    render() {
        return (
            <Grid container-fluid xd={4} style={{ margin: "100px 0px" }} item alignItems="center" justify="center">
                {!this.props.token && <Redirect to="/world-bank/auth" />}
                <Typography align="center" color="textPrimary" paragraph variant="h2">
                    Transaction History
        </Typography>
                {
                    <div className="ag-theme-balham"
                        style={{
                            margin: "30px 40px",
                            width: "1250px",
                            height: "400px"
                        }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                        />
                    </div>

                }
            </Grid >
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        account: state.auth.account ? state.auth.account : null,
        history: state.payment.history,
        error: state.payment.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getHistory: (token, id, data) => dispatch(actions.getPaymentHistory(token, id, data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);