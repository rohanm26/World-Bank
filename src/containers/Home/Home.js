import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import * as actions from '../../store/actions/authActions';
import Snack from '../../components/UI/Snackbar/Snackbar';

class Home extends Component {

    closeSnack = () => {
        if (this.props.show) {
            this.props.hideNotification();
        }
    }

    render() {
        let user;
        this.props.user ? user = this.props.user.split(" ")[0] : user = null
        return (
            <>
                <div className="Home">
                    <h2>Welcome {this.props.isLoggedIn ? user : "guest"}</h2>
                    <h1>Live More,</h1>
                    <h1 style={{ margin: "30px 100px" }}>Bank Less</h1>
                    <button className="btn btn-primary btn-lg" style={{ margin: "-120px 0px  50px 590px" }}>Explore</button>
                    <Snack open={this.props.show} close={this.closeSnack} message={this.props.isLoggedIn ? "Logged in successfully" : "Logged out successfully"}/>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
        show: state.auth.showNotification
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideNotification: () => dispatch(actions.hideNotification())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
