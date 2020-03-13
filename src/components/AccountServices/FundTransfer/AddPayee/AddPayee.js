import React, { Component } from "react";
import { connect } from "react-redux";
import { Paper, TextField, Typography, Radio, FormControlLabel } from "@material-ui/core";
import Input from "../../../UI/Input/Input";
import Spinner from "../../../UI/Spinner/Spinner";
import Modal from "../../../UI/Modal/Modal";
import * as actions from "../../../../store/actions/index.js";
import "./AddPayee.css";
import { Redirect } from "react-router-dom";

class AddPayee extends Component {
  state = {
    payee: [
      { label: "Name", config: { type: "text" } },
      { label: "Account Number", config: { type: "number" } },
      { label: "Phone", config: { type: "number" } },
      { label: "Email Id", config: { type: "email" } },
      { label: "Bank Name", config: { type: "text" } },
      { label: "IFSC", config: { type: "text" } }
    ],
    payeeExist: true,
    payeeName: null,
    error: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePayee = (e) => {
    this.setState({
      payeeName: e.target.value
    })
  }

  handleError = () => {
    this.setState(prev => {
      return {
        error: !prev.error
      }
    })
  }

  searchPayee = (e) => {
    e.preventDefault();
    this.props.startSearch();
    setTimeout(() => {
      this.state.payeeRadio === "OtherPayee" ?
        this.props.searchPayee(this.props.token, this.props.account.accountId, this.state.payeeName) :
        this.props.searchCustomer(this.props.token, this.state.payeeName, this.props.account.account);
    }, 3000)
  };

  addPayeeDetails = (e) => {
    e.preventDefault();
    const payeeData = {
      name: this.state.Name,
      account: this.state.AccountNumber,
      phone: this.state.Phone,
      email: this.state.EmailId,
      bank: this.state.BankName,
      ifsc: this.state.IFSC
    }
    this.props.addPayee(this.props.token, this.props.account.accountId, payeeData);
    this.props.startSearch();
    setTimeout(() => {
      this.props.searchPayee(this.props.token, this.props.account.accountId, this.state.Name)
    }, 2000)
  }

  switchPayee = () => {
    this.setState(prev => {
      return {
        payeeExist: !prev.payeeExist
      };
    });
  };

  render() {
    console.log(this.state)
    return (
      <Paper className="Payee" style={{ height: this.state.payeeExist ? "370px" : "680px" }}>
        {this.props.payee && <Redirect to="/services/add-payee/fundTransfer" />}
        {
          this.props.loading && <Modal show={this.props.loading}>
            <Typography variant="h4" color="textSecondary" paragraph>Adding Payee...</Typography>
            <Spinner />
          </Modal>
        }
        <Typography variant="h3" color="textPrimary" paragraph>{this.state.payeeExist ? "Select Payee" : "Add Payee"}</Typography>
        <form onSubmit={this.state.payeeExist ? this.searchPayee : this.addPayeeDetails}>
          {
            this.state.payeeExist ?
              <TextField
                type="search"
                error={this.props.error}
                helperText={this.props.error}
                variant="outlined"
                label="Account Name"
                fullwidth
                margin="normal"
                name="payeeName"
                onChange={this.handlePayee}
                required
              />
              : this.state.payee.map(item => <Input
                error={this.state.error}
                key={item.label}
                label={item.label}
                name={item.label.split(" ").join("")}
                onchange={this.handleChange}
                config={item.config}
                required
              />)
          }
          {
            this.state.payeeExist ? <><button className="btn btn-primary mx-2 my-4" onClick={this.searchPayee} disabled={!this.state.payeeName}>
              Search
                </button><br /></>
              : <button className="btn btn-primary my-2" onClick={this.addPayeeDetails} disabled={!this.state.AccountNumber && !this.state.BankName}>Add Payee</button>
          }<br />
          {this.state.payeeExist && <>
            <FormControlLabel value="WBPayee" control={<Radio name="payeeRadio" checked={this.state.payeeRadio === "WBPayee"} onChange={this.handleChange} />} label="World Bank payee" />
            <FormControlLabel value="OtherPayee" control={<Radio name="payeeRadio" checked={this.state.payeeRadio === "OtherPayee"} onChange={this.handleChange} />} label="Other bank payee" />
          </>
          }
        </form>
        <section className="payInfo">
          <p style={{ marginTop: this.state.payeeExist ? "70px" : "10px" }}>
            {
              !this.state.payeeExist ? "Payee exist!" : "Payee doesn't exist?"
            }
            <button className="btn btn-link" onClick={this.switchPayee}>
              {
                !this.state.payeeExist ? "Select payee" : "Add payee"
              }
            </button>
          </p>
        </section>
      </Paper>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    payee: state.fund.payee,
    error: state.fund.error,
    loading: state.fund.loading,
    account: state.auth.account
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchPayee: (token, id, name) => dispatch(actions.searchPayee(token, id, name)),
    searchCustomer: (token, payeeName, customerAcc) => dispatch(actions.searchCustomer(token, payeeName, customerAcc)),
    addPayee: (token, id, payee) => dispatch(actions.addPayee(token, id, payee)),
    startSearch: () => dispatch(actions.searchPayeeStart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPayee);
