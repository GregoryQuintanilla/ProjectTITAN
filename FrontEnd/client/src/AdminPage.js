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
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker} from '@react-google-maps/api'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "./AdminPage.css"
import {computeRoute } from './routeBuilder.js'

var drivers={};
class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {activeItem: "1",
                        name: '',
                      Username:'',
                      origin: { lat: 40.716, lng: -73.601},
                      Map: null,
                      DirectionsService: null,
                      addresses: null,
                      geoCodedAddresses: null, // The .length of this will be what was actually sent back from google. This will be the most accurate number of addresses.
                      Marker: null,
                      Route: null,
                      RoutePackage: null,
                      displayRoute: null,
                      calledDirectionsService:false,
        };

        this.handleName = this.handleName.bind(this);
        this.handleUserName=this.handleUserName.bind(this);
        this.handleDriverAdd = this.handleDriverAdd.bind(this);
        this.directionsCallback = this.directionsCallback.bind(this);
        this.directionsOnload = this.directionsOnload.bind(this);
        this.onCSVChange = this.onCSVChange.bind(this);
        this.onCSVSubmit = this.onCSVSubmit.bind(this);
        this.placeMarkers = this.placeMarkers.bind(this);
        this.geocode = this.geocode.bind(this);
        this.markerOnload = this.markerOnload.bind(this);
        this.onMapLoad = this.onMapLoad.bind(this);
        this.onCalculateClick = this.onCalculateClick.bind(this);
        this.createRoutePackage = this.createRoutePackage.bind(this);

    }
    onMapLoad(map){
         this.setState({Map:map});
    }
    onCSVChange(event,AdminPage){
         let file = document.getElementById('stopUploadForm').datafile.files[0];
         let fr = new FileReader();

         fr.onload = function(e){
              let text = fr.result;
              let splitText = text.split('\r\n');
              let fileLength = splitText.length;    // This is the number of addresses uploaded.
              AdminPage.setState({addresses:splitText});
              AdminPage.geocode();
         }
         fr.readAsText(file);
    }
    geocode(){
         fetch("http://localhost:5000/geocode",{
              method: 'POST',
              headers:{
                   'Content-Type': 'application/json'  //make sure this is spelled right, it makes a difference. 'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state.addresses),

         })
         .then(res => res.json())
         .then(res => this.setState( {geoCodedAddresses:res }, this.placeMarkers(this.state.Marker)));
    }

    placeMarkers(marker){
         console.log("Can I make a *fetch* (sorta) command call a function?");
         console.log(this.state.geoCodedAddresses);
         console.log(this.state.Map);
         console.log(marker.map);

    }
    onCSVSubmit(event){
         event.preventDefault();
         this.setState({activeItem:"2"});
    }
    onCalculateClick(){
         if(this.state.geoCodedAddresses == null){
              alert("Please upload your locations");
         }
         else{
               let stops = this.state.geoCodedAddresses;
               let origin = this.state.origin;
               let route = computeRoute(origin,stops);
               this.setState({RouteList:route});
               let routePackage = this.createRoutePackage(route);
               this.setState({RoutePackage:routePackage})
          }
    }
    createRoutePackage(route){
         let routePackage = [];
         let origin = route[0];
         route.splice(0,1);
         let waypoints = [];

         for(let i = 0; i<route.length-2;i++){
              waypoints.push({location:route[i],stopover:true});
         }

         let destination = route[route.length-1];
         routePackage.push(origin);
         routePackage.push(waypoints);
         routePackage.push(destination);

         return routePackage;
    }
    directionsOnload(directionsService){
         this.setState( {DirectionsService: directionsService});
    }
    markerOnload(marker){
         this.setState({Marker: marker});
    }
    directionsCallback(response){
          if (response !== null) {
               if (response.status === 'OK') {
                    this.setState({displayRoute: response, calledDirectionsService:true});
               }
               else {
                    console.log('Error: ', response)
               }
          }
          else{
               alert("There was no response from the DirectionsService. Something must have gonce wrong with the call.");
          }
     }

    handleName(event) {
        this.setState({name: event.target.value});
    }
    handleUserName(event){
        this.setState({Username:event.target.value});
    }

    handleDriverAdd(event) {
        var name=this.state.name;
        var Username=this.state.Username;
        var NumUsernames=Object.keys(drivers).length;
        if(NumUsernames<4){
            if (name && Username !=null){
                if (Username in drivers){
                    alert("Username exists already")
                }
                drivers[Username]=name;
                console.log(drivers)
            }
            else{
                alert("Please enter a valid Name and Username")
            }
        }
        else{
            alert('Driver Limit Reached')
        }

        this.setState({name:'', Username:''});
        event.preventDefault();
    }
    handleDriverSubmit(event){

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
                                                <MDBTable hover bordered striped>
                                                    <MDBTableHead>
                                                        <tr className={"TableHeader"}>
                                                            <th> <MDBIcon icon={'user'}/>
                                                                 Name</th>
                                                            <th><MDBIcon icon={'user'}/>Username</th>
                                                            <th><MDBIcon icon={'clipboard-check'}/>Actions</th>
                                                        </tr>
                                                    </MDBTableHead>
                                                    <MDBTableBody>
                                                        <tr>
                                                            <td>Alex</td>
                                                            <td>Mark</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td>Jacob</td>
                                                            <td>Thornton</td>
                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td>Larry</td>
                                                            <td>the Bird</td>
                                                        </tr>
                                                    </MDBTableBody>
                                                </MDBTable>
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
                                            <MDBBtn  className={"CalculateBtn white-text "} color={"primary"} onClick={() => this.onCalculateClick()}>

                                                Calculate

                                            </MDBBtn>

                                        </MDBCard>
                                    </MDBTabPane>
                                    <MDBTabPane tabId="5" role="tabpanel" className={"tabpane"}>
                                        <MDBCard className={"AddDriversCard"}>
                                            <MDBCard className={"FormCard"}>
                                                <MDBCardBody>
                                                    <form className={"AddDriverForm"} action="AddDrivers" method={"POST"} >
                                                        <p className="h4 text-center py-4">Input A Driver</p>
                                                        <div className="grey-text">
                                                            <MDBInput className={"form-control"}
                                                                      tab='5'
                                                                label="Name"
                                                                icon="user"
                                                                group
                                                                type="text"
                                                                validate
                                                                error="wrong"
                                                                success="right"
                                                                value={this.state.name} onChange={this.handleName}
                                                            />
                                                            <MDBInput
                                                                label="Username"
                                                                icon="id-card"
                                                                group
                                                                type="text"
                                                                validate
                                                                error="wrong"
                                                                success="right"
                                                                value={this.state.Username} onChange={this.handleUserName}
                                                            />
                                                        </div>

                                                        <MDBBtn color="red" className={"btn-block3"} >
                                                            Remove Last
                                                        </MDBBtn>
                                                        <MDBBtn type="button" onClick={this.handleDriverAdd} color="primary" className={"btn-block4"} >
                                                            Add
                                                        </MDBBtn>

                                                    </form>
                                                </MDBCardBody>
                                            </MDBCard>
                                            <MDBBtn  action ="DriverSubmit" method= "POST" className={"SaveChanges"} color={"primary"} type={"submit"} onClick={this.handleDriverSubmit}>
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

                                                    <form id="stopUploadForm" className={"Form"} onSubmit={(event) => {this.onCSVSubmit(event)}} >
                                                        <p className="h4 text-left py-4">Upload A File</p>
                                                        <div className="grey-text">
                                                            <input type="file" name='datafile' accept='.csv' onChange={(event) => {this.onCSVChange(event,this)}} />
                                                            <input type="submit"></input>
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
                                                        <MDBBtn color="primary" className={"btn-block1"} type="click" >
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
                        <LoadScript
                            id="script-loader"
                            googleMapsApiKey="AIzaSyBGfI5yVMIYp2OsKUcrudxaZ22TkdfshqI"

                        >
                            <GoogleMap className={"Map"}
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
                                       onLoad = {(map) => this.onMapLoad(map)}

                            >
                            {
                            (this.state.RoutePackage != null && !this.state.calledDirectionsService) && (
                                 <DirectionsService
                                   options = {{
                                        origin: this.state.RoutePackage[0],
                                        waypoints: this.state.RoutePackage[1],
                                        destination: this.state.RoutePackage[2],
                                        travelMode: 'DRIVING'
                                   }}
                                   callback = {(response) => this.directionsCallback(response)}
                                   onLoad = {(directionsService) => {this.directionsOnload(directionsService)}}
                                 />)
                            }
                           {
                                (this.state.displayRoute != null) &&
                                (<DirectionsRenderer
                                   options={{
                                        directions:this.state.displayRoute,
                                        suppressMarkers: true,
                                        preserveViewport: true,
                                   }}



                                />)
                           }
                            {
                                 <Marker
                                        onLoad = {(marker) => this.markerOnload(marker)}
                                        position = { {lat:40.7,lng:-73.55} }
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
