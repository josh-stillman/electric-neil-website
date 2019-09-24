import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { StyledP, StyledLink, Wrapper } from './Banner.css';
import LoadingSpinner from '../LoadingSpinner';

interface Props extends RouteComponentProps {
  message?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  match: any;
  type: 'subscribe' | 'unsubscribe';
}

const baseClass = 'banner';
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

    fetch(
      `/.netlify/functions/${
        type === 'unsubscribe' ? 'unsubscribe' : 'confirm'
      }`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: subscriber_id,
          context: process.env.REACT_APP_CONTEXT,
        }),
      }
    )
      .then(res => {
        if (res.status >= 400) {
          // eslint-disable-next-line react/no-unused-state
          this.setState({ errorResponse: true });
        }
        return res.json();
      })
      .then(({ message }) =>
        // eslint-disable-next-line react/no-unused-state
        this.setState({ message, loading: false, errorResponse: false })
      )
      .catch(() =>
        this.setState({
          message: 'Error.  Please try again.',
          // eslint-disable-next-line react/no-unused-state
          errorResponse: true,
        })
      );
  };

  render() {
    const { message, loading } = this.state;

    return (
      <Wrapper className={baseClass}>
        {loading && <LoadingSpinner />}
        {message && <StyledP>{message}</StyledP>}
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <StyledLink to="/">❌</StyledLink>
      </Wrapper>
    );
  }
}

export default Banner;
