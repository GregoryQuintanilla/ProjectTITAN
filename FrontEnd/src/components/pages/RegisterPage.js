import React from 'react'
import {MDBCard, MDBCardBody, MDBCol, MDBModalFooter, MDBRow} from 'mdbreact';
import { MDBContainer, MDBBtn, MDBInput } from 'mdbreact';
import './RegisterPage.css';
import {NavLink} from "react-router-dom";


const RegisterPage =()=>{
    return (

        <MDBContainer>
          <MDBRow>
            <MDBCol sm="6">
                <MDBCard className={"RegisterCard"}>
                    <MDBCardBody>
                        <form>
                            <p className="h4 text-center py-4">Sign up</p>
                            <div className="grey-text">

                                <select className="browser-default custom-select">
                                    <option>Choose your status</option>
                                    <option value="1">Administrator</option>
                                    <option value="2">Driver</option>
                                </select>
                            </div>
                            <div className="grey-text">
                                <MDBInput
                                    label="Your name"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    label="Your email"
                                    icon="envelope"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    label="Confirm your email"
                                    icon="exclamation-triangle"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    label="Your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
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
  }




export default RegisterPage;