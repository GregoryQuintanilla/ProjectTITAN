import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login'
import Register from './RegisterPage'
import AdminPage from './AdminPage'
import DriverPage from './DriverPage'

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state={};

    this.AuthenticateAdmin=this.AuthenticateAdmin.bind(this)
    this.AuthenticateDriver=this.AuthenticateDriver.bind(this)
  }


  AuthenticateAdmin(event){
      const database=localStorage;
      const user=database.getItem('CurrentlyLoggedIn');
      if(database.getItem(user+'Type')==='admin'){
          return <Route path='/AdminPage' exact component={AdminPage}/>
      }else{
          return <Redirect to={'/'}/>
      }
  }
  AuthenticateDriver(event){
      const database=localStorage;
      const user=database.getItem('CurrentlyLoggedIn');
      if(database.getItem(user+'Type')==='driver'){
          return <Route path='/DriverPage' exact component={DriverPage}/>
      }else{
          return <Redirect to={'/'}/>
      }

  }



  render()
    {

      return (

          <BrowserRouter>

            <Route path='/' exact component={Login}/>
            <Route path='/RegisterPage' exact component={Register}/>
            <Route path='/AdminPage' exact component={this.AuthenticateAdmin}/>
            <Route path='/DriverPage' exact component={this.AuthenticateDriver}/>

          </BrowserRouter>

      );
    }
  }

export default App;
