import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login'
import Register from './RegisterPage'
import AdminPage from './AdminPage'
import DriverPage from './DriverPage'

import './App.css';

class App extends Component {
  // state = {
  //   response: '',
  //   post: '',
  //   responseToPost: '',
  // };
  //
  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }
  //
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //
  //   if (response.status !== 200) throw Error(body.message);
  //
  //   return body;
  // };
  //
  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
  //
  //   this.setState({ responseToPost: body });
  // };

  render() {
    return (
        <BrowserRouter>
        <Switch>
          <Route path='/Login' exact component={Login} />
          <Route path='/RegisterPage' exact component={Register}/>
          <Route path='/AdminPage' exact component={AdminPage}/>
            <Route path='/DriverPage' exact component={DriverPage}/>
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
