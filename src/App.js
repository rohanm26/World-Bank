import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';
import Profile from './components/Profile/Profile';
import Services from './containers/Services/Services';
import AddPayee from './components/AccountServices/FundTransfer/AddPayee/AddPayee';
import FundTransfer from './components/AccountServices/FundTransfer/FundTransfer';
import TransactionHistory from './components/AccountServices/TransactionHistory/TransactionHistory';
import OtherServices from './components/AccountServices/OtherServices/OtherServices';

class App extends Component {

  componentDidMount(){
    this.props.autoSignUp();
  }

  render() {
    let routes = <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/world-bank/auth" component={Auth} />
      <Route path="/logout" component={Logout} />
      <Route path="/myAccount" component={Profile}/>
      <Route path="/services" exact component={Services}/>
      <Route path="/services/add-payee" exact component={AddPayee}/>
      <Route path="/services/add-payee/fundTransfer" component={FundTransfer}/>
      <Route path="/services/transaction-history" component={TransactionHistory}/>
      <Route path="/services/other-services" component={OtherServices}/>
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
    email: state.auth.userEmail,
    userId: state.auth.userId,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return{
    autoSignUp: () => dispatch(actions.checkAuth())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
