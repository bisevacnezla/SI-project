import React, { Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Poruka from '../Poruka/Poruka';

class Ocjena extends Component {
    constructor(props){
        super(props);
        this.state = {
            validated: false,
            student: null,
            greskaBaza: 0,
            opisUspjeh: "",
            naslovUspjeh: "",
            naslovGreska: "",
            opisGreska: "",
            isFetching: false
        }
        this.ocjena = React.createRef();
        this.indeks = React.createRef();
    }

    handleClick = () => {
        //Poziv apija /fox/getStudentInfo/:id
        this.setState({
            isFetching: true,
            greskaBaza: 3
        });

        axios.get("https://si2019fox.herokuapp.com/fox/getStudentInfo/" + this.indeks.current.value).then((res)=> {
            this.setState({
                isFetching: false,
                student: res.data,
                greskaBaza: 2,
                opisUspjeh: "Student je pronađen.",
                naslovUspjeh: res.data !== null ? res.data.ime + " " + res.data.prezime : ""
            });
        })
        .catch(()=> {
            this.setState({ greskaBaza: 1,
                isFetching: false,
                naslovGreska: "Greška!",
                opisGreska: "Student nije pronađen."
            });
        });
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
            if(this.state.student !== null) {
                let reqBody = {
                    idStudent: this.state.student.id, //pristup lokalnom storage-u --> Ne treba lokalni storage, sprema se u state
                    idPredmet: window.localStorage.getItem("idPredmeta") != null ? window.localStorage.getItem("idPredmeta") : 64,
                    idAkademskaGodina: 11,
                    ocjena: this.ocjena.current.value
                };
                    
                axios.post('https://si2019fox.herokuapp.com/api/fox/ocjene/', reqBody)
                .then((res) => {
                    const student = this.state.student;
                    this.setState({
                        greskaBaza: 2,
                        isFetching: false,
                        student: null,
                        opisUspjeh: "Ocjena je upisana.",
                        naslovUspjeh: student !== null ?
                            student.ime + " " + student.prezime + ", " + this.ocjena.current.value : ""
                    });
                    this.ocjena.current.value = null;
                    this.indeks.current.value = null;
                })
                .catch((err)=> {
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
                    opisGreska: "Ne možete unijeti ocjenu, student nije pronađen."
                });
            }
       }
        this.setState({ validated: true });
    }
     
    render() {
        const validated = this.state.validated;

        return (
            <div class="card"id="form" style={{margin: "0", marginBottom: "50px"}}>
                <div class="card-body">
                    <Poruka
                    greska={this.state.greskaBaza}
                    naslovUspjeh={this.state.naslovUspjeh}
                    naslovGreska={this.state.naslovGreska}
                    opisUspjeh={this.state.opisUspjeh}
                    opisGreska={this.state.opisGreska}
                    />
                    <h4 class="card-title text-center" >Unos ocjene</h4>
                    <h6 class="card-subtitle mb-2 text-muted text-center">Omogućava pretraživanje studenata i unos ocjene.</h6>
                    <br/>
                    <div>
                        <Form 
                            noValidate 
                            validated={validated}
                            onSubmit = {e => this.handleSubmit(e)}
                        >

                            <Form.Row className="justify-content-center">
                                <Col style={{textAlign: "left"}} lg="4" md="6" sm="8" xs="12">
                                    <Form.Label> Indeks: </Form.Label>
                                    <Form.Control
                                    id="indeksId"
                                    placeholder="Unesite indeks"
                                    ref={ this.indeks }
                                    required
                                    type="number"
                                    min={0}
                                    name="indeks">
                                    </Form.Control>
                                    <Form.Control.Feedback> Validan indeks </Form.Control.Feedback> 
                                    <Form.Control.Feedback type= "invalid"> Indeks nije validan </Form.Control.Feedback>
                                </Col>
                            </Form.Row>

                            <Form.Row style={{paddingTop: "10px"}} className="justify-content-center">
                                <Col lg="4" md="6" sm="8" xs="12" style={{textAlign: "right"}} >
                                    <Button id="pretraziId"
                                    onClick={this.handleClick}> Pretrazi </Button>
                                </Col>
                            </Form.Row>

                            <hr/>

                            <Form.Row className="justify-content-center">
                                <Col style={{textAlign: "left"}} lg="4" md="6" sm="8" xs="12">
                                    <Form.Label> Ocjena: </Form.Label>
                                    <Form.Control
                                    id="ocjenaId"
                                    ref={ this.ocjena }
                                    required
                                    placeholder="Unesite ocjenu"
                                    type="number"
                                    min={6}
                                    max={10}
                                    name="ocjena"
                                    value={this.state.ocjena}>
                                    </Form.Control>
                                    <Form.Control.Feedback> Validna ocjena </Form.Control.Feedback> 
                                    <Form.Control.Feedback type= "invalid"> Ocjena nije validna </Form.Control.Feedback> 
                                </Col>
                            </Form.Row>

                            <Form.Row style={{paddingTop: "10px"}} className="justify-content-center">
                                <Col lg="4" md="6" sm="8" xs="12" style={{textAlign: "right"}}>
                                    <Button id="unesiId" variant="primary" type="submit"> Unesi </Button>
                                </Col>
                            </Form.Row>
                            
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Ocjena;