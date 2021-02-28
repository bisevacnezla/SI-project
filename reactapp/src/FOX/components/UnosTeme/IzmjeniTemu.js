import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Poruka from '../Poruka/Poruka';

class IzmjeniTemu extends Component {
    constructor(props) {
        super(props); 
        this.state = { 
            validated: false,
            greskaBaza: 0,
            opisUspjeh: "",
            naslovUspjeh: "",
            naslovGreska: "",
            opisGreska: "",
            isFetching: false,
            id: undefined,
            naziv: undefined,
            opis: undefined
        }

        this.nazivTeme = React.createRef();
        this.opisTeme = React.createRef();
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
            let reqBody = {
                naziv: this.nazivTeme.current.value,
                opis: this.opisTeme.current.value
            };
            const {id} = this.state;
            axios.put('https://si2019fox.herokuapp.com/api/fox/temeZavrsnih/izmjeniTemu/' + id, reqBody)
            .then(() => {
                this.setState({
                    greskaBaza: 2,
                    isFetching: false,
                    opisUspjeh: "Tema je uspješno spremljena u bazu podataka.",
                    naslovUspjeh: "Tema je izmijenjena!"
                });
            })
            .catch(()=> {
                this.setState({
                    greskaBaza: 1,
                    isFetching: false,
                    opisGreska: "Baza podataka nije dostupna.",
                    naslovGreska: "Tema nije izmijenjena!"
                });
            });
        }

        this.setState({ validated: true });
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        const {naziv} = this.props.match.params;
        const {opis} = this.props.match.params;
        console.log(id + " " + naziv + " " + opis);
        this.setState({naziv: naziv});
        this.setState({opis: opis});
        this.setState({id: id});
    }

    vratiNazad = () => {
        window.location.replace("/fox/unosTeme");
    }

    render() {
        const {validated} = this.state;
        const {greskaBaza} = this.state;
        const {naziv} = this.state;
        const {opis} = this.state;
        //console.log(greskaBaza);
        return (
            <div className="footerDno" style={{paddingBottom: "50px"}}>
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
                                    <Card.Title className="text-center">Izmjena teme za završni rad</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted text-center">U ovoj formi možete izmjeniti završni rad na predmetu </Card.Subtitle>
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
                                                    ref={this.nazivTeme}
                                                    required 
                                                    type="text"
                                                    placeholder="Unesite naziv teme"
                                                />
                                                <Form.Control.Feedback>Validan naziv!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Unesite naziv</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group> 

                                        <Form.Group as={Form.Row} controlId = "formNoviOpis" className="justify-content-center">
                                            <Col style={{textAlign: "left"}} lg="4" md="6" sm="8" xs="12">
                                                <Form.Label>Opis:</Form.Label>
                                                <Form.Control 
                                                    ref={this.opisTeme} 
                                                    required 
                                                    type="text" 
                                                    placeholder="Unesite opis teme"
                                                />
                                                <Form.Control.Feedback>Validan opis!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">Unesite opis</Form.Control.Feedback>
                                            </Col>
                                        </Form.Group> 

                                        <Form.Row className="justify-content-center">
                                            <Col  style={{textAlign: "right"}} lg="4" md="6" sm="8" xs="12">
                                                <Button variant="primary" type="submit" style={{marginRight: "10px"}}>Izmjeni</Button>
                                                <Button variant="secondary" onClick={this.vratiNazad} >Nazad</Button>
                                            </Col>  
                                        </Form.Row>

                                    </Form>
                                </Card.Body>  
                            </Card>
                        </div>
                    </Col>
                </Row>
           </Container>
        <Footer/>
    </div>);
    }
}

export default IzmjeniTemu;