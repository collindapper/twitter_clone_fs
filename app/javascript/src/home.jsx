import React from 'react';
import ReactDOM from 'react-dom';
import LoginWidget from './loginWidget';
import SignupWidget from './signupWidget';
import Layout from './layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './home.scss';

import background_1 from '../images/background_1.png'
import background_2 from '../images/background_2.png'
import background_3 from '../images/background_3.jpg'

const backgroundURL = [
  background_1,
  background_2,
  background_3,
]

class Home extends React.Component {
  state = {
    authenticated: false,
    backStep: 0,
}

componentDidMount () {
  fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })

  this.backgroundTimer = window.setInterval(() => {
    let backStep = this.state.backStep + 1;
    if (backStep == backgroundURL.length) {
      backStep = 0;
    };
    this.setState({ backStep });
  }, 8000);
}

componentWillUnmount () {
  window.clearInterval(this.backgroundTimer);
}

render () {
  const backgroundImg = backgroundURL[this.state.backStep];
  const {login_username, login_password, signup_email, signup_username, signup_password} = this.state;

    return (
      <Layout>
        <div id="homeback" style={{backgroundImage: `url(${backgroundImg})`}}>
        
        <div className="main">
          <div className="container">
            <div className="row mx-auto">

              <div className="left-panel col-12 col-md-5 mx-auto">
                <div className="col-12 welcome">
                  <div id="welcome-text">
                    <h1><strong>Welcome to Twitter.</strong></h1>
                    <p>Connect with your friends &#8212; and other fascinating people. Get in-the-moment updates on the things that interest you. And watch events unfold, in real time, from every angle.</p>
                  </div>
                  <p><a href="#" id="twit-info">Hack Pacific - Backendium Twitter Project</a></p>
                  <p><a href="#" id="twit-account">Tweet and photo by @Hackpacific<br/>3:20 PM - 15 December 2016</a></p>
                </div>
              </div>

              <div className="row col-12 col-md-4 mx-auto">

                <div className="log-in col-12 mb-2">
                  <LoginWidget />
                </div>

                <div className="sign-up col-12">
                  <SignupWidget />
                </div>

              </div>
            </div>
          </div>
        </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})