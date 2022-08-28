// signupWidget.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class SignupWidget extends React.Component {
  state = {
    email: '',
    password: '',
    username: '',
    error: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  signup = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
      })
      .catch(error => {
        this.setState({
          error: 'Could not sign up.',
        })
        this.login();
      })
  }

  login = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || '/feeds';
          window.location = redirect_url;
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not log in.',
        })
      })
  }

  render () {
    const { email, password, username } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.signup}>
          <div className="new-to-t">
            <p><strong>New to Twitter?</strong><span> Sign Up</span></p>
          </div>
          <div className="form-group">
            <input type="text" className="form-control username mb-2" placeholder="Username" onChange={this.handleChange} value={username} name="username" required />
          </div>
          <div className="form-group">
            <input type="email" className="form-control email mb-2" placeholder="Email" onChange={this.handleChange} value={email} name="email" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-control password mb-2" placeholder="Password" onChange={this.handleChange} value={password} name="password" required />
          </div>
          <button type="submit" id="sign-up-btn" className="btn btn-default btn-warning pull-right">Sign up for Twitter</button>
        </form>
      </React.Fragment>
    )
  }
}

export default SignupWidget