// loginWidget.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class LoginWidget extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
    const { username, password } = this.state;
    
    return (
      <React.Fragment>
        <form onSubmit={this.login}>
          <div className="form-group">
            <input name="username" type="text" className="form-control username mb-2" placeholder="Username" onChange={this.handleChange} value={username} required/>
          </div>
          <div className="form-group">
            <input name="password" type="password" className="form-control password mb-2" placeholder="Password" onChange={this.handleChange} value={password} required/>
          </div>
          <button type="submit" id="log-in-btn" className="btn btn-default btn-primary col-xs-3 col-xs-offset-1 me-2">Log in</button>
          <label>
            <input type="checkbox" className="me-2" />
            <span>Remember me</span>
            <span> &#183; </span>
          </label>
          <a href="#" className="ms-1">Forgot password?</a>
        </form>
      </React.Fragment>
    )
  }
}

export default LoginWidget