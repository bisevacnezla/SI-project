import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import './table.css'
import axios from 'axios';



class TabelaStudenti extends Component {
    state = {
        studenti: [],
        ispiti: []
    }

    componentDidMount() {
        //Promise
        let idPredmeta = window.localStorage.getItem("idPredmeta") != null ? window.localStorage.getItem("idPredmeta") : 64;
        axios.get('https://si2019fox.herokuapp.com/api/fox/tabelaStudenti/predmet/'+ idPredmeta)
            .then(
                res => this.setState({studenti: res.data})
            );

        axios.get('https://si2019fox.herokuapp.com/api/fox/tabelaStudenti/ispiti')
            .then(
                res => this.setState({ispiti: res.data})
            );
    }
    
    render() {
        let listaIspita = [];
        if (this.state.ispiti.length === 0) {
            listaIspita = [
                <th>Prvi parcijalni ispit</th>,
                <th>Drugi parcijalni ispit</th>,
                <th>Usmeni ispit</th>,
            ];
        }
        else {
            this.state.ispiti.map((ispit, i)=> {
                listaIspita.push(<th>{ispit.naziv}</th>);
               // return <th>{ispit.naziv}</th>
            })
        }
        return (
            <Table striped bordered size="sm" responsive>
                <thead>
                    <tr className="table-primary" hover="false">
                    <th scope="row">#</th>
                    <th>Index</th>
                    <th>Ime i Prezime</th>
                    <th>Prisustvo</th>
                    <th>Zadaće</th>
                    {listaIspita}
                    <th>Ukupno</th>
                    <th>Ocjena</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.studenti.map((student, i) => {
                            return <tr className="" key={student.index}>
                                <td scope="row" >{i+1}</td>
                                <td>{student.index}</td>
                                <td>{student.imePrezime}</td>
                                <td>{student.prisustvo}</td>
                                <td>{student.zadace}</td>
                                {/*ispiti*/
                                    student.ispiti.map((ispit, i) => {
                                        return <td>{ispit.bodovi}</td>
                                    })
                                }
                                <td>{student.ukupno}</td>
                                <td>{student.ocjena}</td>
                            </tr>
                            
                        })
                    }
                    <tr>
                    <td scope="row">0</td>
                    <td>12345</td>
                    <td>Ime Prezime</td>
                    <td>10</td>
                    <td>10</td>
                    <td>15</td>
                    <td>15</td>
                    <td>20</td>
                    <td>70</td>
                    <td>7</td>
                    </tr>
                </tbody>
            </Table>   
        );
    }
  }
  
  export default TabelaStudenti;
