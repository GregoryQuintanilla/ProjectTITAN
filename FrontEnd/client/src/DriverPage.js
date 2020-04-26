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
import "./DriverPage.css"
import {GoogleMap, LoadScript} from "@react-google-maps/api";


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
                                    <LoadScript
                                        id="script-loader"
                                        // googleMapsApiKey="AIzaSyDHe1AQwUrxyMTl6hrii3nPsfWU4CSbVKg"

                                    >
                                        <GoogleMap
                                            id='example-map'
                                            mapContainerStyle={{
                                                height: "100%",
                                                width: "100%"
                                            }}
                                            zoom={17}
                                            center={{
                                                lat: 40.716,
                                                lng: -73.601
                                            }}

                                        >
                                        </GoogleMap>
                                    </LoadScript>
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

export default DriverPage;