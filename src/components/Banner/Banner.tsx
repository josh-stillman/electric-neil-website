import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps{
  message?: string;
  match: any;
}
class Banner extends Component<Props> {

  render() {
    const { message, match } = this.props;
    const { subscriber_id } = match.params;

    return (

      // call lambda to confirm
      // display loading spinner
      //


      <div>
        {message || "hello world"}
        {subscriber_id}
      </div>);
  }

}

export default Banner;
