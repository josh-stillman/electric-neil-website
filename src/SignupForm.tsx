import React, { Component } from 'react';
import './App.css';
import { reactGetBaseUrl } from './lambda/utils';

const baseClass = 'signup-form';

const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
class SignupForm extends Component {
  state = {
    message: 'no message',
    value: '',
    error: true,
    showError: false,
    loading: false,
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

    this.setState({loading: true});

    fetch(`/.netlify/functions/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: value, context: process.env.REACT_APP_CONTEXT, baseUrl: reactGetBaseUrl() })
    })
      .then(res => res.json())
      .then(({ message }) => this.setState({ message, loading: false, }))
      .catch((e) => this.setState({message: JSON.stringify(e), loading: false}));
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

        <div>
          <div>Message is {this.state.message}</div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
