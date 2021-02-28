import React from 'react';
import url from '../url';
import {Link} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        }
    }
    render() {
        const items = this.state.items
        return (
            <div className="okvirListe">
            <div className="naslovliste"><h1>Ankete po predmetima</h1></div>

            <br></br>
                <table className="tabelaLista table-bordered text-center bg-active border-solid" align="center">
                    <tr className="bg-primary text-light">
                    <td class="tabtip">Naziv ankete</td>
                    <td class="tabtip">Opis</td>
                    <td class="tabtip">Datum isteka</td>
                    <td class="tabtip">Prikaz ankete</td>
                    </tr>
            
                {items.ankete ? items.ankete.map(anketa => (
                    <tr>
                    <th class="tabtip1">{anketa.naziv}</th>
                    <th class="tabtip1">{anketa.opisAnkete}</th>
                    <th class="tabtip1">{anketa.datumIstekaAnkete.substr(0,10)}</th>
                    <th class="tabtip1"><a href={"/Hotel/popunjavanje/" + anketa.idAnketa}><button type="button" class="btn btn-primary" id="prikaziButton">Prikaži</button></a></th>
                    </tr>
                )) : "Loading..."}
                </table>
            </div>
        )
    }
    componentDidMount() { 
        fetch(url + '/dajAnketeNaPredmetimaZaStudenta?idStudent='+window.localStorage.getItem("id")+ '&username=' + window.localStorage.getItem("username"), {
            method: 'GET',
            headers: {
                'Authorization': window.localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(result => {
            if(result.loginError) {
                window.location.href = window.location.origin + '/romeo/login'
                return
            }
            console.log("hoce")
            this.setState({
                items: {
                ankete: result
              }
            })
        }, error => {
            this.setState({
                error: [error, "error"]
            })
        })
    }
}

export default App;