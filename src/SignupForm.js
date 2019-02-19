import React, { Component } from 'react';
import './App.css';
import { baseUrl } from './utils/lambda';

const baseClass = "signup-form"

class SignupForm extends Component {
  state = {
    message: 'no message',
  }

  getMessage = () => {
    fetch(`${baseUrl()}/.netlify/functions/hello`)
      .then(res => res.json())
      .then(({message}) => this.setState({message}))
  }
  render() {
    return (
      <div className={baseClass}>
        <div>
          Message is {this.state.message}
        </div>

        <div>
          <button onClick={this.getMessage}>
            Get new message
          </button>
        </div>
      </div>
    );
  }
}

export default SignupForm;
