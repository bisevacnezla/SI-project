import React, { Component} from 'react';
import TabelaUnosa from '../TabelaUnosa/TabelaUnosa';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../ZajednickiCSS.css';


class UnosBodova extends  Component {
state = {
        ispit: [
            {
             prvirok1: "I parcijalni",
             datum1:   "10.4.2019.",
             prvirok2:  "II parcijalni",
             datum2: "20.5.2019",
             drugirok1: "Popravni I parcijalni",
             datum3: "20.6.2019.",
             drugirok2:  "Popravni II parcijalni",
             datum4: "20.7.2019",
             trecirok: "Septembarski popravni",
             datum: "1.9.2019"
            }
        ]
}

render() {
    return(
        <div id="form" className="footerDno" style={{paddingBottom: "50px"}}>
            <Container id="cont" fluid style={{padding:"0", margin: "0"}}>
                <Row noGutters style={{padding:"0", margin: "0"}}>
                    <Col md="3">
                        <Header isPocetna={false}/>
                    </Col>
                    <Col>
                        <div style={{padding: "15px"}}>
                            <TabelaUnosa/>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Footer/>

          </div>
        );
    }
}
export default UnosBodova;






