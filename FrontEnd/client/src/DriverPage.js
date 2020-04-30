import React, { Component } from "react"
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
    MDBCardBody, MDBCardHeader, MDBTableHead, MDBTableBody, MDBTable
} from 'mdbreact';
import "./DriverPage.css"

import {withRouter} from 'react-router-dom';

class DriverPage extends Component{
    constructor() {
        super();
        this.state = {isOpen:false,activeItem:'2'}
        this.handleLogout=this.handleLogout.bind(this);
        this.handleData=this.handleData.bind(this);


        };

    handleLogout(event){
        const database=localStorage;
        for(let i=0;i<100;i++){
            database.setItem("OrderedAddress"+i,'')
        }
        database.setItem('CurrentlyLoggedIn',null);
        this.props.history.push('/');

    }
    handleData(){
        var driver=localStorage.getItem("CurrentlyLoggedIn")
        var driverNum=localStorage.getItem(driver)
        if (driverNum==='Driver1'){
            return 'Route1'
        }
        else if (driverNum==='Driver2'){
            return 'Route2'
        }
        else if (driverNum==='Driver3'){
            return 'Route3'
        }
        else if (driverNum==='Driver4'){
            return 'Route4'
        }
        else if (driverNum==='Driver5'){
            return 'Route5'
        }
        else if (driverNum==='Driver6'){
            return 'Route6'
        }
        else if (driverNum==='Driver7'){
            return 'Route7'
        }
        else if (driverNum==='Driver8'){
            return 'Route8'
        }
        else if (driverNum==='Driver9'){
            return 'Route9'
        }
        else if (driverNum==='Driver10'){
            return 'Route10'
        }
        else if (driverNum==='Driver11'){
            return 'Route11'
        }
        else if (driverNum==='Driver12'){
            return 'Route12'
        }
        else if (driverNum==='Driver13'){
            return 'Route13'
        }
        else if (driverNum==='Driver14'){
            return 'Route14'
        }
        else if (driverNum==='Driver15'){
            return 'Route15'
        }
        else if (driverNum==='Driver16'){
            return 'Route16'
        }
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
                                <MDBTabPane tabId="2" role="tabpanel" className={"tabpane"}>
                                    <MDBCol className={"ItineraryCardCol"}>
                                        <MDBCard className={"ItineraryCard "}>
                                            <MDBTable hover bordered striped maxHeight={"100vh"} scrollY className={'Table'}>
                                                <MDBTableHead>
                                                    <tr className={"TableHeader"}>
                                                        <th> <MDBIcon icon={'pin'}/>
                                                            Stops</th>
                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody className={"TableBody"} color={'white'}>
                                                    <tr> Sondra and David S. Mack Student Center, Hempstead, NY 11550, USA</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress1')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress2')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress3')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress4')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress5')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress6')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress7')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress8')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress9')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress10')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress11')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress12')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress13')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress14')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress15')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress16')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress17')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress18')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress19')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress20')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress21')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress22')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress23')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress24')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress25')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress26')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress27')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress28')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress29')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress30')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress31')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress32')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress33')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress34')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress35')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress36')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress37')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress38')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress39')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress40')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress41')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress42')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress43')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress44')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress45')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress46')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress47')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress48')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress49')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress50')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress51')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress52')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress53')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress54')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress55')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress56')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress57')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress58')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress59')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress60')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress61')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress62')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress63')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress64')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress65')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress66')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress67')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress68')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress69')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress70')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress71')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress72')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress73')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress74')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress75')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress76')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress77')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress78')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress79')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress80')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress81')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress82')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress83')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress84')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress85')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress86')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress87')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress88')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress89')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress90')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress91')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress92')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress93')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress94')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress95')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress96')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress97')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress98')}</tr>
                                                    <tr> {localStorage.getItem(this.handleData()+'OrderedAddress99')}</tr>
                                                </MDBTableBody>
                                            </MDBTable>

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
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBBtn className={"LogOutBtn"} type="button" onClick={this.handleLogout}>Log Out</MDBBtn>
                                </MDBNavItem>

                            </MDBNavbarNav>
                        </MDBNavbar>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );

    }
}

export default withRouter(DriverPage);