import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, safeCredentialsFormData,  handleErrors } from '@utils/fetchHelper';

import './add_tweet.scss';

class AddTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      image: null,
      charCount: 0,
      imagePreview: null,
      username: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value });
  }

  onFileChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0])
    });
  };

  submitTweet = (e) => {
    e.preventDefault();

    // Create an object of formData
    let formData = new FormData();
    formData.append('tweet[message]', this.state.message)
    
    if (this.state.image != null) {
      formData.append('tweet[image]', this.state.image)
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
        <form onSubmit={this.submitTweet} className="form-inline">

          <textarea className="form-control" placeholder="What's happening?" value={message} onChange={this.handleChange} name="message" required/>
          <div className="d-flex pull-right justify-content-end">
            <label id="upload-image-btn" className="my-auto me-2" htmlFor="image-select">Upload image</label>
            <input type="file" id="image-select" name="image" onChange={this.onFileChange} accept="image/*" />
            <img id="image-preview" className="me-2" src={this.state.imagePreview} />
            <button type="submit" className="btn btn-primary" disabled={ !message } id="post-tweet-btn">Tweet</button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default AddTweet;