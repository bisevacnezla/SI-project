import React, {Component } from 'react';
import Form from 'react-bootstrap/Form';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Poruka from '../Poruka/Poruka';

class Obavijesti extends Component {
    constructor(props){
        super(props);

        this.state = {
            validated: false,
            greskaBaza: 0,
            opisUspjeh: "",
            naslovUspjeh: "",
            naslovGreska: "",
            opisGreska: "",
            isFetching: false
        }

        this.naslov = React.createRef();
        this.sadrzaj = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
    
        this.setState({
            isFetching: true,
            greskaBaza: 3
        });
    
        const form = event.currentTarget;
    
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                isFetching: false,
                greskaBaza: 0
            });
        }
        else {
            if(window.localStorage.getItem("idPredmeta") !== null && window.localStorage.getItem("id") !== null) {
                let reqBody = {
                    naziv: this.naslov.current.value,
                    opis: this.sadrzaj.current.value,
                    idPredmeta: window.localStorage.getItem("idPredmeta"),
                    idProfesora: window.localStorage.getItem("id")
                };
                    
                axios.post('https://si2019fox.herokuapp.com/api/fox/posaljiObavijest', reqBody)
                .then(() => {
                    this.setState({
                        greskaBaza: 2,
                        isFetching: false,
                        opisUspjeh: "Obavijest je poslana studentima koji su upisani na predmet.",
                        naslovUspjeh: "Obavijest je poslana."
                    });
                })
                .catch(()=> {
                    this.setState({
                        greskaBaza: 1,
                        isFetching: false,
                        naslovGreska: "Greška!",
                        opisGreska: "Baza podataka nije dostupna."
                    });
                });
            }
            else {
                this.setState({
                    greskaBaza: 1,
                    isFetching: false,
                    naslovGreska: "Greška!",
                    opisGreska: "Baza podataka nije dostupna."
                });
            }
        }
        this.setState({ validated: true });
    }

    render() {
        const validated = this.state.validated;

        return (
          <div className="footerDno" style={{paddingBottom: "50px"}}>
            <Container fluid style={{padding:"0", margin: "0"}}>
                <Row noGutters>
                    <Col md="3">
                        <Header isPocetna={false}/>
                    </Col>
                    <Col>
                        <div style={{padding: "15px"}}>
                            <div class="card" style={{margin: "0px"}}>
                                <div class="card-body">
                                    <Poruka
                                    greska={this.state.greskaBaza}
                                    naslovUspjeh={this.state.naslovUspjeh}
                                    naslovGreska={this.state.naslovGreska}
                                    opisUspjeh={this.state.opisUspjeh}
                                    opisGreska={this.state.opisGreska}
                                    />
                                    <h4 class="card-title text-center" >Slanje obavijesti</h4>
                                    <h6 class="card-subtitle mb-2 text-muted text-center">Slanje obavijesti za sve studente na predmetu.</h6>
                                    <br/>
                                    <div>
                                        <Form
                                        noValidate
                                        validated={validated}
                                        onSubmit = {event => this.handleSubmit(event)}>
                                            <Form.Row className="justify-content-center">
                                                <Col style={{textAlign: "left"}} lg="4" md="6" sm="8" xs="12">
                                                    <Form.Label> Naslov: </Form.Label>
                                                    <Form.Control
                                                    id="naslovId"
                                                    type="text"
                                                    placeholder="Unesite naslov obavijesti"
                                                    ref={ this.naslov }
                                                    required
                                                    name="naslov">
                                                    </Form.Control>
                                                    <Form.Control.Feedback> Validan naslov </Form.Control.Feedback> 
                                                    <Form.Control.Feedback type="invalid"> Ne smije biti prazno </Form.Control.Feedback>
                                                </Col>
                                            </Form.Row>

                                            <br/>

                                            <Form.Row className="justify-content-center">
                                                <Col style={{textAlign: "left"}} lg="4" md="6" sm="8" xs="12"> 
                                                    <Form.Label> Sadržaj: </Form.Label>
                                                    <Form.Control
                                                    as="textarea"
                                                    rows="5"
                                                    type="text"
                                                    id="sadrzajId"
                                                    placeholder="Unesite sadrzaj obavijesti"
                                                    ref={ this.sadrzaj }
                                                    required
                                                    name="sadrzaj">
                                                    </Form.Control>
                                                    <Form.Control.Feedback> Validan sadržaj </Form.Control.Feedback> 
                                                    <Form.Control.Feedback type="invalid"> Ne smije biti prazno </Form.Control.Feedback>
                                                </Col>
                                                
                                            </Form.Row>

                                            <br/>

                                            <Form.Row className="justify-content-center">
                                                <Col lg="4" md="6" sm="8" xs="12" style={{textAlign: "right"}}>
                                                    <Button id="sacuvajId" type="submit"> Sačuvaj </Button>
                                                </Col>
                                            </Form.Row>
                                            </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Footer/>
          </div>
        );
    }
}
export default Obavijesti;
