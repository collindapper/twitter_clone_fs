import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import AddTweet from './add_tweet';
import { safeCredentials, safeCredentialsFormData,  handleErrors } from '@utils/fetchHelper';

import './feeds.scss';


class Feeds extends React.Component {
    state = {
      currentUser: 'User',
      tweets: [],
  }

  componentDidMount () {
    this.loadFeeds()
  }

  loadFeeds() {
    fetch('/api/tweets/')
    .then(handleErrors)
    .then(data => {
      this.setState({
        tweets: data.tweets,
      })
    })
    this.displayUsername();
  }

  displayUsername() {
    fetch(`/api/authenticated`, safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(data => {
      this.setState({ 
        currentUser: data.username });
    })
  }

  deleteTweet = (e) => {
    e.preventDefault();
    let tweetEl = e.target.closest(".tweet")
    let tweetId = tweetEl.getAttribute('id')

    fetch(`/api/tweets/${tweetId}`, safeCredentials({
      method: "DELETE",
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          this.loadFeeds()
          console.log('success');
        }
      })
      .catch((error) => {
        this.setState({
          error: 'Could not delete property.',
        })
        console.log(error);
      })
  }

  render () {
    const {currentUser, tweets } = this.state;

    return (
      <Navbar>
        <div id="feedPage">
          <div className="row">
            <div className="col-xs-3 profile-trends">
              <div className="profileCard col-xs-12">
                <div className="profileCard-content">
                  <div className="user-field col-xs-12">
                    <a className="username" href={`/${currentUser}`}>{currentUser}</a><br/>
                    <a className="screenName" href="#">@{currentUser}</a>
                  </div>
                  <div className="user-stats">
                    <div className="col-xs-3">
                      <a href="">
                        <span>Tweets<br/></span>
                        <span className="user-stats-tweets">546</span>
                      </a>
                    </div>
                    <div className="col-xs-4">
                      <a href="">
                        <span>Following<br/></span>
                        <span className="user-stats-following">1,345</span>
                      </a>
                    </div>
                    <div className="col-xs-4">
                      <a href="">
                        <span>Followers<br/></span>
                        <span className="user-stats-followers">2,067</span>
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

                <AddTweet />

              </div>

              <div className="feed">
                {tweets.map(tweet => {
                  return (
                    <div key={tweet.id} id={tweet.id} className="col-6 col-lg-4 mb-4 tweet">
                      <div href={`/tweet/${tweet.id}`} className="text-body text-decoration-none">
                        <a className="tweet-username" href="#">{tweet.username}</a>
                        <a className="tweet-screenName ms-1" href="#">@User</a>
                        <p className="mb-0 text-secondary">{tweet.message}</p>
                        <img className="tweet-image mb-1 rounded" src={tweet.image} />
                        <button type="button" className="delete-tweet btn btn-danger" onClick={this.deleteTweet}>Delete</button>
                      </div>
                    </div>
                    )
                  })}
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
    <Feeds />,
    document.body.appendChild(document.createElement('div')),
  )
})