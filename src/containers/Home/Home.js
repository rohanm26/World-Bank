import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import * as actions from "../../store/actions/index";
import Snack from "../../components/UI/Snackbar/Snackbar";
import { withRouter } from "react-router-dom";

class Home extends Component {

  componentDidUpdate(){
    setTimeout(() => this.props.getUserData(this.props.userId, this.props.token), 500)
  }
  
  closeSnack = () => {
    if (this.props.show) {
      this.props.hideNotification();
    }
  };

  services = () => {
    this.props.history.push("/services");
  };

  render() {
    let user;
    this.props.user ? (user = this.props.user.split(" ")[0]) : (user = null);
    return (
      <>
        <div className="Home">
          <h2>Welcome {this.props.isLoggedIn ? user : "guest"}</h2>
          <h1>Live More,</h1>
          <h1 style={{ margin: "30px 100px" }}>Bank Less</h1>
          <button
            className="btn btn-primary btn-lg"
            style={{ margin: "-120px 0px  50px 590px" }}
            onClick={this.services}
          >
            Explore
          </button>
          <Snack
            open={this.props.show}
            close={this.closeSnack}
            message={
              this.props.isLoggedIn
                ? "Logged in successfully"
                : "Logged out successfully"
            }
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
    show: state.auth.showNotification,
    userId: state.auth.userId,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideNotification: () => dispatch(actions.hideNotification()),
    getUserData : (email,token) => dispatch(actions.setUserData(email,token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
