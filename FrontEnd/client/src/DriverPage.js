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
                                                        <th>Welcome, {localStorage.getItem("CurrentlyLoggedIn")} these are your stops!</th>
                                                    </tr>
                                                </MDBTableHead>
                                                <MDBTableBody className={"TableBody"} color={'white'}>
                                                    <tr> <td>Sondra and David S. Mack Student Center, Hempstead, NY 11550, USA</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress1')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress2')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress3')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress4')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress5')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress6')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress7')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress8')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress9')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress10')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress11')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress12')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress13')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress14')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress15')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress16')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress17')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress18')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress19')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress20')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress21')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress22')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress23')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress24')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress25')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress26')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress27')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress28')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress29')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress30')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress31')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress32')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress33')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress34')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress35')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress36')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress37')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress38')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress39')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress40')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress41')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress42')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress43')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress44')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress45')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress46')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress47')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress48')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress49')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress50')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress51')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress52')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress53')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress54')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress55')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress56')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress57')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress58')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress59')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress60')}</td> </tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress61')}</td> </tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress62')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress63')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress64')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress65')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress66')}</td> </tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress67')}</td> </tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress68')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress69')}</td> </tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress70')}</td> </tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress71')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress72')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress73')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress74')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress75')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress76')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress77')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress78')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress79')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress80')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress81')}</td> </tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress82')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress83')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress84')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress85')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress86')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress87')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress88')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress89')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress90')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress91')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress92')}</td> </tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress93')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress94')}</td></tr>
                                                    <tr> <td>{localStorage.getItem(this.handleData()+'OrderedAddress95')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress96')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress97')}</td></tr>
                                                    <tr><td> {localStorage.getItem(this.handleData()+'OrderedAddress98')}</td></tr>
                                                    <tr><td>{localStorage.getItem(this.handleData()+'OrderedAddress99')}</td></tr>
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