import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <h2>Welcome {this.props.isLoggedIn ? this.props.customer.name : "guest"}</h2>
                <h1>Live More,</h1>
                <h1 style={{ margin: "30px 100px" }}>Bank Less</h1>
                <button className="btn btn-primary btn-lg" style={{ margin: "-120px 0px  50px 590px" }}>Explore</button>
            </div>
        )
    }
}

export default Home;