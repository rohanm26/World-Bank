import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Typography } from '@material-ui/core';
import Input from '../../components/UI/Input/Input';
import './Auth.css';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/authActions';
import Snack from '../../components/UI/Snackbar/Snackbar';

class Auth extends Component {
    state = {
        signupData: [
            { label: "Full Name", config: { type: "text" } },
            { label: "Phone", config: { type: "number" } },
            { label: "DOB", config: { type: "date" } },
            { label: "Address", config: { type: "address" } },
            { label: "Email Id", config: { type: "email" } },
            { label: "UIN", config: { type: "number" } },
            { label: "New Password", config: { type: "password" } },
        ],
        loginData: [
            { label: "Email Id", config: { type: "email" } },
            { label: "Password", config: { type: "password" } },
        ],
        isSignUp: false,
        account: 9128321112343,
        dob: new Date()
    }

    handleChange = (e) => {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDate = date => {
        this.setState({
            dob: date
        })
    }

    switchSignUp = () => {
        this.setState(prev => {
            return ({
                isSignUp: !prev.isSignUp
            })
        })
    }


    handleForm = (e) => {
        e.preventDefault();
        let rnd = Math.round(Math.random() * 999);
        if (this.state.isSignUp) {
            const authData = {
                name: this.state.FullName,
                mobile: this.state.Phone,
                address: this.state.Address,
                email: this.state.EmailId.toLowerCase(),
                dob: this.state.dob,
                uin: this.state.UIN,
                account: this.state.account + rnd
            }
            this.props.signUpCustomer(authData);
            this.props.login(this.state.EmailId, this.state.Password, this.state.isSignUp)
        } else {
            this.props.login(this.state.EmailId, this.state.Password, this.state.isSignUp);
        }
    }

    getError = (error) => {
        switch (error.message) {
            case "EMAIL_EXISTS":
                return "Account already exists";
            case "INVALID_PASSWORD":
                return "Please check your credentials";
            case "EMAIL_NOT_FOUND":
                return "Account doesn't exists";
            default:
                return "Something went wrong";
        }
    }

    closeSnack = () => {
        if (this.props.show) {
            this.props.hideNotification();
        }
    }

    render() {
        console.log(this.state)
        return (
            <>
                {
                    this.props.isLoggedIn ? <Redirect to="/" /> : null
                }
                <Card className="Auth" style={{ height: this.state.isSignUp ? "850px" : "480px" }}>
                    <Typography color="textPrimary" variant="h2" paragraph="true">The World Bank</Typography>
                    <Typography color="textSecondary" variant="h4" paragraph="true">{this.state.isSignUp ? "Create account" : "Sign in"}</Typography>
                    <form className="form-control-lg" autoComplete="true" onSubmit={this.handleForm}>
                        {
                            this.state.isSignUp ? this.state.signupData.map(item => <Input
                                key={item.label}
                                label={item.label}
                                name={item.label.split(" ").join("")}
                                onchange={this.handleChange}
                                date={this.state.dob}
                                dob={this.handleDate}
                                config={item.config}
                            />) : this.state.loginData.map(item => <Input
                                key={item.label}
                                name={item.label.split(" ").join("")}
                                label={item.label}
                                onchange={this.handleChange}
                                config={item.config}
                                required
                            />)
                        }
                        <button className="btn btn-primary my-4 mx-5">{this.state.isSignUp ? "Sign up" : "Login"}</button>
                    </form>
                    <Snack open={this.props.show} close={this.closeSnack} message={this.props.error ? this.getError(this.props.error) : null} />
                    <section className="Info" style={{ marginTop: this.state.isSignUp ? "610px" : "230px" }}>
                        {
                            !this.state.isSignUp ? <p>New to World Bank?
                                    <button className="btn btn-link" onClick={this.switchSignUp}>Sign Up</button>
                            </p> :
                                <p>Already have an accout!
                                    <button className="btn btn-link" onClick={this.switchSignUp}>Login</button>
                                </p>
                        }
                    </section>
                </Card>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        error: state.auth.error,
        loading: state.auth.loading,
        show: state.auth.showNotification
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        signUpCustomer: (authData) => dispatch(actions.signUpCustomer(authData)),
        hideNotification: () => dispatch(actions.hideNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

