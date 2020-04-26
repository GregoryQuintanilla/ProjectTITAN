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
import { GoogleMap, LoadScript} from '@react-google-maps/api'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import "./AdminPage.css"

var drivers={};
class AdminPage extends Component {
    constructor() {
        super();
        this.state = {activeItem: "1",
                        name: '',
                      Username:''
        };

        this.handleName = this.handleName.bind(this);
        this.handleUserName=this.handleUserName.bind(this);
        this.handleDriverAdd = this.handleDriverAdd.bind(this);

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
                                            <MDBBtn  className={"CalculateBtn white-text "} color={"primary"}>

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
                            // googleMapsApiKey="AIzaSyDHe1AQwUrxyMTl6hrii3nPsfWU4CSbVKg"

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

export default AdminPage;
