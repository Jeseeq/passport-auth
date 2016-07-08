import React from 'react';
import Login from './Auth/LoginContainer'
import Home from './Auth/HomeContainer'
import Signup from './Auth/SignupContainer'
import Dashboard from './Auth/DashboardContainer'
import Restricted from './Auth/Restricted'
import './style.css'
import { getCurrentUser, loginSuccess } from './Auth/user';
import { browserHistory, Router, Route, Link, withRouter, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'


import storeConfig from './store/createStore'
const store = storeConfig()

const checkUser = () =>{
  store.dispatch(getCurrentUser())
  .then((response) => {
    if (!response.payload.data.message){
      store.dispatch(loginSuccess(response.payload));
    }
  });
};

export default class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" onEnter={checkUser}>
              <IndexRoute component={Home} />
              <Route path="login" component={Login} />
              <Route path="signup" component={Signup} />
              <Route component={Restricted}>
                <Route path="dashboard" component={Dashboard} />
              </Route>
            </Route>
          </Router>
        </Provider>
      </div>
    )
  }
}
