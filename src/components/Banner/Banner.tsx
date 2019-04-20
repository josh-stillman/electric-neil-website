import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import {  reactGetBaseUrl } from '../../lambda/utils';
import LoadingSpinner from '../LoadingSpinner';

interface Props extends RouteComponentProps{
  message?: string;
  match: any;
  type: 'subscribe' | 'unsubscribe';
}

const baseClass = 'banner'
class Banner extends Component<Props> {
  state = {
    loading: true,
    message: '',
  };

  componentDidMount() {
    this.handleAction();
  }

  handleAction = () => {
    const { match, type } = this.props;
    const { subscriber_id } = match.params;

    fetch(`/.netlify/functions/${type === 'unsubscribe' ? 'unsubscribe' : 'confirm'}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: subscriber_id,  context: process.env.REACT_APP_CONTEXT })
    })
      .then(res => res.json())
      .then(({ message }) => this.setState({ message, loading: false }))
      .catch((e) => this.setState({message: JSON.stringify(e)}));
  };

  render() {
    const { match } = this.props;
    const { message, loading } = this.state;

    return (
      <div className={baseClass}>
        {loading && <LoadingSpinner/>}
        {message}

        <Link to="/">
          <div>
            ❌
          </div>
        </Link>
      </div>);
  }

}

export default Banner;
