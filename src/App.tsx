/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, RouteComponentProps } from 'react-router';
import SignupForm from './components/SignupForm';
import Banner from './components/Banner';

const baseClass = 'App';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component<RouteComponentProps> {
  render() {
    // console.log("env vars", process.env.REACT_APP_CONTEXT, process.env.REACT_APP_DEPLOY_URL, process.env.ENV)
    return (
      <div className="App">
        <Route
          exact
          path="/subscribe/:subscriber_id"
          // eslint-disable-next-line react/jsx-props-no-spreading
          render={props => <Banner type="subscribe" {...props} />}
        />
        <Route
          exact
          path="/unsubscribe/:subscriber_id"
          // eslint-disable-next-line react/jsx-props-no-spreading
          render={props => <Banner type="unsubscribe" {...props} />}
        />

        <a href="https://www.facebook.com/ElectricNeil/" target="_blank">
          <img
            className={`${baseClass}__logo`}
            src="/electric-neil-logo2.png"
            width="350px"
          />
        </a>

        <div className={`${baseClass}__band-pics`}>
          <div className={`${baseClass}__band-pics-closeup--landscape`}>
            <img src="/mario-noir.jpg" height="400px" />
          </div>

          <div className={`${baseClass}__band-pics-closeup`}>
            <img src="/josh-noir.jpg" height="400px" />
          </div>

          <div className={`${baseClass}__band-pics-closeup`}>
            <img src="/dan-noir.jpg" height="400px" />
          </div>

          <div className={`${baseClass}__band-pics-closeup`}>
            <img src="/mike-noir.jpeg" height="400px" />
          </div>
        </div>

        <SignupForm />

        <div className={`${baseClass}__links`}>
          <div className={`${baseClass}__link-item`}>
            <a href="https://www.facebook.com/ElectricNeil/" target="_blank">
              <img src="/fb.png" alt="Facebook" height="64px" />
            </a>
          </div>

          {/* <div className={`${baseClass}__link-item`}>
            <a href="https://twitter.com/electric_neils" target="_blank">
              <img src="/twit.png" height="64px"  />
            </a>
          </div> */}

          <div
            className={`${baseClass}__link-item, ${baseClass}__link-item--middle`}
          >
            {/* <a href="https://soundcloud.com/electric_neil" target="_blank">
              <img src="/sc.png" alt="Sound Cloud" height="64px" />
            </a>        */}
            <iframe
              title="soundcloud"
              style={{ maxWidth: '450px', minWidth: '300px' }}
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/327074774&color=%23ff5500&auto_play=false&sharing=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&show_artwork=false&buying=false&liking=false&download=false&show_comments=false&show_playcount=false&show_user=false"
            />
          </div>

          <div className={`${baseClass}__link-item`}>
            <a href="mailto:neil@electricneil.com">
              <img src="/email.png" alt="Email" height="64px" />
            </a>
          </div>
        </div>

        <div className={`${baseClass}__footer`}>
          <div className={`${baseClass}__footer-item`}>
            <span>
              Logo by{' '}
              <a href="https://benjaminstillman.com/" target="_blank">
                Benjamin&nbsp;Stillman
              </a>
            </span>
          </div>

          <div className={`${baseClass}__footer-item`}>
            <span>
              Photos by{' '}
              <a href="http://topolino500.com/" target="_blank">
                Bernard&nbsp;Bluhm
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
