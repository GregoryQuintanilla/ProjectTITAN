import React,{Component} from 'react'
import {MDBCard, MDBCardBody, MDBCol, MDBRow} from 'mdbreact';
import { MDBContainer, MDBBtn, MDBInput } from 'mdbreact';
import './RegisterPage.css';
import {Link, Redirect, Route} from 'react-router-dom'
import Login from "./Login";
import {withRouter} from 'react-router-dom';

//localStorage.clear()
class RegisterPage extends Component{
    constructor() {
        super();
        this.state={status:'',username:'',password:''}
        this.handleStatus = this.handleStatus.bind(this);
        this.handleUserName=this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleStatus(event) {
        this.setState({status: event.target.value});
    }
    handleUserName(event){
        this.setState({username:event.target.value});
    }
    handlePassword(event){
        this.setState({password:event.target.value});
    }

    handleSubmit(event){
        const database=localStorage
        var status=this.state.status;
        var username = this.state.username;
        var password = this.state.password;
        if  ((status!='') && (username!='') && (password !='')){
            if ((username+'Login' in database)===false){
                if((status.toLocaleLowerCase()==='admin')||(status.toLocaleLowerCase()==='driver')){
                    database.setItem(username+'Login',password)
                    database.setItem(username+'Type',status.toLocaleLowerCase())
                    alert("Registered!")

                }else{
                    alert('Enter a valid Status')
                }
            } else {
                alert('Username Taken')
            }
        }
        else{
            alert("Fill in all fields")
        }

        this.setState({status:'',username:'', password:''})
        event.preventDefault()
    }

    render() {
        return(

            <MDBContainer>
                <MDBRow>
                    <MDBCol sm="6">
                        <MDBCard className={"RegisterCard"}>
                            <MDBCardBody>
                                <form >
                                    <p className="h4 text-center py-4">Sign up</p>
                                    <div className="grey-text">

                                        <MDBInput
                                            label="Admin/Driver"
                                            icon="user"
                                            type="text" name="status" placeholder="Status" required value={this.state.status} onChange={this.handleStatus}
                                        />
                                    </div>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="Username"
                                            icon="user"
                                            type="text" name="username" placeholder="Username" required value={this.state.username} onChange={this.handleUserName}
                                        />
                                        <MDBInput
                                            icon="lock"
                                            label="Password"
                                            type="password" name="password" placeholder="Password" required value={this.state.password} onChange={this.handlePassword}
                                        />
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn className={"btn-block"} type="submit" onClick={this.handleSubmit} >
                                            Register
                                        </MDBBtn>
                                        <Link to={'/'}>
                                            <MDBBtn color={'red'}>
                                                Back To Login
                                            </MDBBtn>
                                        </Link>

                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );

    };

}


export default withRouter(RegisterPage);