import React from 'react';
import UserBanner from '@src/userComponents/userBanner';
import TrendingBanner from '@src/userComponents/trendingBanner';
import MainFeed from '@src/userComponents/mainFeed';

import '../home.scss';

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username,
      email: this.props.email,
    }
  }

  render () {
    const { username, email } = this.state

    return (
      <div className="container">
        <div className="row g-0 h-100">
          <div className="col-3 d-flex justify-content-end">
            <UserBanner username={username} email={email} />
          </div>
          <div className="col-6 feed-inner">
            <MainFeed username={username}/> 
          </div>
          <div className="col-3">
            <TrendingBanner />
          </div>
        </div>
      </div>
    )
  }
}

export default User;