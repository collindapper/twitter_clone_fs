import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

import './feeds.scss';


class Tweet extends React.Component {
  render () {

    const { tweet, onDelete } = this.props;
    const { id, message, username } = tweet;

    return (
      <div className="tweetBox col-xs-12">
        <a className="tweetUsername" href="#">{username}</a>
        <a className="screenName" href="#">  @{username}</a>
        <p>{message}</p>
        <a className="delete-tweet" onClick={() => onDelete(id)}>Delete</a>
      </div>
    )
  }
}


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'User',
      userTweet: '',
      tweets: [],
      charCount: 0,
      tweetButton: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayUsername = this.displayUsername.bind(this);
    this.countChar = this.countChar.bind(this);
    this.postTweet = this.postTweet.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    //this.filterTweets = this.filterTweets.bind(this);
    //this.fileInput = React.createRef();
  }

  componentDidMount () {
    this.displayUsername();
    this.getTweets();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postTweet();
  }

  displayUsername() {
    fetch(`/api/authenticated`, safeCredentials({
      method: 'GET',
    }))
    .then(handleErrors)
    .then(res => {
      this.setState({ currentUser: res.username });
    })
  }

  getTweets() {
    fetch(`/api/tweets`, {
      method: 'GET',
    })
    .then(handleErrors)
    .then(res => {
      console.log(res);
      this.setState({tweets: res.tweets})
    })
  }

  countChar() {
    let {userTweet} = this.state;
    userTweet = userTweet.trim();

    let {charCount} = this.state;
    charCount =  userTweet.length;

    let {tweetButton} = this.state;

    if (charCount > 0 && charCount <= 140) {
      this.setState({charCount: userTweet.length})
      this.setState({userTweet: userTweet.trim()})
      this.setState({tweetButton: false});
      //console.log(charCount);
      //console.log(userTweet);
    } else {
      this.setState({tweetButton:true});
    }
  }

  postTweet() {
    const {userTweet} = this.state;
    //let userFile = ${this.fileInput.current.files[0]};

    fetch(`/api/tweets`, safeCredentials({
      method: "POST",
      mode:"cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tweet: {
          message: userTweet,
          //image: userFile,
        }
      })
    })).then((data) => {
        console.log('success');
        this.setState({userTweet:''});
        this.getTweets();
      })
      .catch((error) => {
        console.log(error);
      })
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

  //filterTweets(username) {

    //fetch(`api/users/username/tweets`, {
      //method: 'GET',
    //})
    //.then(handleErrors)
    //.then(res => {
      //console.log(res);
      //this.setState({tweets: res.tweets})
    //})
  //}

  render () {
    const {currentUser, userTweet, charCount, tweetButton, tweets} = this.state;

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
                <form onSubmit={this.handleSubmit} className="form-inline my-4">
                  <input type="text" className="form-control" placeholder="What's happening?" value={userTweet} onKeyUp={this.countChar} onChange={this.handleChange} name="userTweet" required/><br/>
                  <div className="pull-right">
                    //<label id="upload-image-btn" htmlFor="image-select">Upload image</label>
                    //<input type="file" id="image-select" name="image" ref={this.fileInput} accept="image/*" />
                    <button className="btn btn-primary" disabled={tweetButton} id="post-tweet-btn">Tweet</button>
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
    <Feed />,
    document.body.appendChild(document.createElement('div')),
  )
})