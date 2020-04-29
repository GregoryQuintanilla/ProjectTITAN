import React, {Component, useState,cloneElement, createElement} from 'react'
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
                      position: { lat: 40.716, lng: -73.601},
                      Map: null,
                      DirectionsService: null,
                      addresses: null,
                      geoCodedAddresses: null,
                      geoCodedAddressesForMarkers: null,// The .length of this will be what was actually sent back from google. This will be the most accurate number of addresses.
                      Marker: null,
                      Route: null,
                      RoutePackage: null,
                      RoutePackage2: null,
                      RoutePackage3: null,
                      RoutePackage4: null,
                      displayRoute1: null,
                      displayRoute2: null,
                      displayRoute3: null,
                      displayRoute4: null,
                      calledDirectionsService1:false,
                      calledDirectionsService2:false,
                      calledDirectionsService3:false,
                      calledDirectionsService4:false,
                      placeMarkers: false,
        };

        this.handleName = this.handleName.bind(this);
        this.handleUserName=this.handleUserName.bind(this);
        this.handleDriverAdd = this.handleDriverAdd.bind(this);
        this.directionsCallback = this.directionsCallback.bind(this);
        this.directionsCallback2 = this.directionsCallback2.bind(this);
        this.directionsCallback3 = this.directionsCallback3.bind(this);
        this.directionsCallback4 = this.directionsCallback4.bind(this);
        this.directionsOnload = this.directionsOnload.bind(this);
        this.onCSVChange = this.onCSVChange.bind(this);
        this.onCSVSubmit = this.onCSVSubmit.bind(this);
        this.placeMarkers = this.placeMarkers.bind(this);
        this.geocode = this.geocode.bind(this);
        this.markerOnload = this.markerOnload.bind(this);
        this.onMapLoad = this.onMapLoad.bind(this);
        this.onCalculateClick = this.onCalculateClick.bind(this);
        this.createRoutePackage = this.createRoutePackage.bind(this);
        this.setPlaceMarker = this.setPlaceMarker.bind(this);
        this.testData = this.testData.bind(this);

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
         .then(res => this.setState( {geoCodedAddresses:res, geoCodedAddressesForMarkers: res.concat([])}, ()=>this.setPlaceMarker()));
    }
    onCSVSubmit(event){
         event.preventDefault();
         this.setState({activeItem:"2"});
    }
    onCalculateClick(){
               let stops = this.state.geoCodedAddresses;
               console.log(stops);
               let origin = this.state.origin;
               let route = computeRoute(origin,stops);
               console.log(route);
               this.setState({RouteList:route, geoCodedAddressesForMarkers:route.concat([])});
               console.log("Length of the Route" + route.length)
               let sections = Math.ceil(route.length / 25);
               console.log("Number of sctions" + sections);
               let firstSection = [];
               let secondSection = [];
               let thirdSection = [];
               let fourthSection = [];

               if(sections>=1){
                    for(let i =0; i< route.length;i++){
                         firstSection.push(route[i]);
                    }
                    console.log("1:");
                    console.log(firstSection);
               }
               if(sections>=2){
                    secondSection = firstSection.splice(26,firstSection.length);
                    firstSection.push(secondSection[0]);
                    console.log("2: ");
                    console.log(secondSection);
               }
               if(sections >=3){
                    thirdSection =  secondSection.splice(26,secondSection.length);
                    secondSection.push(thirdSection[0]);
                    console.log("3: ");
                    console.log(thirdSection);
               }
               if(sections >= 4){
                    fourthSection = thirdSection.splice(26,thirdSection.length); 
                    thirdSection.push(fourthSection[0]);
                    console.log("4: ");
                    console.log(fourthSection);
               }




               let routePackage1 = null;
               let routePackage2 = null;
               let routePackage3 = null;
               let routePackage4 = null;

               if(sections >= 1){
                    console.log("1 package");
                    routePackage1 = this.createRoutePackage(firstSection);
                    console.log(routePackage1);
                    this.setState({RoutePackage1:routePackage1});
               }
               if(sections >=2 ){
                    console.log("2 package");
                    routePackage2 = this.createRoutePackage(secondSection);
                    this.setState({RoutePackage2:routePackage2});
               }
               if(sections >= 3){
                    console.log("3 package");
                    routePackage3 = this.createRoutePackage(thirdSection);
                    this.setState({RoutePackage3:routePackage3});
               }
               if(sections >= 4){
                    console.log("4 package");
                    routePackage4 = this.createRoutePackage(fourthSection);
                    this.setState({RoutePackage4:routePackage4});
               }
               //this.setState({RoutePackage1:routePackage1,RoutePackage2:routePackage2,RoutePackage3:routePackage3,RoutePackage4:routePackage4 })
          // }
    }
    createRoutePackage(route){
         let routePackage = [];
         let origin = route[0];
         let destination = route[route.length-1];
         route.splice(0,1);
         route.splice(route.length-1,1);
         let waypoints = [];

         for(let i = 0; i<route.length-1;i++){
              waypoints.push({location:route[i],stopover:true});
         }


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
         this.testData()
          if (response !== null) {
               if (response.status === 'OK') {
                    console.log("display route 1");
                    console.log(response);
                    this.setState({displayRoute1: response, calledDirectionsService1:true});
                    this.placeMarkers()
               }
               else {
                    console.log('Error: ', response)
               }
          }
          else{
               //alert("There was no response from the DirectionsService. Something must have gonce wrong with the call.");
          }
     }
     directionsCallback2(response){
          this.testData()
          if (response !== null) {
               if (response.status === 'OK') {
                    console.log("display route 2");
                    console.log(response);
                    this.setState({displayRoute2: response, calledDirectionsService2:true});
                    this.placeMarkers()
               }
               else {
                    console.log('Error: ', response)
               }
          }
          else{
               //alert("There was no response from the DirectionsService. Something must have gonce wrong with the call.");
          }
     }
     directionsCallback3(response){
          this.testData()
          if (response !== null) {
               if (response.status === 'OK') {
                    console.log("display route 3");
                    console.log(response);
                    this.setState({displayRoute3: response, calledDirectionsService3:true});
                    this.placeMarkers()
               }
               else {
                    console.log('Error: ', response)
               }
          }
          else{
               //alert("There was no response from the DirectionsService. Something must have gonce wrong with the call.");
          }
     }
     directionsCallback4(response){
          console.log(this.testData());
          if (response !== null) {
               if (response.status === 'OK') {
                    console.log("display route 4");
                    console.log(response);
                    this.setState({displayRoute4: response, calledDirectionsService4:true});
                    this.placeMarkers()
               }
               else {
                    console.log('Error: ', response)
               }
          }
          else{
               //alert("There was no response from the DirectionsService. Something must have gonce wrong with the call.");
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
    setPlaceMarker(){
         this.setState({placeMarkers:true}, () => this.placeMarkers());
    }
    testData(){
         console.log(this.state);
    }
    placeMarkers(){
         // console.log(this.state.Marker);
         let addresses = this.state.geoCodedAddressesForMarkers;
         //console.log(this.state.geoCodedAddresses.length);

         let markers = []
         for(let i  = 0; i<addresses.length; i++){
             let newMarker = <Marker position = {addresses[i]} label = {i+''}/>;
             markers.push(newMarker);
         }
         return markers;
         // createElement(<Marker
         //        onLoad = {(marker) => this.markerOnload(marker)}
         //        position = { {lat:45,lng:-74} }
         // />);
         // console.log(testMarker);
         // console.log(AdminPage);
         // console.log(this);
         // console.log(this.state.Marker);
         // console.log(this.state.Map);
         // console.log(document.getElementById('map'));
         // let marker  = this.state.Marker;
         // console.log(marker);
         // marker.position = {lat:45,lng:-73};
         // console.log(marker);
         // let marker = <Marker
         //        onLoad = {(marker) => this.markerOnload(marker)}
         //        position = { {lat:45,lng:-73.55} }
         // />
         // console.log(marker.toString());
         // let newElement = createElement(marker.toString());
         // this.render();\
         // let markers =[];
         // let newMarker1 = <Marker position = {{lat:45,lng:-74}} />;
         // let newMarker2 = <Marker position = {{lat:46,lng:-73}} />;
         // markers.push(newMarker1);
         // markers.push(newMarker2);
         // return markers;
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
                                                    <MDBTableBody id = "driverTable">
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

                                                        let newRow = <tr>  </tr>;
                                                        newData1= <td> # </td>
                                                        newData2 = <td> firstName
                                                        newData3 =  </td> <td> lastName </td>
                                                        newRow.push(newdata1)

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
                                                onClick={() => this.testData()}
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
                                            <MDBBtn  className={"CalculateBtn white-text "} color={"primary"} onClick={() => this.onCalculateClick()}>   // THIS IS THE CALC BUTTON, MAKE SURE TO PUT IT BACK

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
                                       id='map'
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
                            (this.state.RoutePackage1 != null && !this.state.calledDirectionsService1) && (
                                 <DirectionsService
                                   options = {{
                                        origin: this.state.RoutePackage1[0],
                                        waypoints: this.state.RoutePackage1[1],
                                        destination: this.state.RoutePackage1[2],
                                        travelMode: 'DRIVING'
                                   }}
                                   callback = {(response) => this.directionsCallback(response)}
                                   onLoad = {(directionsService) => {this.directionsOnload(directionsService)}}
                                 />)
                            }
                            {
                            (this.state.RoutePackage2 != null && !this.state.calledDirectionsService2) && (
                                 <DirectionsService
                                   options = {{
                                        origin: this.state.RoutePackage2[0],
                                        waypoints: this.state.RoutePackage2[1],
                                        destination: this.state.RoutePackage2[2],
                                        travelMode: 'DRIVING'
                                   }}
                                   callback = {(response) => this.directionsCallback2(response)}
                                   onLoad = {(directionsService) => {this.directionsOnload(directionsService)}}
                                 />)
                            }
                            {
                            (this.state.RoutePackage3 != null && !this.state.calledDirectionsService3) && (
                                 <DirectionsService
                                   options = {{
                                        origin: this.state.RoutePackage3[0],
                                        waypoints: this.state.RoutePackage3[1],
                                        destination: this.state.RoutePackage3[2],
                                        travelMode: 'DRIVING'
                                   }}
                                   callback = {(response) => this.directionsCallback3(response)}
                                   onLoad = {(directionsService) => {this.directionsOnload(directionsService)}}
                                 />)
                            }
                            {
                            (this.state.RoutePackage4 != null && !this.state.calledDirectionsService4) && (
                                 <DirectionsService
                                   options = {{
                                        origin: this.state.RoutePackage4[0],
                                        waypoints: this.state.RoutePackage4[1],
                                        destination: this.state.RoutePackage4[2],
                                        travelMode: 'DRIVING'
                                   }}
                                   callback = {(response) => this.directionsCallback4(response)}
                                   onLoad = {(directionsService) => {this.directionsOnload(directionsService)}}
                                 />)
                            }
                           {
                                (this.state.displayRoute1 != null) &&
                                (<DirectionsRenderer
                                   options={{
                                        directions:this.state.displayRoute1,
                                        suppressMarkers: true,
                                        preserveViewport: true,
                                   }}



                                />)
                           }
                           {
                                (this.state.displayRoute2 != null) &&
                                (<DirectionsRenderer
                                   options={{
                                        directions:this.state.displayRoute2,
                                        suppressMarkers: true,
                                        preserveViewport: true,
                                   }}



                                />)
                           }
                           {
                                (this.state.displayRoute3 != null) &&
                                (<DirectionsRenderer
                                   options={{
                                        directions:this.state.displayRoute3,
                                        suppressMarkers: true,
                                        preserveViewport: true,
                                   }}



                                />)
                           }
                           {
                                (this.state.displayRoute4 != null) &&
                                (<DirectionsRenderer
                                   options={{
                                        directions:this.state.displayRoute4,
                                        suppressMarkers: true,
                                        preserveViewport: true,
                                   }}



                                />)
                           }
                            {
                                 <Marker
                                        onLoad = {(marker) => this.markerOnload(marker)}
                                        position = { this.state.position}
                                 />
                            }
                            {
                                 (this.state.placeMarkers) && (this.placeMarkers())
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
