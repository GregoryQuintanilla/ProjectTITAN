import React from 'react'
import { MDBCol, MDBRow } from 'mdbreact';
import { MDBContainer, MDBBtn, MDBInput } from 'mdbreact';
import './RegisterPage.css';


const RegisterPage =()=>{
    return (
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <div className={"register"}>
                <form>
                  <p className="h5 text-center mb-4">Sign up</p>
                  <div className="grey-text">
                    <div>
                      <select className="browser-default custom-select">
                        <option>Choose your status</option>
                        <option value="1">Administrator</option>
                        <option value="2">Driver</option>
                      </select>
                    </div>
                    <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                              success="right"/>
                    <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                              success="right"/>
                    <MDBInput label="Confirm your email" icon="exclamation-triangle" group type="text" validate
                              error="wrong" success="right"/>
                    <MDBInput label="Your password" icon="lock" group type="password" validate/>
                  </div>
                  <div className="text-center">
                    <MDBBtn color="primary">Register</MDBBtn>
                  </div>
                </form>

              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
    );
  }




export default RegisterPage;