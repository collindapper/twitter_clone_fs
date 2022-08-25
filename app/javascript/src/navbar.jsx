import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './navbar.scss';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: '',
      isOpen: false,
    }
  }

componentDidMount () {
  fetch(`/api/authenticated`)
  .then(handleErrors)
  .then(data => {
    this.setState({
      currentUser: data.username,
      authenticated: data.authenticated, 
    });
  })
}

loadFeeds = (e) => {
  const params = new URLSearchParams(window.location.search);
  const redirect_url = params.get('redirect_url') || '/feeds';
  window.location = redirect_url;
}


handleLogout = (e) => {
  e.preventDefault();

  fetch(`/api/sessions`, safeCredentials({
    method: 'DELETE',
  }))
  .then(handleErrors)
  .then(data => {
    console.log('data', data)
    if (data.success) {
      this.setState({
        authenticated: false,
      })
      const params = new URLSearchParams(window.location.search);
      const redirect_url = params.get('redirect_url') || '/';
      window.location = redirect_url;
    }
  })
  .catch(error => {
    this.setState({
      error: 'Could not sign out.',
    })
  })
}

toggleOpen = () => {
  this.setState({
    isOpen: !this.state.isOpen
  });
}

  render () {
    const {currentUser} = this.state;
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

    return (
      <React.Fragment> 
        <nav className="d-flex navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header my-2">
              <a className="navbar-brand" href="#" onClick={this.loadFeeds}>
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right my-2">
              <div className="dropdown" onClick={this.toggleOpen}>
                <a href="#" id="dropdownMenuLink" className="dropdown-toggle mx-md-5" data-bs-toggle="dropdown" role="button" aria-expanded="false"><span id="user-icon">{currentUser}</span></a>
                <ul id="dropdownList row" className={menuClass} role="menu" aria-labelledby="dropdownMenuLink">
                  <li ><a href="#" className="dropdown-item username">{currentUser}</a></li>
                  <li role="presentation" className="divider"></li>
                  <li ><a className="dropdown-item" href="#">Lists</a></li>
                  <li role="presentation" className="divider"></li>
                  <li ><a className="dropdown-item" href="#">Help</a></li>
                  <li ><a className="dropdown-item" href="#">Keyboard shortcuts</a></li>
                  <li role="presentation" className="divider"></li>
                  <li ><a className="dropdown-item" href="#">Settings</a></li>
                  <li ><a className="dropdown-item" onClick={this.handleLogout} id="log-out" href="#">Log out</a></li>
                </ul>
              </div>
            </ul>
            
            <div className="d-md-flex d-none search-bar nav navbar-right pt-1">
              <div className="input-group border rounded">
                <input type="text" className="form-control search-input border" placeholder="Search for..." />
                <span className="input-group-btn">
                  <button className="btn btn-outline-secondary border search-btn rounded-0" type="button">Go!</button>
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

export default Navbar;