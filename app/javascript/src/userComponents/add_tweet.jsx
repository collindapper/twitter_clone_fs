import React from 'react';
import { safeCredentialsFormData, handleErrors } from '@utils/fetchHelper';

class AddTweet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      image: null,
      error: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  // On file select (from the pop up)
  onFileChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.files[0],
    });
  };

  postTweet = (e) => {
    e.preventDefault();

    // Create an object of formData
    let formData = new FormData();
    formData.append('tweet[message]', this.state.message);
    if (this.state.image !== null) {
      formData.append('tweet[image]', this.state.image, this.state.image.name);
    }

    fetch('/api/tweets', safeCredentialsFormData({
      method: 'POST',
      body: formData,
    }))
      .then(handleErrors)
      .then(data => {
        const tweetForm = document.querySelector('textarea#tweet')
        tweetForm.value = ''
        const tweetFormFile = document.querySelector('input#file-select')
        tweetFormFile.value = ''
        this.props.getAllTweets()
        this.setState({ 
          message: '',
          image: null
        })
      })
      .catch(error => {
        this.setState({
          error: 'Could not post a tweet.',
        })
      })
  }

  // --- Tweet form for submitting a new tweet  ---
  render () {
    const { message, error } = this.state;

    return (
      <form onSubmit={this.postTweet}>
        <div className="mb-3">
          <textarea className="form-control" id="tweet" rows="3" placeholder="What's happening?" name="msg" value={message} onChange={this.handleChange}></textarea>
        </div>
        <div className="form-group row g-0">
          <div className="col d-inline-flex">
            <input className="form-control" type="file" id="file-select" name="image" onChange={this.onFileChange} />
          </div>
          <div className="col d-flex justify-content-end">
            {/* <span className="tweet-char-counter" onKeyUp={this.handleCharChange}></span> */}
            <button type="submit" className="btn btn-tweet"><b>Tweet</b></button>
          </div>
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    )
  }
}

export default AddTweet;