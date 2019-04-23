import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { StyledP, StyledLink, Wrapper } from './Banner.css';
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
      .then(res => {
        if (res.status >= 400) {
          this.setState({errorResponse: true})
        }
        return res.json()
      })
      .then(({ message }) => this.setState({ message, loading: false, errorResponse: false }))
      .catch((e) => this.setState({message: 'Error.  Please try again.', errorResponse: true }));
  };

  render() {
    const { message, loading } = this.state;

    return (
      <Wrapper className={baseClass}>
        {loading && <LoadingSpinner/>}
        {message && <StyledP>{message}</StyledP>}

        <StyledLink to="/">
            ❌
        </StyledLink>
      </Wrapper>);
  }

}

export default Banner;
