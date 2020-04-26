import React from 'react'
import { MDBInput,MDBContainer,MDBCol, MDBRow, MDBCard, MDBCardBody,MDBBtn, MDBModalFooter} from 'mdbreact';
import {Link} from "react-router-dom";
import './Login.css';

const LoginPage =()=> {
return (

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
                    <form action="auth" method="POST">
                        <MDBInput
                            label="Username"
                            type="text" name="username" placeholder="Username" required
                        />
                        <MDBInput
                            label="Password"
                            type="password" name="password" placeholder="Password" required
                        />

                    <p className="font-small blue-text d-flex justify-content-end pb-3">
                        Forgot
                        <a href="#!" className="blue-text ml-1">

                            Password?
                        </a>
                    </p>
                    <div className="text-center mb-3">
                        <MDBBtn
                                type="submit"
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


}



export default LoginPage;