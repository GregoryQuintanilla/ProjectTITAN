import React,{Component} from 'react'
import {MDBCard, MDBCardBody, MDBCol, MDBRow} from 'mdbreact';
import { MDBContainer, MDBBtn, MDBInput } from 'mdbreact';
import './RegisterPage.css';
import {NavLink} from "react-router-dom";


class RegisterPage extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {value: ''};
    //
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    //
    // handleChange(event) {
    //     this.setState({value: event.target.value});
    // }
    //
    // handleSubmit(event) {
    //     alert('A name was submitted: ' + this.state.value);
    //     event.preventDefault();
    // }
    render() {
        return(

            <MDBContainer>
                <MDBRow>
                    <MDBCol sm="6">
                        <MDBCard className={"RegisterCard"}>
                            <MDBCardBody>
                                <form action="register" method="POST">
                                    <p className="h4 text-center py-4">Sign up</p>
                                    <div className="grey-text">

                                        <MDBInput
                                            label="Admin/Driver"
                                            icon="user"
                                            type="text" name="status" placeholder="Status" required
                                        />
                                    </div>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="Username"
                                            icon="user"
                                            type="text" name="username" placeholder="Username" required
                                        />
                                        <MDBInput
                                            icon="lock"
                                            label="Password"
                                            type="password" name="password" placeholder="Password" required
                                        />
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <MDBBtn className={"btn-block"} type="submit">
                                            Register
                                        </MDBBtn>
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


export default RegisterPage;