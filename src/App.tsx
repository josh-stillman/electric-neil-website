import React, { Component } from 'react';
import './App.css';
import SignupForm from './SignupForm';
import { Route, withRouter, RouteComponentProps } from 'react-router';
import Banner from './components/Banner';
import LoadingSpinner from './components/LoadingSpinner';

const baseClass = "App"

class App extends Component<RouteComponentProps> {
  render() {
    console.log("env vars", process.env.REACT_APP_CONTEXT, process.env.REACT_APP_DEPLOY_URL, process.env.ENV)
    return (
      <div className="App">
        <Route exact={true} path="/subscribe/:subscriber_id" render={(props) => <Banner type="subscribe" {...props}/>}/>
        <Route exact={true} path="/unsubscribe/:subscriber_id" render={(props) => <Banner type="unsubscribe" {...props}/>}/>

        <a href="https://www.facebook.com/ElectricNeil/" target="_blank">
          <img className={`${baseClass}__logo`} src="/electric-neil-logo2.png" width="350px" />
        </a>

        <div className={`${baseClass}__band-pics`}>
          <div className={`${baseClass}__band-pics-closeup--landscape`}>
            <img src="/mario-noir.jpg" height="400px"  />
          </div>

          <div className={`${baseClass}__band-pics-closeup`}>
            <img src="/josh-noir.jpg" height="400px"  />
          </div>

          <div className={`${baseClass}__band-pics-closeup`}>
            <img src="/dan-noir.jpg" height="400px"  />
          </div>

          {/* <div className={`${baseClass}__band-pics-closeup`}>
            <img src="/sarah-noir.jpg" height="400px"  />
          </div> */}
        </div>

        <SignupForm />

        <div className={`${baseClass}__links`}>
          <div className={`${baseClass}__link-item`}>
            <a href="https://www.facebook.com/ElectricNeil/" target="_blank">
              <img src="/fb.png" height="64px"  />
            </a>
          </div>

          <div className={`${baseClass}__link-item`}>
            <a href="https://twitter.com/electric_neils" target="_blank">
              <img src="/twit.png" height="64px"  />
            </a>
          </div>

          <div className={`${baseClass}__link-item`}>
            <a href="mailto:electric.neil.band@gmail.com">
              <img src="/email.png" height="64px"  />
            </a>
          </div>
        </div>

        <div className={`${baseClass}__footer`}>
          <div className={`${baseClass}__footer-item`}>
            <span>
              Logo by <a href="https://benjaminstillman.com/" target="_blank">Benjamin&nbsp;Stillman</a>
            </span>
          </div>

          <div className={`${baseClass}__footer-item`}>
            Photos by Bernard&nbsp;Bluhm
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
