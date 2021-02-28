import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TabelaTeme from './TabelaTeme.js';
import Button from 'react-bootstrap/Button';

class TemeZavrsnih extends Component {
  
  render() {
    return (
      <div className="TemeZavrsnih footerDno" style={{paddingBottom: "50px"}}>

        <Container fluid style={{padding:"0", margin: "0"}}>
          <Row noGutters>
              <Col md="3">
                  <Header isPocetna={false}/>
              </Col>
              <Col>
                <div style={{padding: "15px"}}>      
                    <h4>Pregled tema za završne radove</h4>
                    <br/>
                    <TabelaTeme />
                    <Row className="justify-content-md-center" style={{margin: "0"}}>
                      <Col></Col>
                      <Col md="auto" style={{textAlign: "center"}}>
                        <Button variant="primary" href='novaTema'>Nova tema</Button>
                      </Col>
                      <Col></Col>
                    </Row>
                </div>
              </Col>
          </Row>
          
        </Container>

        <Footer/>
      </div>

    );

  }
}


export default TemeZavrsnih;
