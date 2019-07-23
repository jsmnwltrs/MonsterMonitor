import firebase from 'firebase/app';
import 'firebase/auth';
import {
  Route,
  BrowserRouter,
  Redirect,
  Switch,
} from 'react-router-dom';
import React from '../../node_modules/react';

import 'bootstrap/dist/css/bootstrap.min.css';

import authRequests from '../helpers/data/authRequests';
import connection from '../helpers/data/connection';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import Home from '../components/Home/Home';
import './App.scss';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } {... rest} key={props.location.pathname}/>)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }}/>));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component {...props } key={props.location.pathname} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
    pendingUser: true,
  }

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          pendingUser: false,
        });
        authRequests.getCurrentUserJwt();
      } else {
        this.setState({
          authed: false,
          pendingUser: false,
        });
      }
    });
  }

  componentWillUnmount = () => {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const logoutClick = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (this.state.pendingUser) {
      return null;
    }
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClick={logoutClick}/>
              <Switch>
                <PrivateRoute path='/' exact component={Home} authed={this.state.authed} />
                <PrivateRoute path='/home' component={Home} authed={this.state.authed} />
                <PublicRoute path='/auth' component={Auth} authed={this.state.authed} />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
