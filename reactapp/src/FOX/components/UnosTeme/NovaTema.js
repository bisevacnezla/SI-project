import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../../ZajednickiCSS.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Poruka from '../Poruka/Poruka';

class NovaTema extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opisUspjeh: "",
            naslovUspjeh: "",
            naslovGreska: "",
            opisGreska: "",
            isFetching: false,
            validated: false
        }
        this.nazivNoveTeme = React.createRef();
        this.opisNoveTeme = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        this.setState({
            isFetching: true,
            greskaBaza: 3
        });

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                isFetching: false,
                greskaBaza: 0
            });
        }
        else {
            const korisnik = window.localStorage.getItem('id');
            const idKorisnika = korisnik !== null ? korisnik : 64;

            let reqBody = {
                naziv: this.nazivNoveTeme.current.value,
                opis: this.opisNoveTeme.current.value,
                idProfesora: idKorisnika,
                idPredmeta: window.localStorage.getItem("idPredmeta") != null ? window.localStorage.getItem("idPredmeta") : 64
            };
            axios.post('https://si2019fox.herokuapp.com/api/fox/temeZavrsnih/novaTema', reqBody)
            .then(() => {
                this.setState({
                    greskaBaza: 2,
                    isFetching: false,
                    opisUspjeh: "Teme je uspješno spremljena u bazu podataka.",
                    naslovUspjeh: "Tema je dodana!"
                });
            })
            .catch(()=> {
                this.setState({
                    greskaBaza: 1,
                    isFetching: false,
                    opisGreska: "Baza podataka nije dostupna.",
                    naslovGreska: "Tema nije dodana!"
                });
            });
        }

        this.setState({ validated: true });
    }

    render() {
        const {validated} = this.state;
        const {greskaBaza} = this.state;

        return (
            <div id="unosNoveTeme" className="footerDno" style={{paddingBottom: "50px"}}>
                    <Container fluid style={{padding:"0", margin: "0"}}>
                    
                        <Row noGutters>
                            <Col md="3">
                                <Header isPocetna={false}/>
                            </Col>

                            <Col style={{textAlign: "left"}}>
                                <div style={{padding: "15px"}}>
                                <Card style={{margin: "0"}}>
                                    <Card.Body>
                                            <Poruka
                                            greska={this.state.greskaBaza}
                                            naslovUspjeh={this.state.naslovUspjeh}
                                            naslovGreska={this.state.naslovGreska}
                                            opisUspjeh={this.state.opisUspjeh}
                                            opisGreska={this.state.opisGreska}
                                            />
                                            <Card.Title className="text-center">Nova tema za završni rad</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted text-center">U ovoj formi možete kreirati novu temu za završni rad na predmetu </Card.Subtitle>
                                            <br/>
                                            <Form 
                                                noValidate 
                                                validated={validated}
                                                onSubmit = {e => this.handleSubmit(e)}
                                            >
                                                <Form.Group as={Form.Row} controlId = "formNoviNaziv" className="justify-content-center">
                                                    <Col style={{textAlign: "left"}} lg="4" md="6" sm="8" xs="12">
                                                        <Form.Label>Naziv:</Form.Label>
                                                        <Form.Control 
                                                            ref={this.nazivNoveTeme}
                                                            required 
                                                            type="text" 
                                                            placeholder="Naziv nove teme"
                                                        />
                                                        <Form.Control.Feedback>Validan naziv!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">Unesite naziv</Form.Control.Feedback>
                                                    </Col>
                                                </Form.Group>
                                                
                                                <Form.Group as={Form.Row} controlId = "formNoviOpis" className="justify-content-center">
                                                    <Col style={{textAlign: "left"}} lg="4" md="6" sm="8" xs="12">
                                                        <Form.Label>Opis:</Form.Label>
                                                        <Form.Control 
                                                            ref={this.opisNoveTeme} 
                                                            required 
                                                            type="textarea" 
                                                            placeholder="Opis nove teme"
                                                        />
                                                        <Form.Control.Feedback>Validan opis!</Form.Control.Feedback>
                                                        <Form.Control.Feedback type="invalid">Unesite opis</Form.Control.Feedback>
                                                    </Col>
                                                </Form.Group>

                                                <Form.Row className="justify-content-center">
                                                    <Col lg="4" md="6" sm="8" xs="12" style={{textAlign: "right"}}>
                                                        <Button variant="primary" type="submit" style={{marginRight: "10px"}}>Dodaj</Button> 
                                                        <Button variant="secondary" href='unosTeme'>Nazad</Button> 
                                                    </Col>
                                                </Form.Row>
                                                                        
                                            </Form>
                                        </Card.Body>  
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    
                </Container>
                <Footer />
            </div>
        );
    }
}

export default NovaTema;