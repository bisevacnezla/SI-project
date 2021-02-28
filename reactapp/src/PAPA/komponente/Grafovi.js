import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProsjekPoGodinamaCard from './ProsjekPoGodinamaCard';
import PrisustvoPoPredmetuCard from './PrisustvoPoPredmetuCard';
import PrviParcijalniPoPredmet from '../../LIMA/Izvjestaji/components/Dijagrami/PrviParcijalniPoPredmetu';
import DrugiParcijalniPoPredmetu from '../../LIMA/Izvjestaji/components/Dijagrami/DrugiParcijalniPoPredmetu';
import UsmeniPoPredmetu from '../../LIMA/Izvjestaji/components/Dijagrami/UsmeniPoPredmetu';
import ZadacePoPredmetu from '../../LIMA/Izvjestaji/components/Dijagrami/ZadacePoPredmetu';

class Grafovi extends React.Component {

    render() {
      return (
         <div>
            <Container style={{backgroundColor: "#fff"}}>
                <Row>
                    <Col><ProsjekPoGodinamaCard /></Col>
                    <Col><PrisustvoPoPredmetuCard /> </Col>
                    <Col><PrviParcijalniPoPredmet /></Col>
                </Row>
                <Row>
                    <Col><DrugiParcijalniPoPredmetu /></Col>
                    <Col><UsmeniPoPredmetu /> </Col>
                    <Col><ZadacePoPredmetu /></Col>
                </Row>
            </Container>
         </div>
      );
    }
  }
  
  export default Grafovi;