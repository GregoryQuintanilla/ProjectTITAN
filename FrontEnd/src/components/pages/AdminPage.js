import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {MDBTabPane, MDBTabContent,MDBNavbar, MDBNavbarBrand, MDBNavbarNav,MDBNavItem, MDBContainer, MDBCard, MDBCol, MDBRow, MDBCardText, MDBBtn, MDBIcon} from 'mdbreact';
import  {GoogleMap, LoadScript,DirectionsService, DirectionsRenderer, DistanceMatrixService} from '@react-google-maps/api';
import "./AdminPage.css";
import * as routeBuilder from './routeBuilder.js';

class AdminPage extends Component {
    state = {
        activeItem: "1",
        directionsService: null,
        directionsRenderer: null,
        distanceMatrixService: null,
        origin: ["40.713333, -73.602316"],
        stops: ["40.710809, -73.597700",
               "40.711851, -73.606779",
               "40.710916, -73.603510",
               "40.712388, -73.607007",
               "40.710639, -73.575412",
               "40.707671, -73.572146",
               "40.721859, -73.623643",
               "40.715244, -73.609998",
               "40.725522, -73.611866",
               "40.710146, -73.608804",
               "40.705958, -73.587641"]
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


                                        <MDBBtn className= {"CalculateBtn"} onClick={(e) => {routeBuilder.calcRoute(this.state.origin, this.state.stops, this.state.directionsService, this.state.directionsRenderer, this.state.distanceMatrixService)}}>
                                            Calculate
                                        </MDBBtn>



                                    </MDBCard>
                                </MDBTabPane>

                            </MDBTabContent>
                        </MDBCol>
                    </MDBRow>
               </MDBCol>
               <MDBCol className={'mapsection'} sm="9">
                   <LoadScript
                        id="script-loader"
                        googleMapsApiKey = "AIzaSyBGfI5yVMIYp2OsKUcrudxaZ22TkdfshqI"
                        >
                             <GoogleMap
                                 id='example-map'
                                 mapContainerStyle={{
                                      height:'100%',
                                      width:'100%'
                                 }}
                                 zoom={15}
                                 center = {{
                                      lat:40.710,
                                      lng:-73.601,
                                 }}
                                 >
                                 <DirectionsService
                                 options={{
                                      destination:"Hofstra University",
                                      waypoints:[{location:"35.934354, -83.584621", stopover:true}],
                                      origin: "22303 Covella Court",
                                      travelMode:"DRIVING"

                                 }}
                                 callback = {this.serviceCallBack }
                                 onLoad={directionsService => {
                                      console.log(directionsService);
                                      this.state.directionsService = directionsService;
                                 }}
                                 onUnmount = {directionService =>{
                                      console.log(directionService);
                                 }}
                               />
                                }

                                  {
                                       //(this.state.response !== null) && (
                                       <DirectionsRenderer
                                       options={{
                                            directions: this.state.response,
                                       }}
                                       onLoad = { directionsRenderer => {
                                            console.log("DirectionsRenderer Loaded" + directionsRenderer);
                                            console.log("DirectionsLoaded " + this.state.directions);
                                            this.state.directionsRenderer = directionsRenderer;
                                       }}
                                       onUnmount = { directionsRenderer => {
                                            console.log(directionsRenderer);
                                       }}
                                     />
                                  //)
                                  }

                                  {
                                       <DistanceMatrixService
                                            options={{
                                                 origin: null,
                                                 destinations: null,
                                                 travelMode: ''
                                            }}
                                            callback={ this.distanceCallBack}
                                            onLoad = {distanceMatrixService => {

                                                 this.state.distanceMatrixService = distanceMatrixService;
                                            }}
                                            />
                                  }
                            </GoogleMap>
                          </LoadScript>
                     </MDBCol>
          </MDBRow>
        </MDBContainer>
        );
    }
}

export default AdminPage;
