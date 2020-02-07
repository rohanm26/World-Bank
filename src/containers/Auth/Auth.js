import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import './Auth.css';

class Auth extends Component {
    state = {
        signupData: [
            { label: "Full Name", config: { type: "text", min: 4 } },
            { label: "Mobile No.", config: { type: "number", min: 10 } },
            { label: "Address", config: { type: "text", min: 10 } },
            { label: "Email Id", config: { type: "email" } },
            { label: "DOB", config: { type: "date" } },
            { label: "UIN", config: { type: "number", min: 16 } },
            { label: "Password", config: { type: "password", min: 8 } },
        ],
        loginData: [
            { label: "Email Id", config: { type: "email" } },
            { label: "Password", config: { type: "password", min: 8 } },
        ]
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.onLogin();
    }

    render() {
        return (
            <div className="Auth" style={!this.props.isSignUp && {height: "600px"}}>
                <h1>{this.props.isSignUp ? "Sign up" : "Login"} to World Bank</h1>
                <form className="form-control-lg">
                    {
                        !this.props.isSignUp ? this.state.signupData.map(item => <Input
                            name={item.label.split(" ").join("")}
                            label={item.label}
                            handleChange={this.handleChange}
                            config={item.config}
                            required
                        />) : this.state.loginData.map(item => <Input
                            name={item.label.split(" ").join("")}
                            label={item.label}
                            handleChange={this.handleChange}
                            config={item.config}
                            required
                        />)
                    }
                    <button className="btn btn-primary my-3 mx-5">{!this.props.isSignUp ? "Sign up" : "Login"}</button>
                </form>
            </div>
        )
    }
}

export default Auth;