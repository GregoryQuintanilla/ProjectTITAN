import React, { Component } from "react"
import { Link } from 'react-router-dom';
import {
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
    MDBCardBody, MDBCardHeader
} from 'mdbreact';
import  GoogleMapReact from 'google-map-react';
import "./DriverPage.css"
import { Map, GoogleApiWrapper,Marker,auto } from 'google-maps-react';


class DriverPage extends Component{

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
    render()
    {
        return (
            <MDBContainer fluid  >
                <MDBRow>
                    <MDBCol className={"ContentCol"}>
                        <MDBCol className={"CardCol"}>
                            <MDBTabContent className="card" activeItem={this.state.activeItem}>
                                <MDBTabPane tabId="1" role="tabpanel" className={"tabpane"}>
                                        <Map className={"Map"}
                                             google={this.props.google}
                                             zoom={14}
                                             initialCenter={{
                                                 lat: -1.2884,
                                                 lng: 36.8233
                                             }}
                                        />
                                </MDBTabPane>
                                <MDBTabPane tabId="2" role="tabpanel" className={"tabpane"}>
                                    <MDBCol className={"ItineraryCardCol"}>
                                        <MDBCard className={"ItineraryCard"}>
                                            <MDBCardHeader className={"ItineraryHeader white-text"} align={"center"}>
                                                <h1>Itinerary</h1>
                                            </MDBCardHeader>

                                        </MDBCard>

                                    </MDBCol>

                                </MDBTabPane>
                            </MDBTabContent>
                        </MDBCol>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol className={"TabCol"}>
                        <MDBNavbar className={"NavBarMobile"}>
                            <MDBNavbarNav center>
                                <MDBNavItem>
                                    <Link
                                        link
                                        to="#"
                                        active={this.state.activeItem === "1"}
                                        onClick={this.toggle("1")}
                                        role="tab"
                                    >
                                        <MDBBtn className={"MapBtn"} >Map</MDBBtn>
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
                                        <MDBBtn className={"ItineraryBtn"}>Itinerary</MDBBtn>
                                    </Link>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBBtn className={"LogOutBtn"}>Log Out</MDBBtn>
                                </MDBNavItem>

                            </MDBNavbarNav>
                        </MDBNavbar>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );

    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(DriverPage);