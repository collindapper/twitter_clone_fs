import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import AddTweet from './add_tweet';
import { safeCredentials, safeCredentialsFormData,  handleErrors } from '@utils/fetchHelper';

import './user_tweets.scss';


class UserTweets extends React.Component {
    state = {
      currentUser: 'User',
      tweets: [],
  }

  componentDidMount () {
    this.loadFeeds()
  }

  loadFeeds() {
    const username = this.props.data.username;

    fetch(`/api/${username}/tweets`)
    .then(handleErrors)
    .then(data => {
      this.setState({
        tweets: data.tweets,
      })
      console.log(data.tweets);
    })
    this.displayUsername();
  }

  displayUsername() {
    fetch('/api/authenticated', safeCredentials({
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
          <div className="row container mx-auto">
            <div className="col-xs-12 col-md-4 profile-trends">

              <div className="profileCard">
                <div className="profileCard-content">
                  <div className="user-field col-xs-12 ms-3">
                    <a id={currentUser} className="username" href="#" onClick={this.loadCurrentUserFeed}>{currentUser}</a><br/>
                    <a className="screenName">@{currentUser}</a>
                  </div>
                  <div className="d-flex user-stats justify-content-around">
                    <div className="">
                      <a href="">
                        <span>Tweets<br/></span>
                        <span className="user-stats-tweets">546</span>
                      </a>
                    </div>
                    <div className="">
                      <a href="">
                        <span>Following<br/></span>
                        <span className="user-stats-following">1,345</span>
                      </a>
                    </div>
                    <div className="">
                      <a href="">
                        <span>Followers<br/></span>
                        <span className="user-stats-followers">2,067</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="trends col-xs-12">
                <div className="col-xs-12 ms-3">
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

            <div className="col-12 col-md-6 feed-box">
              <div className="col-12 post-tweet-box">
                <AddTweet />
              </div>

              <div className="feed">
                {tweets.map(tweet => {
                  return (
                    <div key={tweet.id} id={tweet.id} className="d-flex mx-auto col-12 mb-4 tweet rounded">
                      <div href={`/tweet/${tweet.id}`} className="tweet-body text-decoration-none">
                        <a id={tweet.username} className="tweet-username" href="#" onClick={this.loadUserFeed}>{tweet.username}</a>
                        <a className="tweet-screenName text-lowercase ms-1">@{tweet.username}</a>
                        <p className="mb-0 text-secondary">{tweet.message}</p>

                        {(tweet.image !== null)
                        ?
                        <img className="d-flex img-fluid tweet-image mb-1 justify-content-center rounded" src={tweet.image} />
                        :
                        <div></div>
                        }

                        <div className="d-flex justify-content-between align-items-center">
                          <p className="tweet-createdTime">{tweet.created_at}</p>
                          
                          {(currentUser === tweet.username)
                          ?
                          <i type="button" className="delete-tweet fa-solid fa-trash-can" onClick={this.deleteTweet}></i>
                          :
                          <div></div>
                          }
                        </div>
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
  const node = document.getElementById('params')
  const data = JSON.parse(node.getAttribute('data-params'))

  ReactDOM.render(
    <UserTweets data={data}/>,
    document.body.appendChild(document.createElement('div')),
  )
})
