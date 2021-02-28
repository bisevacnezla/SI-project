import React from 'react';
import url from '../url'
import {Link} from 'react-router-dom'

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
            <div className="naslovliste"><h1>Popunjene ankete na mojim predmetima</h1></div>

            <br></br>

            <table className="tabelaLista table-bordered text-center bg-active border-solid" align="center">
                <tr className="bg-primary text-light">
                <td class="tabtip">Naziv ankete</td>
                <td class="tabtip">Prikaz ankete</td>
                </tr>
            
                {items.ankete ? items.ankete.map(anketa => (
                    <tr>
                        <th class="tabtip1">{anketa.naziv}</th>
                        <th class="tabtip1"><Link to={"/Hotel/popunjenaanketa/" + anketa.idPopunjenaAnketa}><button type="button" class="btn btn-primary" id="prikaziButton">Prikaži</button></Link></th>
                    </tr>
                )) : "Loading..."}
                </table>
            </div>
        )
    }
    componentDidMount() { 
        console.log(1234567)
        fetch(url + '/dajPopunjeneAnketeProfesor?idKorisnik='+window.localStorage.getItem("id") + "&username=" + window.localStorage.getItem("username"), {
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
            console.log(4322123)
            this.setState({
                items: result
            })
        }, error => {
            this.setState({
                error: [error, "error"]
            })
        })
    }
    
}

export default App;