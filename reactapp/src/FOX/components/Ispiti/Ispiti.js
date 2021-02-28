import React, { Component} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Tabela from './Tabela';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../ZajednickiCSS.css';

class Ispiti extends  Component {
  constructor(props){
    super(props);
    this.state = {
      test: '',
    }
  }
  
render() {
    return(
      <div className="footerDno" style={{paddingBottom: "50px"}}>
        <Container fluid style={{padding:"0", margin: "0"}}>
          <Row noGutters>
            <Col md="3">
              <Header/>
            </Col>
            <Col>
              <div style={{padding: "15px"}}>
                <Tabela/>
              </div>
            </Col>
          </Row>
        </Container>
      
        <Footer/>
      </div>
        );
    }
}

export default Ispiti;






