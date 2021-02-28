import React, { Component} from 'react';
import Ocjena from '../Ocjena/Ocjena';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../ZajednickiCSS.css';


class UnosOcjene extends Component {
     render()
     {
         return (
            <div id="form" className="footerDno" style={{paddingBottom: "50"}}>
                <Container id="cont" fluid style={{padding:"0", margin: "0"}}>
                    <Row noGutters>
                        <Col md="3">
                            <Header isPocetna={false}/>
                        </Col>
                        <Col>
                            <div style={{padding: "15px"}}>
                                <Ocjena/>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
                <Footer/>
            </div>        
         );
     }
}
export default UnosOcjene;