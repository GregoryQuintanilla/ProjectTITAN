import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login'
import Register from './RegisterPage'
import AdminPage from './AdminPage'
import DriverPage from './DriverPage'
import axios from 'axios'

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state={};
    // this.MiddleFunction=this.MiddleFunction.bind(this)
    // this.getValue=this.getValue.bind(this)
    this.AuthenticateAdmin=this.AuthenticateAdmin.bind(this)
    this.AuthenticateDriver=this.AuthenticateDriver.bind(this)
    // this.hello=this.hello.bind(this)
  }


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
    /*async AuthenticateAdmin() {

        // GET request using fetch with async/await
        const response = await fetch('/CheckAdminLoggedIn');
        const data = await response.json();
        var admin=data[0].Administrator;
        console.log(admin)
        this.setState({ Administrator: admin })

    };*/

  // async hello(){
  //     const AdminResponse = await axios.get('/CheckAdminLoggedIn');
  //     const Admin = AdminResponse.data[0].Administrator;
  //     const DriverResponse= await axios.get('CheckDriverLoggedIn');
  //     const Driver = DriverResponse.data[0].Driver;
  //     return [Admin,Driver]
  //
  //   };
  //
  // MiddleFunction(event){
  //   const Admin= this.hello();
  //   const name =Admin.then(result=> this.getValue(result,this.state.AuthenticatedAdmin,this.state.AuthenticatedDriver));
  //  //  console.log(Array)
  //  //  const Admin=Array[0];
  //  // // console.log(Admin)
  //  //  if (Admin !=''){
  //  //    return <Route path='/AdminPage' exact component={AdminPage}/>
  //  //  }
  //  //  else{
  //  //    return <Redirect path={'/Login'}/>
  //  //  }
  //
  // }
  // getValue(res,Admin,Driver){
  //   var name =res;
  //   Admin=true;
  //   if(name[0]!=''){
  //     Admin=true;
  //   }
  //   if (name[1]!=''){
  //     Driver=true
  //   }
  // }
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
  //
  // // functionTwo() {
  // //   const Admin=this.componentDidMount();
  // //   console.log(Admin)
  // //   const name =Admin.then(res=> this.getValue(res));                              // "Promise resolved successfully"
  // //
  // //
  // //
  // //   if(Admin=="Aquinteros"){
  // //     console.log('checks')
  // //   }
  // // }
  // // getValue(res){
  // //   const name =res;
  // //   console.log(name.data[0].Administrator)
  // // }


  render()
    {
    // this.MiddleFunction()

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
