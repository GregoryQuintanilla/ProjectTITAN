import React, {Component, useState} from 'react'
import { Link } from 'react-router-dom';
import {
    MDBInput,
    MDBTabPane,
    MDBTabContent,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBContainer,
    MDBCard,
    MDBCol,
    MDBRow,
    MDBCardText,
    MDBBtn,
    MDBIcon,
    MDBFormInline, MDBCardBody
} from 'mdbreact';
import { Map, GoogleApiWrapper,Marker,auto } from 'google-maps-react';
import Dire from 'react-google-maps'
import "./AdminPage.css"

class AdminPage extends Component {
    state = {
        isOpen: false
    }

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
                            <MDBNavbar  className={"NavigationBar"}  dark expand="md">
                                <MDBNavbarBrand left className={"TITAN"}>
                                    <strong className="white-text">TITAN</strong>
                                </MDBNavbarBrand>
                                <MDBNavbarNav left>
                                    <MDBNavItem>
                                        <Link
                                            link
                                            to="#"
                                            active={this.state.activeItem === "1"}
                                            onClick={this.toggle("1")}
                                            role="tab"
                                        >
                                            <MDBBtn >Drivers</MDBBtn>
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
                                            <MDBBtn >Stops</MDBBtn>
                                        </Link>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <Link link to={"/"}>
                                            <MDBBtn className={"LogoutBtn"}>
                                                <MDBIcon icon={"power-off"}></MDBIcon>Logout</MDBBtn>
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
                                        <Link
                                            link
                                            to="#"
                                            active={this.state.activeItem === "5"}
                                            onClick={this.toggle("5")}
                                            role="tab">
                                            <MDBBtn className={"DriverBtn"} color={"primary"}>Add Drivers</MDBBtn>
                                        </Link>
                                        <MDBCard className={"MiddleCard"}>
                                            <MDBIcon size ="2x" className={"icon"} icon={"car-alt"}></MDBIcon>
                                            <MDBCardText className={"text"}>
                                                No Drivers
                                            </MDBCardText>
                                        </MDBCard>
                                    </MDBCard>
                                </MDBTabPane>
                                <MDBTabPane tabId="2" role="tabpanel" className={"tabpane"}>
                                    <MDBCard  className={"StopsCard "} >
                                        <MDBCard className={"MiddleCard"}>
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
                                        <MDBBtn className={"CalculateBtn white-text "} color={"primary"}>

                                            Calculate

                                        </MDBBtn>

                                    </MDBCard>
                                </MDBTabPane>
                                <MDBTabPane tabId="5" role="tabpanel" className={"tabpane"}>
                                    <MDBCard className={"AddDriversCard"}>
                                        <MDBCard className={"FormCard"}>
                                            <MDBCardBody>
                                                <form >
                                                    <p className="h4 text-center py-4">Input A Driver</p>
                                                    <div className="grey-text">
                                                        <MDBInput
                                                            label="Name"
                                                            icon="user"
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                            type="text"
                                                            name="username"
                                                            value={this.state.username}
                                                            onChange={this.handleChange}
                                                        />
                                                        <MDBInput
                                                            label="ID Number"
                                                            icon="id-card"
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />
                                                    </div>

                                                    <MDBBtn color="red" className={"btn-block3"} >
                                                        Remove Last
                                                    </MDBBtn>
                                                    <MDBBtn color="primary" className={"btn-block4"} type="click" >
                                                        Add
                                                    </MDBBtn>

                                                </form>
                                            </MDBCardBody>
                                        </MDBCard>
                                        <MDBBtn className={"SaveChanges"} color={"primary"}>
                                            Save Changes
                                        </MDBBtn>
                                        <Link link
                                              to="#"
                                              active={this.state.activeItem === "1"}
                                              onClick={this.toggle("1")}
                                              role="tab">
                                            <MDBBtn className={"Back"} color={"red"}>
                                                Back
                                            </MDBBtn>
                                        </Link>
                                    </MDBCard>

                                </MDBTabPane>
                                <MDBTabPane tabId="4" role="tabpanel" className={"tabpane"}>
                                    <MDBCard className={"UploadStopsCard"}>
                                        <MDBCard className={"FormCard"}>
                                        <MDBCardBody>
                                            <form className={"Form"}>
                                                <p className="h4 text-left py-4">Upload A File</p>
                                                <div className="grey-text">
                                                    <input type="file" onChange={this.onChange} />
                                                    <button type="submit">Upload</button>
                                                </div>
                                            </form>

                                        </MDBCardBody>
                                    </MDBCard>
                                        <MDBBtn className={"SaveChanges"} color={"primary"}>
                                            Save Changes
                                        </MDBBtn>
                                        <Link link
                                              to="#"
                                              active={this.state.activeItem === "1"}
                                              onClick={this.toggle("2")}
                                              role="tab">
                                            <MDBBtn className={"Back"} color={"red"}>
                                                Back
                                            </MDBBtn>
                                        </Link>

                                    </MDBCard>

                                </MDBTabPane>
                                <MDBTabPane tabId="3" role="tabpanel" className={"tabpane"}>
                                    <MDBCard className={"AddStopsCard"}>
                                            <MDBCard className={"FormCard"}>
                                                <MDBCardBody>
                                                    <form >
                                                        <p className="h4 text-center py-4">Input an Address</p>
                                                        <div className="grey-text">
                                                            <MDBInput
                                                                label="Street Address"
                                                                icon="road"
                                                                group
                                                                type="text"
                                                                validate
                                                                error="wrong"
                                                                success="right"
                                                                type="text"
                                                                name="username"
                                                                value={this.state.username}
                                                                onChange={this.handleChange}
                                                            />
                                                            <MDBInput
                                                                label="City"
                                                                icon="city"
                                                                group
                                                                type="text"
                                                                validate
                                                                error="wrong"
                                                                success="right"
                                                            />
                                                            <MDBInput
                                                                label="State"
                                                                icon="flag-usa"
                                                                group
                                                                type="text"
                                                                validate
                                                                error="wrong"
                                                                success="right"
                                                            />
                                                            <MDBInput
                                                                label="Zip Code"
                                                                icon="map-marker-alt"
                                                                group
                                                                type="text"
                                                                validate
                                                            />
                                                        </div>

                                                            <MDBBtn color="red" className={"btn-block2"} >
                                                                Remove Last
                                                            </MDBBtn>
                                                            <MDBBtn className={"btn-block1"} type="click" >
                                                                Add
                                                            </MDBBtn>

                                                    </form>
                                                </MDBCardBody>
                                            </MDBCard>

                                        <MDBBtn className={"SaveChanges"} color={"primary"}>
                                            Save Changes
                                        </MDBBtn>
                                        <Link link
                                              to="#"
                                              active={this.state.activeItem === "1"}
                                              onClick={this.toggle("2")}
                                              role="tab">
                                            <MDBBtn className={"Back"} color={"red"}>
                                                Back
                                            </MDBBtn>
                                        </Link>

                                    </MDBCard>
                                </MDBTabPane>

                            </MDBTabContent>
                        </MDBCol>
                    </MDBRow>

                </MDBCol>
                <MDBCol className={"mapsection"} sm="9">
                    <Map className={"Map"}
                        google={this.props.google}
                        zoom={14}
                        initialCenter={{
                            lat: -1.2884,
                            lng: 36.8233
                        }}
                    />

                </MDBCol>
            </MDBRow>
        </MDBContainer>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(AdminPage);










