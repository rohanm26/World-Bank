import React, { Component } from "react";
import { connect } from 'react-redux';
import { Paper, TextField, Typography } from "@material-ui/core";
import Input from '../../UI/Input/Input';
import * as actions from '../../../store/actions/index';
import './FundTransfer.css';
import Spinner from "../../UI/Spinner/Spinner";
import Modal from "../../UI/Modal/Modal";

class FundTransfer extends Component {
  state = {
    fund: [
      { label: "Amount", config: { type: "amount" } },
      { label: "Pin", config: { type: "password" } },
      { label: "Message", config: { type: "text" } },
    ],
    payeeData: []
  }

  componentDidMount() {
    let payee = [];
    for (let key in this.props.payee) {
      if (key === "payeeOf")
        payee.push({
          label: "From Account",
          value: this.props.account.account
        })
      if (key === "name") {
        payee.push({
          label: "Payee Name",
          value: this.props.payee[key]
        })
        this.setState({
          payeeName: this.props.payee[key]
        })
      }
      if (key === "account") {
        payee.push({
          label: "To Account",
          value: this.props.payee[key]
        })
      }
      if (key === "ifsc") {
        payee.push({
          label: "Payee bank IFSC",
          value: this.props.payee[key]
        })
      }
    }
    this.setState({
      payeeData: payee
    })
  }

  transfer = (e) => {
    e.preventDefault();

    const transfer = {
      amount: `$${this.state.Amount}`,
      fromAccount: this.props.account.name + " " + this.props.account.account,
      toAccount: this.props.payee.name + " " + this.props.payee.account,
      date: new Date().toLocaleDateString(),
      message: this.state.Message,
      status: "debit"
    }
    this.props.transferStart();
    setTimeout(() => {
      this.props.transfer(this.props.token, this.props.account.accountId, transfer, this.props.payee.account)
    }, 3000)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  home = () => {
    this.props.history.push("/")
  }

  cancelTransfer = () => {
    this.setState({
      cancelTransfer: true
    })
  }

  confirmCancel = () => {
    this.props.history.replace("/");
    this.props.clearTransfer();
  }

  cancelModal = () => {
    this.setState({
      cancelTransfer: false
    })
  }

  render() {
    return (
      <Paper className="Fund">
        {
          this.props.success || this.state.cancelTransfer ? <Modal show={this.props.success || this.state.cancelTransfer}>
            {
              this.props.success ? <>
                <Typography variant="h3" color="textPrimary" paragraph>
                  Transferred ${this.state.Amount} Successfully
                  </Typography>
                <button className="btn btn-primary my-2" onClick={this.home}>Home</button>
              </> :
                <>
                  <Typography variant="h4" color="textSecondary" paragraph>
                    Are you sure, do you want to cancel transfer?
                  </Typography>
                  <button className="btn btn-danger mx-2 my-2" onClick={this.confirmCancel}>Confirm</button>
                  <button className="btn btn-secondary mx-2 my-2" onClick={this.cancelModal}>Cancel</button>
                </>
            }
          </Modal> : null
        }
        {
          this.props.loading ? <Modal show={this.props.loading}>
            <Typography variant="h4" color="textPrimary" paragraph>Processing Transaction...</Typography>
            <Typography variant="p" color="error" paragraph>Don't refresh or go back!</Typography>
            <Spinner show={this.props.loading} />
          </Modal> : null
        }
        <Typography variant="h3" color="textPrimary" paragraph>Fund Transfer</Typography>
        <form onSubmit={this.transfer}>
          {
            this.state.payeeData ? this.state.payeeData.map(item => {
              return (
                <TextField
                  key={item.label}
                  fullWidth="true"
                  margin="normal"
                  variant="outlined"
                  label={item.label}
                  value={item.value}
                  InputProps={{
                    readOnly: true
                  }}
                />
              )
            }) : <Spinner show={this.props.loading} />
          }
          {
            this.state.fund.map(item => {
              return (
                <Input
                  key={item.label}
                  label={item.label}
                  name={item.label}
                  onchange={this.handleChange}
                  config={item.config}
                  required />
              )
            })
          }
        </form>
        <button className="btn btn-primary btn-lg mx-2 my-2" onClick={this.transfer}>Pay Now</button>
        <button className="btn btn-danger btn-lg mx-2 my-2" onClick={this.cancelTransfer}>Cancel</button>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    payee: state.fund.payee,
    account: state.auth.account,
    loading: state.fund.loading,
    success: state.fund.transferSuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    transfer: (token, id, transfer, resAccount) => dispatch(actions.transferFund(token, id, transfer, resAccount)),
    transferStart: () => dispatch(actions.transferStart()),
    clearTransfer: () => dispatch(actions.clearTransfer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundTransfer);
