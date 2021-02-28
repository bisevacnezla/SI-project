import React, { Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Poruka from '../Poruka/Poruka';

class TabelaUnosa extends Component {
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
            isFetching: false,
            ispiti: null
        }

        this.indeks = React.createRef();
        this.bodovi = React.createRef();
    }

    handleClick = (e) => {
        e.preventDefault();
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
            if(this.state.student !== null && this.ispit != null) {
                let reqBody = {
                    idStudent: this.state.student.id,
                    idIspit: this.ispit.current.value,
                    bodovi: this.bodovi.current.value
                };
                    
                axios.post('https://si2019fox.herokuapp.com/api/fox/ispiti', reqBody)
                .then(() => {
                    const student = this.state.student;
                    this.setState({
                        greskaBaza: 2,
                        isFetching: false,
                        student: null,
                        opisUspjeh: "Bodovi su upisani.",
                        naslovUspjeh: student !== null ?
                            student.ime + " " + student.prezime + ", " + this.ocjena.current.value : ""
                    });
                    this.ocjena.current.value = null;
                    this.indeks.current.value = null;
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
                    opisGreska: "Ne možete unijeti bodove, nepotpuni podaci."
                });
            }
       }
        this.setState({ validated: true });
    }

    componentDidMount() {
        this.setState({
            isFetching: true,
            greskaBaza: 3
        });

        const predmet = window.localStorage.getItem("idPredmeta");
        const idPredmeta = predmet !== null ? predmet : 64
        axios.get("https://si2019fox.herokuapp.com/api/fox/ispiti/" + idPredmeta).then((res)=> {
            this.setState({
                ispiti: res.data,
                isFetching: false,
                greskaBaza: 0
            });
        })
        .catch(()=> {
            this.setState({
                greskaBaza: 1,
                isFetching: false,
                naslovGreska: "Ispiti nisu učitani!",
                opisGreska: "Baza podataka nije dostupna."
            });
        });
    }
     
    render() {
        const validated = this.state.validated;

        return (
            <div id="form" class="card" style={{margin: "0", marginBottom: "50px"}}>
                <div class="card-body">
                    <Poruka
                    greska={this.state.greskaBaza}
                    naslovUspjeh={this.state.naslovUspjeh}
                    naslovGreska={this.state.naslovGreska}
                    opisUspjeh={this.state.opisUspjeh}
                    opisGreska={this.state.opisGreska}
                    />
                    <h4 class="card-title text-center" >Unos bodova ispita</h4>
                    <h6 class="card-subtitle mb-2 text-muted text-center">Omogućava pretraživanje studenata i unos bodova.</h6>
                    <br/>
                    <div>
                        <Form 
                            noValidate 
                            validated={validated}
                            onSubmit = {e => this.handleSubmit(e)}
                        >
                            <Form.Row className="justify-content-center">
                                <Form.Group as={Col} lg="4" md="6" sm="8" xs="12" style={{textAlign: "left"}}>
                                    <select id="dropId" required class="custom-select" ref={ this.ispit }>
                                        {
                                            this.state.ispiti && this.state.ispiti.map(ispit => {
                                                return <option value={ispit.id} key={ispit.id}>{ispit.tip} {ispit.datum}</option>
                                            })
                                            }
                                    </select>
                                </Form.Group>
                            </Form.Row>

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
                                    id="indeks">
                                    </Form.Control>
                                    <Form.Control.Feedback> Validan indeks </Form.Control.Feedback> 
                                    <Form.Control.Feedback type="invalid"> Indeks nije validan </Form.Control.Feedback>
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
                                    <Form.Label> Bodovi: </Form.Label>
                                    <Form.Control
                                    id="bodoviId"
                                    ref={ this.bodovi }
                                    required
                                    placeholder="Unesite bodove"
                                    type="number"
                                    min={-100}
                                    max={100}
                                    name="bodovi"
                                    value={this.state.bodovi}>
                                    </Form.Control>
                                    <Form.Control.Feedback> Validni bodovi </Form.Control.Feedback> 
                                    <Form.Control.Feedback type= "invalid"> Bodovi nisu validni </Form.Control.Feedback> 
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
export default TabelaUnosa;