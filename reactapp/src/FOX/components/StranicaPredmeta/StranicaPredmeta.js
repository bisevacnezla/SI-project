import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TabelaStudenti from '../TabelaStudenti/TabelaStudenti';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../ZajednickiCSS.css'

class StranicaPredmeta extends Component {
  state = {
    predmet: null,
    grupaId: null
  }
  async componentDidMount(){
    const predmetId = this.props.match.params.predmetId;
    const params = new URLSearchParams(this.props.location.search);
    const grupaId = (params.get('grupaId'))
    this.setState({
      predmet:predmetId,
      grupaId:grupaId
    })
  }
  render() {
    const params = new URLSearchParams(this.props.location.search);
    let predmetIgrupa = (params.get('predmetId'));
    var res = predmetIgrupa.split("?");
    const predmet = res[0];
    const grupa = res[1];
    localStorage.setItem("NazivPredmeta",predmet);
   
    return (
      <div className="StranicaPredmeta" className="footerDno" style={{paddingBottom: "50px"}}>
        <Container fluid style={{padding:"0", margin: "0"}}>
          <Row noGutters>
            <Col lg="3" md="12">
            <Header isPocetna={false}/>
            </Col>
            <Col style={{textAlign: "left"}}>
              <div style={{padding: "15px"}}>
                <h4>Pregled studenata</h4>
                <h5> {predmet && predmet}</h5>
                <h5> {grupa && grupa}</h5>
                <br></br>
                <TabelaStudenti/>
              </div>
            </Col> 
          </Row>
        </Container>
        <Footer/>
      </div>
    );

  }
}


export default StranicaPredmeta;
