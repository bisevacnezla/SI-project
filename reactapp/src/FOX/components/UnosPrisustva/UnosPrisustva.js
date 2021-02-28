import React from 'react';
import UnosPrisustvaForma from '../UnosPrisustvaForma/UnosPrisustvaForma';
import Header from '../Header/Header';
import UnosPrisustvaSedmice from '../UnosPrisustvaSedmice/UnosPrisustvaSedmice';
import Footer from '../Footer/Footer';
import '../../ZajednickiCSS.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class UnosPrisustva extends React.Component {
    state = {
        studenti: [
            {
                indeks: 1,
                ime: "Neko Nekić",
                predavanje: "da",
                vjezbe: "ne",
                tutorijal: "-"
            },
            {
                indeks: 2,
                ime: "Himzo Polovina",
                predavanje: "da",
                vjezbe: "-",
                tutorijal: "da"
            },
            {
                indeks: 3,
                ime: "Ivo Ivić",
                predavanje: "-",
                vjezbe: "ne",
                tutorijal: "ne"
            },
            {
                indeks: 4,
                ime: "Medo Medić",
                predavanje: "ne",
                vjezbe: "ne",
                tutorijal: "ne"
            },
            {
                indeks: 5,
                ime: "Marko Marković",
                predavanje: "-",
                vjezbe: "ne",
                tutorijal: "da"
            }
        ],
        predavanjeSvi: "izaberiOpciju",
        vjezbaSvi: "izaberiOpciju",
        tutorijalSvi: "izaberiOpciju",
        sedmica: 0,
        idPredmeta: window.localStorage.getItem("idPredmeta") != null ? window.localStorage.getItem("idPredmeta") : 64,
        greskaBaza: 0,
        isFetching: false
    }

    handleChangeSvi = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value,
            greskaBaza: 0
        });
    }

    handleSubmitSvi = (event) => {
        event.preventDefault();
        let s = this.state.studenti.map(student => {
            return {
                ...student,
                predavanje: this.state.predavanjeSvi !== "izaberiOpciju" ? this.state.predavanjeSvi : student.predavanje,
                vjezbe: this.state.vjezbaSvi !== "izaberiOpciju" ? this.state.vjezbaSvi : student.vjezbe,
                tutorijal: this.state.tutorijalSvi !== "izaberiOpciju" ? this.state.tutorijalSvi : student.tutorijal
            }
        });
        this.setState({
            studenti: s,
            predavanjeSvi: "izaberiOpciju",
            vjezbaSvi: "izaberiOpciju",
            tutorijalSvi: "izaberiOpciju"
        });
    }

    handleChange = (event, indeks) => {
        const {name, value} = event.target;
        this.setState(prevState => {
            return {
                ...prevState,
                studenti: prevState.studenti.map(student => {
                    if(student.indeks === indeks)
                        return {
                            ...student,
                            [name]: value
                        };
                    return student;
                })
            }
        })
        this.setState({greskaBaza: 0});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            greskaBaza: 3,
            isFetching: true
        })

        const idPredmeta = this.state.idPredmeta;
        const sedmica = this.state.sedmica;
        const studenti = this.state.studenti.map(s => {
            return {
                id: s.id,
                ime: s.ime,
                indeks: s.indeks,
                predavanje: s.predavanje === "-" ? null : s.predavanje,
                tutorijal: s.tutorijal === "-" ? null : s.tutorijal,
                vjezbe: s.vjezbe === "-" ? null : s.vjezbe 
            };
        });

        axios.put(`https://si2019fox.herokuapp.com/api/fox/prisustvo/unosIzmjena?idPredmeta=${idPredmeta}&brojSedmice=${sedmica}`, studenti)
        .then(() => {
            this.setState({
                greskaBaza: 2,
                isFetching: false
            });
        })
        .catch(()=> {
            this.setState({
                greskaBaza: 1,
                isFetching: false
            });
        });
    }

    handleClickSedmica = (brojSedmice) => {
        const idPredmeta = window.localStorage.getItem('idPredmeta') !== null ? window.localStorage.getItem("idPredmeta") : 100;

        axios.get(`https://si2019fox.herokuapp.com/api/fox/prisustvo?idPredmeta=${idPredmeta}&brojSedmice=${brojSedmice}`).then(response => {
            let studenti = response.data.map(s => {
                return {
                    id: s.id,
                    ime: s.ime,
                    indeks: s.indeks,
                    predavanje: s.predavanje === null ? "-" : s.predavanje,
                    tutorijal: s.tutorijal === null ? "-" : s.tutorijal,
                    vjezbe: s.vjezbe === null ? "-" : s.vjezbe 
                };
                
            })
            console.log(response.data);
            this.setState({studenti: studenti, idPredmeta: idPredmeta});
        })
        .catch(()=> {
        });

        this.setState({sedmica: brojSedmice});
    }

    handleNazad = () => {
        this.setState({
            sedmica: 0,
            greskaBaza: 0
        });
    }

    render() {
        return (
            <div id="unosPrisustvaID" className="footerDno">

                <Container fluid style={{padding:"0", margin: "0"}}>
                    <Row noGutters>
                        <Col md="3">
                            <Header isPocetna={false}/>
                        </Col>
                        <Col>
                            <div style={{textAlign: "center", paddgin: "15px"}}>
                                {
                                    this.state.sedmica !== 0 &&
                                        <UnosPrisustvaForma
                                            data={this.state}
                                            handleSubmit={this.handleSubmit}
                                            handleSubmitSvi={this.handleSubmitSvi}
                                            handleChange={this.handleChange}
                                            handleChangeSvi={this.handleChangeSvi}
                                            handleNazad={this.handleNazad}/>
                                }
                                {   
                                    this.state.sedmica === 0 &&
                                        <UnosPrisustvaSedmice
                                            handleClickSedmica={this.handleClickSedmica}/>
                                }
                                <br/>
                                <br/>
                            </div>
                        </Col>
                    </Row>
                </Container>
                
                <Footer/>
            </div>
        );
    }
  }
  
  export default UnosPrisustva;
