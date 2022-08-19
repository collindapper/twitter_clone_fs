import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import { safeCredentials, safeCredentialsFormData,  handleErrors } from '@utils/fetchHelper';

import './feeds.scss';


class Feeds extends React.Component {
    state = {
      currentUser: 'User',
      userTweet: '',
      tweets: [],
      charCount: 0,
  }


  componentDidMount () {
    fetch('/api/tweets')
    .then(handleErrors)
    .then(data => {
      this.setState({
        tweets: data.tweets,
      })
    })
    this.displayUsername();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value });
  }

  onFileChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.files[0],
    });
  };

  submitTweet = (e) => {
    e.preventDefault();

    // Create an object of formData
    let formData = new FormData();
    formData.append('tweet[message]', this.state.message)

    if (this.state.image_url !== null) {
      formData.append('tweet[message]', this.state.image, this.state.image.name);
    }

    fetch('/api/tweets', safeCredentialsFormData({
      method: 'POST',
      body: formData,
    }))
      .then(handleErrors)
      .then(data => {
        console.log('data', data)
        this.setState({
          username: data.tweet.user.username,
        })

        const params = new URLSearchParams(window.location.search)
        const redirect_url = params.get('redirect_url') || `/${this.state.username}/feeds`
        window.location = redirect_url
      })
      .catch(error => {
        this.setState({
          error: 'Could not send tweet.',
        })
      })
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

  countChar() {
    let {userTweet} = this.state;
    userTweet = userTweet.trim();

    let {charCount} = this.state;
    charCount =  userTweet.length;

    let {tweetButton} = this.state;

    if (charCount > 0 && charCount <= 140) {
      this.setState({
        charCount: userTweet.length,
        userTweet: userTweet.trim(),
        tweetButton: false,
      })
    } else {
      this.setState({
        tweetButton: true,
      });
    }
  }

  deleteTweet(id) {
    if(!id) {
      console.log("no tweet id");
    }

    fetch(`/api/tweets/${id}`, safeCredentials({
      method: "DELETE",
      mode:"cors",
      headers: { "Content-Type": "application/json" },
    })).then((data) => {
        console.log('success');
        this.getTweets();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    const {currentUser, userTweet, charCount, tweetButton, tweets, message, error } = this.state;

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
                <form onSubmit={this.submitTweet} className="form-inline my-4">

                  <input type="text" className="form-control" placeholder="What's happening?" value={message} onKeyUp={this.countChar} onChange={this.handleChange} name="userTweet" required/>
                  <br/>
                  <div className="pull-right">
                    <label id="upload-image-btn" htmlFor="image-select">Upload image</label>
                    <input type="file" id="image-select" name="image" onChange={this.onFileChange} accept="image/*" />

                    <button type="submit" className="btn btn-primary" disabled={ !message } id="post-tweet-btn">Tweet</button>
                    {error && <p className="text-danger mt-2">{error}</p>}
                  </div>
                </form>

                {tweets.map(tweet => {
                  return (
                    <div key={tweet.id} className="col-6 col-lg-4 mb-4 tweet">
                      <a href={`/tweet/${tweet.id}`} className="text-body text-decoration-none">
                        <p className="text-uppercase mb-0 text-secondary">{tweet.message}</p>
                        <img className="tweet-image mb-1 rounded" src={tweet.image} />
                      </a>
                    </div>
                  )
                })}
              </div>
              <div className="feed">
               
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