import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);

    /**
     * Description: All variable declartion inside state
     * Author:
     */
    this.state = {
      value: '',
      isGenerated: false,
      mainUrlState: '',
      shortUrlState: '',
      createUrl: 'http://202.164.36.10:3001/createUrl',
      baseUrl: 'http://202.164.36.10:3001'
    };
    
    /**
     * Description: Binding all functions to dom
     * Author: 
     */
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Description: Handling input value on change
   * Author: 
   */
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  /**
   * Description: Checking if url is valid
   * Author: 
   */
  isUrlValid(url) {
	    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
	}

  /**
   * Description: Handling submition of for
   * Author: 
   */
  handleSubmit(event) {
    
    event.preventDefault();

    //@ Return if url is invalid
    if(!this.isUrlValid(this.state.value)){
      alert('Invalid Url');
      return false;
    }

    //@ Stringify json data
    const formData =JSON.stringify({
      url: this.state.value
    });

    //@ Triggering server events
    const self = this;
    axios.post(this.state.createUrl, formData, {headers: {
        'Content-Type': 'application/json'
    }})
    .then(function (response) {
      self.setState({
        mainUrlState: response.data.url.mainUrl,
        shortUrlState: response.data.url.shortUrl
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({
        isGenerated: true
    });
    this.isGenerate = true;
    return;
  }

  /**
   * Description: Generate url's view
   * Author: 
   */
  generateUrl(res = false) {
    const isGenerate = this.state.isGenerated;
    if(!this.isGenerate) {
      console.log('false')
      return false;
    }
    return(
      <div>
        <hr />
        <div className="jumbotron">
          <div className="col-sm-8 mx-auto">
            <h1>Generated Url</h1>
            <p>MainUrl: <span>{this.state.mainUrlState}</span></p>
            <p>TinyUrl: <a href={`${this.state.baseUrl}/${this.state.shortUrlState}`} target="_blank">{this.state.baseUrl}/{this.state.shortUrlState}</a></p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7 offset-3"><br/>
              <form onSubmit={this.handleSubmit} className="form-inline">
                <div className="form-group">
                  <label>
                    Enter a long URL to make tiny: : &nbsp; 
                    <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
                  </label>
                </div>
                &nbsp; 
                &nbsp; 
                <input type="submit" value="Make Tiny Url !" className="btn btn-primary" />
              </form>
              {this.generateUrl()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
