import React, {Component, useState} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios'
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
import { GoogleMap, LoadScript} from '@react-google-maps/api'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "./AdminPage.css";
import {withRouter} from 'react-router-dom';

var drivers=[];
class AdminPage extends Component {
    constructor() {
        super();
        this.state = {Driver:'',activeItem: "1",
                        name: '',
                      Username:''
        };

        this.handleName = this.handleName.bind(this);
        this.handleUserName=this.handleUserName.bind(this);
        this.handleDriverAdd = this.handleDriverAdd.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
    }
    handleName(event) {
        this.setState({name: event.target.value});
    }
    handleUserName(event){
        this.setState({Username:event.target.value});
    }



    handleDriverAdd(event) {
        const database=localStorage
        var Admin=database.getItem("CurrentlyLoggedIn")
        const name = this.state.name;
        var username = this.state.Username.concat('');
        // database.setItem(username+'name',name)
        drivers.push(username)
        database.setItem(Admin+'Drivers',drivers)
        var currentDrivers=database.getItem(Admin+'Drivers')
        console.log(currentDrivers)







        // var name=this.state.name;
        // var username=this.state.Username;
        // var NumUsernames=drivers.length;
        // if(NumUsernames<4){
        //     if (name!='' && username!= '' ){
        //         if (username in drivers){
        //             alert("Username exists already")
        //         }
        //         if (database.getItem(username+'Login')!==null){
        //             drivers.push(username)
        //             alert('Driver Added. Remember To Save Changes When Finished')
        //         }
        //         else{
        //             alert("UserName Doesn't Exist in Records")
        //         }
        //     }
        //     else{
        //         alert("Please enter a valid Name and Username")
        //     }
        // }
        // else{
        //     alert('Driver Limit Reached')
        // }
        //
        this.setState({name:'', Username:''});
        event.preventDefault();
    }
    handleSubmit(event) {


        // const database=localStorage
        // var Admin=database.getItem('CurrentlyLoggedIn');
        // var CurrentDrivers=database.getItem(Admin+'Drivers')
        // console.log(CurrentDrivers)
        // if(drivers.length==0){
        //     alert('Enter Drivers')
        // }
        // else if(CurrentDrivers!==null){
        //     CurrentDrivers=CurrentDrivers.split[','];
        //     console.log(typeof (CurrentDrivers))
        //     drivers.forEach(function (driver, index) {
        //         console.log(driver)
        //         CurrentDrivers.push(driver)
        //
        //     });
        //     database.setItem(Admin+"Drivers",CurrentDrivers.toString())
        //
        // }
        // else if(CurrentDrivers===''){
        //     var Drivers=drivers.toString();
        //     database.setItem(Admin+'Drivers',Drivers)
        //     alert('Changes Saved')
        //     drivers=[];
        // }
        // event.preventDefault();

    }

    handleLogout(event){
        const database=localStorage;
        database.setItem('CurrentlyLoggedIn',null);
        this.props.history.push('/');

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

                                                    </MDBTableBody>
                                                </MDBTable>
                                            </MDBCard>
                                        </MDBCard>
                                    </MDBTabPane>
                                    <MDBTabPane tabId="2" role="tabpanel" className={"tabpane"}>
                                        <MDBCard  className={"StopsCard "} >
                                            <MDBCard className={"MiddleCard"}>
                                                <MDBTable hover bordered striped>
                                                    <MDBTableHead>
                                                        <tr className={"TableHeader"}>
                                                            <th> <MDBIcon icon={'pin'}/>
                                                                Name</th>
                                                            <th><MDBIcon icon={'user'}/>Username</th>
                                                            <th><MDBIcon icon={'clipboard-check'}/>Actions</th>
                                                        </tr>
                                                    </MDBTableHead>
                                                    <MDBTableBody>

                                                    </MDBTableBody>
                                                </MDBTable>
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
                                            <MDBBtn  className={"CalculateBtn white-text "} color={"primary"}>

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

                                                        <MDBBtn color="red" className={"btn-block3"} >
                                                            Remove Last
                                                        </MDBBtn>
                                                        <MDBBtn type="button" onClick={this.handleDriverAdd} color="primary" className={"btn-block4"} >
                                                            Add
                                                        </MDBBtn>
                                                    </form>
                                                </MDBCardBody>
                                            </MDBCard>
                                            {/*<MDBBtn  className={"SaveChanges"} color={"primary"}  type={"button"} onClick={this.handleSubmit} >*/}
                                            {/*    Save Changes*/}
                                            {/*</MDBBtn>*/}

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
                                                            <button type="button" >Upload</button>
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
                            //googleMapsApiKey="AIzaSyDHe1AQwUrxyMTl6hrii3nPsfWU4CSbVKg"

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

                            >
                            </GoogleMap>
                        </LoadScript>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );
    }
}

export default withRouter(AdminPage);

