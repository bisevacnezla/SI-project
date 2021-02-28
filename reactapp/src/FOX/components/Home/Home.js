import React, { Component } from 'react';
import Header from '../Header/Header';
import DanDatum from '../DanDatum/DanDatum';
import Predmet from '../Predmet/Predmet';
import Footer from '../Footer/Footer';
import PozdravnaPoruka from '../PocetnaStranica/PozdravnaPoruka';
import '../../ZajednickiCSS.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {isAuthorized:true} 
    }

    componentDidMount() {
        //Autorizacija
        let idKorisnika = window.localStorage.getItem("id");
        let token = window.localStorage.getItem("token");
        let username = window.localStorage.getItem("username");
        console.log(idKorisnika + '\n' + token + '\n' + username);
        if (username) {
            axios.get("https://si2019oscar.herokuapp.com/pretragaUsername/imaUlogu/"+username+"/PROFESOR").then((pristup) => {
                if(pristup.data === true) {
                    return;
                }
                else {
                    axios.get("https://si2019oscar.herokuapp.com/pretragaUsername/imaUlogu/"+username+"/ASISTENT").then((pristupA) => {
                        if(pristupA.data === true) {
                            return;
                        }
                        else {
                            //Nema pristup
                            this.setState({isAuthorized: false});
                        }
                    });
                }
            }).catch(
                //Nema odgovora => ima privilegije
                console.log("Ima privilegije")
            );
        }
    }
    render() {
        let sadrzaj;
        const isAuthorized = this.state.isAuthorized;

        if(isAuthorized) {
            sadrzaj = 
                <Col style={{textAlign: "center"}}>
                    <div className="Home" style={{padding: "15px"}}>
                        <PozdravnaPoruka/>
                        <DanDatum/>
                        <Predmet/>
                    </div>
                </Col>
        }
        else {
            sadrzaj = 
            <div>
                <h1>Nemate privilegiju da pristupite ovoj stranici.</h1>
            </div>
        }
        return (
            <div className="footerDno" style={{paddingBottom: "50px"}}>
                <Container fluid style={{padding:"0", margin: "0"}}>
                    <Row noGutters>
                        <Col md="3">
                            <Header isPocetna={true}/>
                        </Col>
                        {sadrzaj}
                    </Row>
                </Container>
                <Footer/>
            </div>
        );

    }
    
}

export default Home;
