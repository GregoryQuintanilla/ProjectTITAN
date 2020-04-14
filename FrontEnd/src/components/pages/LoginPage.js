import React from 'react'
import { MDBInput,MDBContainer,MDBCol, MDBRow, MDBCard, MDBCardBody,MDBBtn, MDBModalFooter} from 'mdbreact';
import {NavLink} from "react-router-dom";
import './LoginPage.css';

const LoginPage =()=>{
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <MDBCard className={"LoginCard"}>
                        <MDBCardBody className="mx-4">
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                    <strong>Sign in</strong>
                                </h3>
                            </div>
                            <MDBInput
                                label="Your email"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                            />
                            <MDBInput
                                label="Your password"
                                group
                                type="password"
                                validate
                                containerClass="mb-0"
                            />
                            <p className="font-small blue-text d-flex justify-content-end pb-3">
                                Forgot
                                <a href="#!" className="blue-text ml-1">

                                    Password?
                                </a>
                            </p>
                            <div className="text-center mb-3">
                                <NavLink to="/AdminPage" activeClassName="activeClass">
                                    <MDBBtn
                                        type="button"
                                        rounded
                                        className="btn-block z-depth-1a"
                                    >
                                        Sign in
                                    </MDBBtn>

                                </NavLink>
                            </div>
                        </MDBCardBody>
                        <MDBModalFooter className="mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end">
                                Not a member?
                                <NavLink to="/RegisterPage" activeClassName="activeClass">
                                    <a href="#!" className="blue-text ml-1">

                                        Sign Up
                                    </a>

                                </NavLink>
                            </p>
                        </MDBModalFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>

    );

}



export default LoginPage;