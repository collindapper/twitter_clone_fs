import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';

import './user_tweets.scss';

class UserTweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    }
    this.getUserTweets = this.getUserTweets.bind(this);
    }
    componentDidMount () {
      this.getUserTweets();
    }

    getUserTweets (username) {

      fetch(`api/users/username/tweets`, {
        method: 'GET',
      })
      .then(handleErrors)
      .then(data => {
        console.log(res);
        this.setState({tweets: data.tweets})
      })
    }

    render () {
      const {tweets} = this.state;

      return (
        <Navbar>
          <div id="userPage">
            <div className="row">
              <div className="col-xs-3 profile-trends">
                <div className="profileCard col-xs-12">
                  <div className="profileCard-content">
                    <div className="user-field col-xs-12">
                      <a className="username" href="#">CurrentUser</a><br/>
                      <a className="screenName" href="#">CurrentUser</a>
                    </div>
                    <div className="user-stats">
                      <div className="col-xs-3">
                        <a href="">
                          <span>Tweets<br/></span>
                          <span className="user-stats-tweets">10</span>
                        </a>
                      </div>
                      <div className="col-xs-4">
                        <a href="">
                          <span>Following<br/></span>
                          <span className="user-stats-following">0</span>
                        </a>
                      </div>
                      <div className="col-xs-4">
                        <a href="">
                          <span>Followers<br/></span>
                          <span className="user-stats-followers">0</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="trends col-xs-12">
                  <div className="col-xs-12">
                    <div className="trends-header">
                      <span>Trends</span><span> &#183; </span><small><a href="">Change</a></small>
                    </div>
                    <ul className="trends-list">
                      <li><a href="#">#Hongkong</a></li>
                      <li><a href="#">#Ruby</a></li>
                      <li><a href="#">#foobarbaz</a></li>
                      <li><a href="#">#rails</a></li>
                      <li><a href="#">#API</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 feed-box">
                <div className="col-xs-12 post-tweet-box">
                  <form className="form-inline my-4">
                    <input type="text" className="form-control" placeholder="What's happening?" name="userTweet" required/><br/>
                    <div className="pull-right">
                      <button className="btn btn-primary" id="post-tweet-btn">Tweet</button>
                    </div>
                  </form>
                </div>
                <div className="feed">
                  {tweets.length > 0 ? tweets.map((tweet) => {
                    return (<Tweet
                      key={tweet.id}
                      tweet={tweet}
                      onDelete={this.deleteTweet}
                    />);
                  }) : <p>no tweets here</p>}
                </div>
              </div>
              <div className="col-xs-3 follow-suggest">
              </div>
            </div>
          </div>
        </Navbar>
      )
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <UserTweets />,
      document.body.appendChild(document.createElement('div')),
    )
  })