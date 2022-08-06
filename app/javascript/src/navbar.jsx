import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

import './navbar.scss';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'User',
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

componentDidMount () {
  fetch(`/api/authenticated`, safeCredentials({
    method: 'GET',
  }))
  .then(handleErrors)
  .then(res => {
    this.setState({ currentUser: res.username });
  })
}


handleLogout(event) {
  event.preventDefault();
  fetch(`/api/sessions`, safeCredentials({
    method: 'DELETE',
  }))
  .then(handleErrors)
  .then(res => {
    console.log(res);
    window.location.replace("/");
  })
}
  render () {
    const {currentUser} = this.state;

    return (
      <React.Fragment>
        <nav className="navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <i className="fa fa-twitter"></i>
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span id="user-icon">{currentUser}</span></a>
                <ul className="dropdown-menu row" role="menu">
                  <li ><a href="#" className="username">{currentUser}</a></li>
                  <li role="presentation" className="divider"></li>
                  <li ><a href="#">Lists</a></li>
                  <li role="presentation" className="divider"></li>
                  <li ><a href="#">Help</a></li>
                  <li ><a href="#">Keyboard shortcuts</a></li>
                  <li role="presentation" className="divider"></li>
                  <li ><a href="#">Settings</a></li>
                  <li ><a onClick={this.handleLogout} id="log-out" href="#">Log out</a></li>
                </ul>
              </li>
            </ul>
            <div className="search-bar col-xs-3 nav navbar-right">
              <div className="input-group">
                <input type="text" className="form-control search-input" placeholder="Search for..." />
                <span className="input-group-btn">
                  <button className="btn btn-default search-btn" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>
        </nav>

        <div>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Navbar />,
    document.body.appendChild(document.createElement('div')),
  )
})

export default Navbar;