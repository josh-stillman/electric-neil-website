import React, { Component } from 'react';
import './App.css';
import { baseUrl } from './utils/lambda';

const baseClass = 'signup-form';

// const emailRegex = /\A[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z/
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
class SignupForm extends Component {
  state = {
    message: 'no message',
    value: '',
    error: true,
    showError: false,
  };

  onChange = (e: any) => {
    const { value } = e.target;
    this.setState({ value, error: !this.validateEmail(value) });
  };

  validateEmail = (input: string) => (
    emailRegex.test(this.state.value)
  )

  onBlur = () => {
    const { error } = this.state;

    if (error) {
      this.setState({showError: true});
    }
  }

  submitEmail = () => {
    const { error, value } = this.state;

    if (error) {
      this.setState({showError: true});
      return;
    }

    fetch(`/.netlify/functions/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: value })
    })
      .then(res => res.json())
      .then(({ message }) => this.setState({ message }))
      .catch((e) => this.setState({message: JSON.stringify(e)}));
  };

  getMessage = () => {
    fetch(`/.netlify/functions/hello`)
      .then(res => res.json())
      .then(({ message }) => this.setState({ message }));
  };

  render() {
    const { error, showError, value } = this.state;

    return (
      <div className={baseClass}>

        <div>
          <p>Mailing List</p>
          <input value={value} onChange={this.onChange} onBlur={this.onBlur} placeholder="neil@neil.com" />
          <button disabled={error} onClick={this.submitEmail}>Join the Neil Revolution</button>
          {error && showError && <p>Invalid Email Address</p>}
        </div>

        {/* <div>
          <button onClick={this.getMessage}>Get new message</button>
          <div>Message is {this.state.message}</div>
        </div> */}
      </div>
    );
  }
}

export default SignupForm;
