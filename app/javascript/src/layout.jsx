import React from 'react';

import './layout.scss';

class Layout extends React.Component {
    state = {
      isOpen: false,
    }

    toggleOpen = () => {
      this.setState({ isOpen: !this.state.isOpen });
    }

  render () {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;

    return (
      <React.Fragment>
        <nav className="navbar-default navbar-fixed-top py-2">
          <div className="container ">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <div className="dropdown" onClick={this.toggleOpen}>
                <a href="#" className="dropdown-toggle mx-auto" id="dropdownMenuLink" data-bs-toggle="dropdown" role="button" aria-expanded="false">language: <strong>English</strong></a>
                <ul id="dropdownList" className={menuClass} aria-labelledby="dropdownMenuLink">
                  <li className="col-xs-12"><a className="dropdown-item" href="#">Bahasa Malaya</a></li>
                  <li className="col-xs-12"><a className="dropdown-item" href="#">Dansk</a></li>
                  <li className="col-xs-12"><a className="dropdown-item" href="#">English</a></li>
                  <li className="col-xs-12"><a className="dropdown-item" href="#">Suomi</a></li>
                </ul>
              </div>
            </ul>
          </div>
        </nav>
        <div>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
export default Layout;