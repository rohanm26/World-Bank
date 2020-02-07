import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import './App.css';

class App extends Component {
  render() {
    let routes = <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/world-bank/auth" component={Auth} />
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

export default App;
