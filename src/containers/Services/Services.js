import React, { Component } from "react";
import { connect } from 'react-redux';
import { Card, Grid, Typography, Fab } from "@material-ui/core";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import "./Services.css";

class Services extends Component {
  state = {
    services: [
      { label: "Fund Transfer", info: "Easy & Secure one-stop payment solution to help you online transfer at your convenience.", icon: <MonetizationOnIcon fontSize="large" /> },
      { label: "Transaction History", info: "Its always important to track your expenses", icon: <LocalPrintshopIcon fontSize="large" /> },
      { label: "EMI Calculator", info: "Calculate your loan EMI with an ease.", icon: <BuildRoundedIcon fontSize="large" /> }
    ]
  };

  handleService = (label) => () => {
    if (this.props.isLoggedIn) {
      switch (label) {
        case "Fund Transfer":
          return this.props.history.push(this.props.match.url + "/add-payee")
        case "Transaction History":
          return this.props.history.push(this.props.match.url + "/transaction-history")
        case "EMI Calculator":
          return this.props.history.push(this.props.match.url + "/other-services");
        default:
          return null;
      }
    }
    else {
      this.props.history.push("/world-bank/auth")
    }
  }

  render() {
    return (
      <Grid container className="Services">
        {this.state.services.map(item => (
          <Card key={item.label} className="Service">
            <Typography variant="h3" color="textPrimary" paragraph>{item.label}</Typography>
            <Typography variant="h5" color="textSecondary" paragraph>{item.info}</Typography>
            <button className="btn" onClick={this.handleService(item.label)}><Fab color="primary">{item.icon}</Fab></button>
          </Card>
        ))}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(Services);
