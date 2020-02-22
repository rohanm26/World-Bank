import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/authActions';
import './App.css';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  componentDidUpdate(prevProps){
    console.log("call")
      this.props.getUserData(this.props.email)
    }


  render() {
    let routes = <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/world-bank/auth" component={Auth} />
      <Route path="/logout" component={Logout} />
    </Switch>

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return{
    email: state.auth.userEmail
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getUserData : (email) => dispatch(actions.setUserData(email))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
