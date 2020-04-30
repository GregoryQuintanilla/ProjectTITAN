import React, {Component, useState} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import{computeRoute} from "./routeBuilder";


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
import "./AdminPage.css";
import {withRouter} from 'react-router-dom';


class AdminPage extends Component {

    constructor() {
        super();
        this.state = {Driver:'',activeItem: "1", name: '',
                      Username:'',
                      origin: { lat: 40.716, lng: -73.601},
                      position: { lat: 40.716, lng: -73.601},
                      Map: null,
                      DirectionsService: null,
                      addresses: null,
                      geoCodedAddresses: null,
                      geoCodedAddressesForMarkers: null,
                      Marker: null,
                      Route: null,
                      RouteText:null,
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
                      Street:'',City:'',State:'',Zip:'',GeoCodedUnsorted:'',
                      displayitin:'',ClearMap:false,ClearMapRender:false
        };

        this.handleName = this.handleName.bind(this);
        this.handleUserName=this.handleUserName.bind(this);
        this.handleDriverAdd = this.handleDriverAdd.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
        this.handleStops=this.handleStops.bind(this)
        this.handleStreet=this.handleStreet.bind(this);
        this.handleCity=this.handleCity.bind(this);
        this.handleState=this.handleState.bind(this);
        this.handleZip=this.handleZip.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
        this.StoreData=this.StoreData.bind(this);


        this.directionsCallback = this.directionsCallback.bind(this);
        this.directionsCallback2 = this.directionsCallback2.bind(this);
        this.directionsCallback3 = this.directionsCallback3.bind(this);
        this.directionsCallback4 = this.directionsCallback4.bind(this);
        this.directionsOnload = this.directionsOnload.bind(this);
        this.onCSVChange = this.onCSVChange.bind(this);
        this.onCSVSubmit = this.onCSVSubmit.bind(this);
        this.placeMarkers = this.placeMarkers.bind(this);
        this.geocode = this.geocode.bind(this);
        this.geocode2 = this.geocode2.bind(this);
        this.markerOnload = this.markerOnload.bind(this);
        this.onMapLoad = this.onMapLoad.bind(this);
        this.onCalculateClick = this.onCalculateClick.bind(this);
        this.createRoutePackage = this.createRoutePackage.bind(this);
        this.setPlaceMarker = this.setPlaceMarker.bind(this);
        this.displayItin=this.displayItin.bind(this);
        this.getStops=this.getStops.bind(this);

    }


    onMapLoad(map){
         this.setState({Map:map});
    }
    onCSVChange(event,AdminPage){
        AdminPage.setState({ClearMap:true});
        AdminPage.setState({addresses:''});
         let file = document.getElementById('stopUploadForm').datafile.files[0];
         let fr = new FileReader();

         fr.onload = function(e){
              let text = fr.result;
              let splitText = text.split('\r\n');
              let fileLength = splitText.length;    // This is the number of addresses uploaded.
              AdminPage.setState({addresses:splitText});

              AdminPage.geocode();
              AdminPage.geocode2();
         }

         fr.readAsText(file);
         AdminPage.setState({ClearMap:false});
    }
    handleStreet(event){
        this.setState({Street: event.target.value});
    }
    handleCity(event){
        this.setState({City: event.target.value});
    }
    handleState(event){
        this.setState({State: event.target.value});
    }
    handleZip(event){
        this.setState({Zip: event.target.value});
    }
    handleStops(event){

    }
    geocode(){
         fetch("http://localhost:5000/geocode",{
              method: 'POST',
              headers:{
                   'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state.addresses)

         })

         .then(res => res.json())
         .then(res => this.setState( {geoCodedAddresses:res, geoCodedAddressesForMarkers: res.concat([])}, ()=>this.setPlaceMarker()));
    }

    StoreData(lat,address){
        for (let i = 0; i < lat.length; i++){
            var latlng=JSON.stringify(lat[i])
            localStorage.setItem(latlng,address[i])
        }
    }

    geocode2(){
        //console.log(this.state.addresses)
        fetch("http://localhost:5000/geocode2",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.addresses)

        })

            .then(res => res.json())
            .then(res => this.setState( {GeoCodedUnsorted:res}, ()=>this.StoreData(this.state.GeoCodedUnsorted,this.state.addresses)));
    }


    onCSVSubmit(event){
         event.preventDefault();

         this.setState({activeItem:"2"});
    }
    containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }

        return false;
    }
    onCalculateClick(){
                console.log(localStorage.getItem("Route1OrderedAddress93"))
               let stops = this.state.geoCodedAddresses;
               //console.log(stops);
               let origin = this.state.origin;
               let route = computeRoute(origin,stops);
               //console.log(route);
                let count=0;
                let count2=1;
               for (let i = 0; i < route.length; i++){
                   var latlng=JSON.stringify(route[i])
                    if (localStorage.getItem('Route'+count2+'OrderedAddress'+count,localStorage.getItem(latlng))!==null){
                        count=0;
                        count2++
                    } else{
                        localStorage.setItem('Route'+count2+'OrderedAddress'+count,localStorage.getItem(latlng))
                        localStorage.setItem('Route'+count2,'Route'+count2)
                        localStorage.setItem("LastRoute",'Route'+count2)
                        count++
                    }
               }
               this.setState({Route:route, geoCodedAddressesForMarkers:route.concat([]),displayItin:true});
               let sections = Math.ceil(route.length / 25);
               let firstSection = [];
               let secondSection = [];
               let thirdSection = [];
               let fourthSection = [];

               if(sections>=1){
                    for(let i =0; i< route.length;i++){
                         firstSection.push(route[i]);
                    }

               }
               if(sections>=2){
                    secondSection = firstSection.splice(26,firstSection.length);
                    firstSection.push(secondSection[0]);

               }
               if(sections >=3){
                    thirdSection =  secondSection.splice(26,secondSection.length);
                    secondSection.push(thirdSection[0]);

               }
               if(sections >= 4){
                    fourthSection = thirdSection.splice(26,thirdSection.length); 
                    thirdSection.push(fourthSection[0]);

               }




               let routePackage1 = null;
               let routePackage2 = null;
               let routePackage3 = null;
               let routePackage4 = null;

               if(sections >= 1){

                    routePackage1 = this.createRoutePackage(firstSection);

                    this.setState({RoutePackage1:routePackage1});
               }
               if(sections >=2 ){

                    routePackage2 = this.createRoutePackage(secondSection);
                    this.setState({RoutePackage2:routePackage2});
               }
               if(sections >= 3){

                    routePackage3 = this.createRoutePackage(thirdSection);
                    this.setState({RoutePackage3:routePackage3});
               }
               if(sections >= 4){
                    //console.log("4 package");
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
         //this.testData()
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

     }
     directionsCallback2(response){
          //this.testData()
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

          }
     }
     directionsCallback3(response){

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

          }
     }
     directionsCallback4(response){
          //console.log(this.testData());
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

          }
     }

    handleName(event) {
        this.setState({name: event.target.value});
    }
    handleUserName(event){
        this.setState({Username:event.target.value});
    }



    handleDriverAdd(event) {
        const database=localStorage
        var username = this.state.Username;
        database.setItem("Driver",username)
        if(localStorage.getItem(username+'Login')!==null){
            if(username!=''){
                for(var i=1;i<17;i++){
                    if (database.getItem("Driver"+i)!==null){
                        continue
                    }
                    else{
                        database.setItem("Driver"+i,username)
                        database.setItem(username,"Driver"+i)
                        alert("Driver Added!")
                        break
                    }

                }

            }else{
                alert('Fill in All Fields')
            }

        }else{
            alert("Driver does not exist! This may be because they haven't registered yet!")
        }
        this.setState({name:'', Username:''});
        event.preventDefault();
    }





    handleLogout(event){
        const database=localStorage;
        database.setItem('CurrentlyLoggedIn',null);
        this.props.history.push('/');

    }




    setPlaceMarker(){
         this.setState({placeMarkers:true}, () => this.placeMarkers());
    }

    placeMarkers(){
         let addresses = this.state.geoCodedAddressesForMarkers;

         let markers = []
         for(let i  = 0; i<addresses.length; i++){
             let newMarker = <Marker position = {addresses[i]} label = {i+''}/>;
             markers.push(newMarker);
         }
         return markers;

    }
    displayItin(){


        let itin=[]
        let RouteList=this.state.geoCodedAddressesForMarkers
        for (let i=0; i<RouteList.length;i++){
            let newrow= <tr>{localStorage.getItem(RouteList[i])}</tr>
            itin.push(newrow)
        }
        return itin;

    }


    toggle = tab => () => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    }

    ClearDirectionsCallback(response){
        //this.testData()
        if (response !== null) {
            if (response.status === 'OK') {
                console.log("display route 3");
                console.log(response);
                this.setState({ClearMap:false,ClearMapRender:true});
                this.placeMarkers()
            }
            else {
                console.log('Error: ', response)
            }
        }



    }
    getStops(route){
        var stops=''
        for(let i=1;i<100;i++){
            if((localStorage.getItem(route+"OrderedAddress"+i))===null){
                return stops
            }else{
                 stops=stops+localStorage.getItem(route+"OrderedAddress"+i)
                if(i==99){
                    return stops
                }

            }
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
                                            <MDBBtn className={"LogoutBtn"} type="button" onClick={this.handleLogout}>
                                                <MDBIcon icon={"power-off"}></MDBIcon>Logout
                                            </MDBBtn>

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
                                                <MDBTable MDBTable hover bordered striped maxHeight={"100vh"} scrollY className={'Table'}>
                                                    <MDBTableHead>
                                                        <tr className={"TableHeader"}>
                                                            <th> <MDBIcon icon={'user'}/>
                                                                 Username</th>
                                                            <th><MDBIcon icon={'map-pin'}/>Route</th>
                                                        </tr>
                                                    </MDBTableHead>
                                                    <MDBTableBody>
                                                        <tr><td>{localStorage.getItem("Driver1")}</td><td>{localStorage.getItem("Route1")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver2")}</td><td>{localStorage.getItem("Route2")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver3")}</td><td>{localStorage.getItem("Route3")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver4")}</td><td>{localStorage.getItem("Route4")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver5")}</td><td>{localStorage.getItem("Route5")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver6")}</td><td>{localStorage.getItem("Route6")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver7")}</td><td>{localStorage.getItem("Route7")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver8")}</td><td>{localStorage.getItem("Route8")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver9")}</td><td>{localStorage.getItem("Route9")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver10")}</td><td>{localStorage.getItem("Route10")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver11")}</td><td>{localStorage.getItem("Route11")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver12")}</td><td>{localStorage.getItem("Route12")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver13")}</td><td>{localStorage.getItem("Route13")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver14")}</td><td>{localStorage.getItem("Route14")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver15")}</td><td>{localStorage.getItem("Route15")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Driver16")}</td><td>{localStorage.getItem("Route16")}</td></tr>


                                                    </MDBTableBody>
                                                </MDBTable>
                                            </MDBCard>
                                        </MDBCard>
                                    </MDBTabPane>
                                    <MDBTabPane tabId="2" role="tabpanel" className={"tabpane"}>
                                        <MDBCard  className={"StopsCard "} >
                                            <MDBCard className={"MiddleCard"}>
                                                <MDBTable hover bordered striped maxHeight={"100vh"} scrollY className={'Table'}>
                                                    <MDBTableHead>
                                                        <tr className={"TableHeader"}>
                                                            <th> <MDBIcon/>
                                                                Route</th>
                                                            <th>
                                                                <MDBIcon icon={'map-pin'}/>
                                                                Stops</th>
                                                        </tr>
                                                    </MDBTableHead>
                                                    <MDBTableBody>
                                                        <tr><td>{localStorage.getItem("Route1")}</td><td>{this.getStops("Route1")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route2")}</td><td>{this.getStops("Route2")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route3")}</td><td>{this.getStops("Route3")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route4")}</td><td>{this.getStops("Route4")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route5")}</td><td>{this.getStops("Route5")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route6")}</td><td>{this.getStops("Route6")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route7")}</td><td>{this.getStops("Route7")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route8")}</td><td>{this.getStops("Route8")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route9")}</td><td>{this.getStops("Route9")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route10")}</td><td>{this.getStops("Route10")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route11")}</td><td>{this.getStops("Route11")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route12")}</td><td>{this.getStops("Route12")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route13")}</td><td>{this.getStops("Route13")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route14")}</td><td>{this.getStops("Route14")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route15")}</td><td>{this.getStops("Route15")}</td></tr>
                                                        <tr><td>{localStorage.getItem("Route16")}</td><td>{this.getStops("Route16")}</td></tr>
                                                    </MDBTableBody>
                                                </MDBTable>
                                            </MDBCard>
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
                                                    <form className={"AddDriverForm"} action={"DriverSubmit"} method={"POST"} >
                                                        <p className="h4 text-center py-4">Input A Driver</p>
                                                        <div className="grey-text">
                                                            <MDBInput className={"form-control"}
                                                                      name={"name"}
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
                                                                name={"Username"}
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

                                                        <MDBBtn type="button" onClick={this.handleDriverAdd} color="primary" className={"btn-block4"} >
                                                            Add
                                                        </MDBBtn>
                                                    </form>
                                                </MDBCardBody>
                                            </MDBCard>

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
                                                                value={this.state.Street} onChange={this.handleStreet}
                                                            />
                                                            <MDBInput
                                                                label="City"
                                                                icon="city"
                                                                group
                                                                type="text"
                                                                validate
                                                                error="wrong"
                                                                success="right"
                                                                value={this.state.City} onChange={this.handleCity}
                                                            />
                                                            <MDBInput
                                                                label="State"
                                                                icon="flag-usa"
                                                                group
                                                                type="text"
                                                                validate
                                                                error="wrong"
                                                                success="right"
                                                                value={this.state.State} onChange={this.handleState}
                                                            />
                                                            <MDBInput
                                                                label="Zip Code"
                                                                icon="map-marker-alt"
                                                                group
                                                                type="text"
                                                                validate
                                                                value={this.state.Zip} onChange={this.handleZip}
                                                            />
                                                        </div>


                                                        <MDBBtn color="primary" className={"btn-block4"} type="click" onClick={this.handleStops}>
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

                            googleMapsApiKey="AIzaSyDHe1AQwUrxyMTl6hrii3nPsfWU4CSbVKg"
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
                                    (this.state.ClearMapRender) &&
                                    (<DirectionsRenderer
                                        options={{
                                            directions:{},
                                            suppressMarkers: true,
                                            preserveViewport: true,
                                        }}



                                    />)
                                }
                                {
                                    (this.state.ClearMap) && (
                                        <DirectionsService
                                            options = {{
                                                origin: '',
                                                destination: '',
                                                travelMode: 'DRIVING'
                                            }}
                                            callback = {(response) => this.ClearDirectionsCallback(response)}
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

export default withRouter(AdminPage);

