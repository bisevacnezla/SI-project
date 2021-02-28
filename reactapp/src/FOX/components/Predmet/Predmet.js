import React, { Component } from 'react';
import './Predmet.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Predmet extends Component {
     constructor(props) {
          super(props);
          this.spremiID = this.spremiID.bind(this);
     }
     state = {
          predmeti: [
               {id: 100, naziv: "Tehnike programiranja", opis: "Opis predemeta"},
               {id: 1, naziv: "Numerički algoritmi", opis: "Opis predemeta"},
               {id: 2, naziv: "Diskretna matematika", opis: "Opis predemeta"}
          ],
          grupe: [
               {naziv: "Grupa 1"},
               {naziv: "Grupa 2"},
               {naziv: "Grupa 3"}
          ]
     }

     componentDidMount() {
          const korisnik = window.localStorage.getItem('id');
          const idKorisnika = korisnik !== null ? korisnik : 64;

          axios.get(`https://si2019fox.herokuapp.com/api/fox/predmeti/${idKorisnika}`).then(response => {
               this.setState({predmeti: response.data});
          });

          // Ostaje hardkodirani poziv jer grupe nisu implementirane u projektu
          axios.get('https://si2019fox.herokuapp.com/api/fox/grupe/1').then(response => {
               this.setState({grupe: response.data})
          });

          /* axios.get(`http://localhost:31906/api/fox/predmeti/${idKorisnika}`).then(response => {
               this.setState({predmeti: response.data});
          });

          axios.get('http://localhost:31906/api/fox/grupe/1').then(response => {
               this.setState({grupe: response.data})
          }); */
     }

     spremiID(id, e) {
          localStorage.setItem("idPredmeta", id);
     }

     render() {
          return (
               <div>

                    <Container fluid style={{padding:"0", margin: "0"}}>
                         <Row style={{margin: "0"}} className="justify-content-center" noGutters>
                         {this.state.predmeti.map(p => {
                              return (
                                   <div as={Col} class="card" key={p.naziv} style={{maxWidth: "300px", margin: "5px"}}>
                                        <div class="card-body">
                                        <h4 class="card-title text-center"><a onClick={(e) => this.spremiID(p.id, e)} href={`fox/stranicaPredmeta?predmetId=${p.naziv}`} style={{color: "primary"}}> {p.naziv} </a></h4>
                                             <h6 class="card-subtitle mb-2 text-muted">{p.opis}</h6>
                                        </div>
                                        <div class="list-group list-group-flush">
                                             {
                                                  this.state.grupe.map(g => <a class="list-group-item list-group-item-action" key={g.naziv} href={`fox/stranicaPredmeta?predmetId=${p.naziv}?${g.naziv}`}> {g.naziv} </a>)
                                             }
                                        </div>
                                   </div>
                              );
                         })}
                         </Row>
                    </Container>

               </div> 
          );
     }
}
 
export default Predmet;