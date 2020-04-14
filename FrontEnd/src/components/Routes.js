import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

class Routes extends React.Component {
  render() {
    return (
            <Switch>
                <Route path='/' exact component={LoginPage} />
                <Route path='/AdminPage' component={AdminPage} />
                <Route path='/LoginPage' component={LoginPage} />
                <Route path='/RegisterPage' component={RegisterPage} />
            </Switch>


    );
  }
}

export default Routes;
