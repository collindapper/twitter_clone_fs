import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, safeCredentialsFormData,  handleErrors } from '@utils/fetchHelper';

import './add_tweet.scss';

class AddTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      image: '',
      charCount: 0,
    }
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

     //if (this.state.image_url !== null) {
      formData.append('tweet[image]', this.state.image)
     //}

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
        const redirect_url = params.get('redirect_url') || '/feeds'
        window.location = redirect_url
      })
      .catch(error => {
        this.setState({
          error: 'Could not send tweet.',
        })
      })
  }

 

  render () {
    const { message, error } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={this.submitTweet} className="form-inline my-4">

          <input type="text" className="form-control" placeholder="What's happening?" value={message} onChange={this.handleChange} name="message" required/>
          <br/>
          <div className="pull-right">
            <label id="upload-image-btn" htmlFor="image-select">Upload image</label>
            <input type="file" id="image-select" name="image" onChange={this.onFileChange} accept="image/*" />

            <button type="submit" className="btn btn-primary" disabled={ !message } id="post-tweet-btn">Tweet</button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default AddTweet;