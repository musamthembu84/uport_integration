import React, { Component } from 'react'
import TestingWork from "./TestingWork";

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Dashboard</h1>
              <p><strong>Congratulations {this.props.authData.name}!</strong>
              You have logged on successfully and you are eligible to vote </p>
            </div>
          </div>
        <TestingWork/>
        </main>
    )
  }
}

export default Dashboard
