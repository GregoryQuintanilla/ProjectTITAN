import React, {Component} from 'react'
import { MDBInput,MDBContainer,MDBCol, MDBRow, MDBCard, MDBCardBody,MDBBtn, MDBModalFooter} from 'mdbreact';
import {Link} from "react-router-dom";
import './Login.css';
import {withRouter} from 'react-router-dom';


class LoginPage extends Component{
    constructor() {
        super();
        this.state={username:'',password:''}
        this.handleUserName=this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleUserName(event){
        this.setState({username:event.target.value});
    }
    handlePassword(event){
        this.setState({password:event.target.value});
    }

    handleSubmit(event){
        const database=localStorage;
        var username = this.state.username;
        var password = this.state.password;
        if  ((username!='') && (password !='')){
            if((username+'Login' in database)===true){
                if(database.getItem(username+'Login')==password){
                    if(database.getItem(username+'Type')==='admin'){
                        database.setItem('CurrentlyLoggedIn',username)
                        this.props.history.push('/AdminPage');
                    }
                    else{
                        database.setItem('CurrentlyLoggedIn',username)
                        this.props.history.push('/DriverPage');
                    }
                }
                else{
                    alert('Incorrect Password')
                }
            }
            else{
                alert('Incorrect Username and Password')
            }

        }
        else{
            alert('Please Fill In All Fields')
        }

        this.setState({status:'',username:'', password:''})
        event.preventDefault()

    }

    render() {
        return(

            <MDBContainer>
                <MDBRow>
                    <MDBCol sm="6">
                        <MDBCard className={"LoginCard"}>
                            <MDBCardBody className="mx-4">
                                <div className="text-center">
                                    <h3 className="dark-grey-text mb-5">
                                        <strong>Sign in</strong>
                                    </h3>
                                </div>
                                <form >
                                    <MDBInput
                                        label="Username"
                                        type="text" name="username" placeholder="Username" required value={this.state.username} onChange={this.handleUserName}
                                    />
                                    <MDBInput
                                        label="Password"
                                        type="password" name="password" placeholder="Password" required value={this.state.password} onChange={this.handlePassword}
                                    />
                                    
                                    <div className="text-center mb-3">
                                        <MDBBtn
                                            type="submit"
                                            onClick={this.handleSubmit}
                                            rounded
                                            className="btn-block z-depth-1a"
                                        >
                                            Sign in
                                        </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                            <MDBModalFooter className="mx-5 pt-3 mb-1">
                                <p className="font-small grey-text d-flex justify-content-end">
                                    Not a member?
                                    <Link to="/RegisterPage" activeClassName="activeClass">
                                        <a href="#!" className="blue-text ml-1">

                                            Sign Up
                                        </a>

                                    </Link>
                                </p>
                            </MDBModalFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );

    };

}


export default withRouter(LoginPage);