import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Poruka from '../Poruka/Poruka';

class TabelaStudenti extends Component {
    state = {
        teme: [],
        opisUspjeh: "",
        naslovUspjeh: "",
        naslovGreska: "",
        opisGreska: "",
        greskaBaza: 0,
        isFetching: false
    }

    izmjeniTemu = (event, id) => {
        console.log("Funkcija izmjeni je pozvana " + id);
        event.preventDefault();
        event.stopPropagation();
    }
    
    izbrisiTemu = (event, id) => {
        console.log("Funkcija izbrisi je pozvana " + id);
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            isFetching: true,
            greskaBaza: 3
        });

        axios.delete('https://si2019fox.herokuapp.com/api/fox/temeZavrsnih/izbrisiTemu/' + id) //idPredmeta kao parametar
            .catch(() => {
                this.setState({
                    greskaBaza: 1,
                    isFetching: false,
                    naslovGreska: "Tema nije obrisana!",
                    opisGreska: "Baza podataka nije dostupna."
                });
            });
    }

    componentDidMount() {
        let idPredmeta = window.localStorage.getItem("idPredmeta") != null ? window.localStorage.getItem("idPredmeta") : 64;

        this.setState({
            isFetching: true,
            greskaBaza: 3
        });

        axios.get('https://si2019fox.herokuapp.com/api/fox/temeZavrsnih/tabelaTemeZavsnih/' + idPredmeta) //idPredmeta kao parametar iz local storega
            .then(
                res => this.setState({
                    teme: res.data,
                    isFetching: false,
                    greskaBaza: 0
                })
            )
            .catch(()=> {
                this.setState({
                    greskaBaza: 1,
                    isFetching: false,
                    naslovGreska: "Teme nisu učitane!",
                    opisGreska: "Baza podataka nije dostupna."
                });
            });
    }

    render() {
        return (
            <div>
                <Poruka
                greska={this.state.greskaBaza}
                naslovUspjeh={this.state.naslovUspjeh}
                naslovGreska={this.state.naslovGreska}
                opisUspjeh={this.state.opisUspjeh}
                opisGreska={this.state.opisGreska}
                />
                <Table striped bordered size="sm" responsive>
                    <thead>
                        <tr className="table-primary" hover="false">
                        <th scope="row">#</th>
                        <th>Naziv</th>
                        <th>Opis</th>
                        <th>Odabrana</th>
                        <th>Student</th>
                        <th> </th>
                        <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.teme.map((teme, i) => {
                                return <tr hover="false" key={teme.id}>
                                    <td scope="row">{i+1}</td>
                                    <td>{teme.naziv}</td>
                                    <td>{teme.opis}</td>
                                    <td>{teme.odabrana}</td>
                                    <td>{teme.student}</td>
                                    <td><Form><Button variant="primary" href={"izmjenaTeme/"+teme.id+"/"+teme.naziv+"/"+teme.opis}>Izmjeni</Button></Form></td>
                                    <td><Form onSubmit={(e) => this.izbrisiTemu(e, teme.id)}>
                                        <Button variant="danger" type="submit">Izbriši</Button>
                                        </Form>
                                    </td>
                                </tr>
                                
                            })
                        }

                        <tr hover="false">
                            <td scope="row">0</td>
                            <td>Naziv</td>
                            <td>Opis</td>
                            <td>Da</td>
                            <td>Neko Nekic</td>
                            <td><Form><Button variant="primary" href={"izmjenaTeme/0/Naziv/Opis"}>Izmjeni</Button></Form></td>
                            <td><Form onSubmit={(e) => this.izbrisiTemu(e, 0)}>
                                <Button variant="danger" type="submit">Izbriši</Button>
                                </Form>
                            </td>
                        </tr>
                        
                    </tbody>
                </Table>   
            </div>
        );
    }
  }
  
  export default TabelaStudenti;
