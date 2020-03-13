import React from "react";
import { Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import * as actions from '../../store/actions/index';
import { connect } from "react-redux";

const Profile = (props) => {

    const useStyles = makeStyles(theme => ({
        account: {
            margin: "100px 400px",
            width: "600px"
        }
    }))

    const classes = useStyles();

    let accountDetails = [];

    for(let key in props.account){
        if(key === "dob"){
            let dob = props.account[key].slice(0,10)
            accountDetails.push({
                label: key,
                value: dob
            })
        }
            if(key === "payees" || key === "transfers"){
                
            }
        else{
            accountDetails.push({
                label: key,
                value: props.account[key]
            })
        }
    }

  return (
    <Grid container xd={4} item alignItems="center" className={classes.account} justify="center">
        <Typography align="center" color="textPrimary" paragraph variant="h2">
          Account Details
        </Typography>
      <TableContainer component={Paper}>
        <Table size="medium" className={classes.table}>
            <TableBody>
                {
                    accountDetails.map(item => <TableRow>
                        <TableCell align="right"><Typography color="textSecondary" variant="h6">{item.label.toUpperCase()}</Typography></TableCell>
                        <TableCell align="right"><Typography color="textPrimary" variant="h6">{item.value}</Typography></TableCell>
                    </TableRow>)
                }
            </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

const mapStateToProps = state => {
    return{
        email: state.auth.email,
        account : state.auth.account
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getAccountDetails : (email) => dispatch(actions.setUserData(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
