import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {MDBTabPane, MDBTabContent,MDBNavbar, MDBNavbarBrand, MDBNavbarNav,MDBNavItem, MDBContainer, MDBCard, MDBCol, MDBRow, MDBCardText, MDBBtn, MDBIcon} from 'mdbreact';
import  {GoogleMap, LoadScript} from '@react-google-maps/api';
import "./AdminPage.css";
import * as utils from './test.js';

class AdminPage extends Component {

    state = {
        isOpen: false
   };

    state = {
        activeItem: "1"
    }
    toggle = tab => () => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    }
    render() {
        return (
          <MDBContainer fluid>
            <MDBRow>
                <MDBCol  className={"uisection"} sm="3">
                    <MDBRow className={"row1"}>
                        <MDBCol size="12" className={"naviCol"}>
                            <MDBNavbar  className={"NavigationBar"} color="default-color" dark expand="md">
                                <MDBNavbarBrand left className={"TITAN"}>
                                    <strong className="white-text">TITAN</strong>
                                </MDBNavbarBrand>
                                <MDBNavbarNav center>
                                    <MDBNavItem>
                                        <Link
                                            link
                                            to="#"
                                            active={this.state.activeItem === "1"}
                                            onClick={this.toggle("1")}
                                            role="tab"
                                        >
                                            <MDBBtn>Drivers</MDBBtn>
                                        </Link>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <Link
                                            link
                                            to="#"
                                            active={this.state.activeItem === "2"}
                                            onClick={this.toggle("2")}
                                            role="tab"
                                        >
                                            <MDBBtn>Stops</MDBBtn>
                                        </Link>
                                    </MDBNavItem>

                                </MDBNavbarNav>

                            </MDBNavbar>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className={"row2"}>
                        <MDBCol className={"cardCol"} size={"12"}>
                            <MDBTabContent
                                className="card"
                                activeItem={this.state.activeItem}
                            >
                                <MDBTabPane tabId="1" role="tabpanel" className={"tabpane"}>
                                    <MDBCard className={"DriversCard"}>
                                        <MDBCard className={"test"}>
                                            <MDBIcon size ="2x" className={"icon"} icon={"car-alt"}></MDBIcon>
                                            <MDBCardText className={"text"}>
                                                No Drivers
                                            </MDBCardText>
                                        </MDBCard>
                                        <MDBBtn className={"AddBtn"}>
                                           <MDBIcon size ="2x" icon={"plus"}></MDBIcon>
                                        </MDBBtn>
                                    </MDBCard>
                                </MDBTabPane>
                                <MDBTabPane tabId="2" role="tabpanel" className={"tabpane"}>
                                    <MDBCard  className={"StopsCard "} >
                                        <MDBCard className={"test"}>
                                            <MDBIcon size ="2x" className={"icon"} icon={"map-pin"}></MDBIcon>
                                            <MDBCardText className={"text"}>
                                                No Routes
                                            </MDBCardText>
                                        </MDBCard>
                                        <Link
                                              link
                                              to="#"
                                              active={this.state.activeItem === "3"}
                                              onClick={this.toggle("3")}
                                              role="tab"
                                        >
                                            <MDBBtn className={"AddStops"} color="primary">Add Stops</MDBBtn>
                                        </Link>
                                        <Link
                                              link
                                              to="#"
                                              active={this.state.activeItem === "4"}
                                              onClick={this.toggle("4")}
                                              role="tab"
                                        >
                                            <MDBBtn className={"UploadStops"} color="primary">Upload Stops</MDBBtn>
                                        </Link>


                                        <MDBBtn className= {"CalculateBtn"} onClick={(e) => {utils.displayNumber(1)}}>
                                            Calculate
                                        </MDBBtn>



                                    </MDBCard>
                                </MDBTabPane>

                            </MDBTabContent>
                        </MDBCol>
                    </MDBRow>
               </MDBCol>
          </MDBRow>
          <MDBRow>
             <MDBBtn className={"Test"} color="primary">Test</MDBBtn>
              <LoadScript
                   id="script-loader"
                   googleMapsapiKey = "AIzaSyBGfI5yVMIYp2OsKUcrudxaZ22TkdfshqI"
                   >
                        <GoogleMap
                            id='example-map'
                            >
                       </GoogleMap>
                     </LoadScript>
          </MDBRow>
        </MDBContainer>
        );
    }
}

export default AdminPage;
