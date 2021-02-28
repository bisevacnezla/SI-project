import React from 'react'
import url from './url'
import './liste/stil.css'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            error: ''
        }
    }

    render() {
        return (
            <div className="okvirListe" id="containerKreiranje">
                {this.state.error ? <div className="alert alert-dismissible alert-danger" style={{marginTop: "10px"}}>
                  <button type="button" className="close" data-dismiss="alert" onClick={() => {}}>&times;</button>
                  {this.state.error}
                </div> : 
                <div>
                <div className="naslovliste"><h1>Popunjena anketa #{this.state.id}</h1></div>
                
                <br></br>
                <div style={{backgroundColor: "white", width: "70%", margin: "auto"}}>
                    {this.state.anketa ? (
                    <div>
                        <br/>
                        <h5>Naziv ankete: {this.state.anketa.naziv}</h5>
                        <h5>Vrijeme popunjavanja: {(new Date(this.state.anketa.vrijemePopunjavanja)).toLocaleString('hr')}</h5>
                        <br/>
                        <h4>Pitanja:</h4>
                        <div style={{
                            width: "80%",
                            margin: "auto"
                        }}>
                        {(this.state.anketa.odgovori) && this.state.anketa.odgovori.map(pitanje => (
                            <div className="card-body-pitanje" style={{
                                textAlign: "center"
                            }}>
                                <h5>{pitanje[0].tekstPitanja}</h5>
                                {
                                    pitanje.map(odgovor => (
                                        <div>
                                            {odgovor.vrstaPitanja == 'multiple-choice' ? 
                                                <div>
                                                    {odgovor.tekstOdgovora}
                                                </div>
                                            : 
                                                <div>
                                                    {odgovor.odgovor}
                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                                <br/>
                            </div>
                        ))}
                        </div>
                    </div>
                    ) : "Loading..."}
                </div>
                </div>
            }
            </div>
        )
    }

    componentDidMount() { 
       
        fetch(url + '/dajPopunjenuAnketu?id='+ this.state.id + "&username=" + window.localStorage.getItem("username")
        + "&idKorisnik=" + window.localStorage.getItem("id"), {
            method: 'GET',
            headers: {
                'Authorization': window.localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(result => {
            if (result.accessError) {
                this.setState({
                    error: result.accessError
                })
                return
            }
            if(result.loginError) {
                window.location.href = window.location.origin + '/romeo/login'
                return
            }
            console.log(result)
            this.setState({
                anketa: result
            })
        }, error => {
            this.setState({
                error: [error, "error"]
            })
        })
    }

}