import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Kreiranje from './kreiranje/app'
import Popunjavanje from './popunjavanje/app'
import Rezultati from './rezultati/app'
import Liste from './liste/app'
import Uredi from './uredi'
import PopunjenaAnketa from './popunjenaAnketa'
import MojeAnkete from './liste/mojeAnkete'
import {Redirect} from 'react-router'
export default class Hotel extends React.Component {

    meniStudent = ['mojeAnkete', 'javneAnkete', 'anketePoPredmetimaStudent', 'rezultatiAnketa', 'kreirajAnketu']
    meniProfesor = ['mojeAnkete', 'javneAnkete', 'anketePoPredmetimaProfesor', 'popunjeneAnketeProfesor', 'rezultatiAnketa', 'kreirajAnketu']
    meniAdmin = ['mojeAnkete', 'javneAnkete', 'anketePoPredmetimaAdmin','popunjeneAnketeAdmin', 'rezultatiAnketa', 'kreirajAnketu' ]
    
    constructor(props) {
        super(props)
        this.changePage = this.changePage.bind(this)
        console.log(this.meniStudent)
        this.state = {
            page: 'moje ankete',
            meni: this.meniStudent,
            uloga: 'STUDENT'
        }
    }
    stranice = {
        mojeAnkete: {
            url: '/hotel/liste/mojeAnkete',
            tekst: 'Moje ankete'
        },
        kreirajAnketu: {
            url: '/hotel/kreiranje',
            tekst: 'Kreiraj anketu'
        },
        javneAnkete: {
            url: '/hotel/liste/javneAnkete',
            tekst: 'Javne ankete'
        },
        rezultatiAnketa: {
            url: '/hotel/liste/rezultatiAnketaKorisnik',
            tekst: 'Rezultati anketa'
        },
        popunjeneAnketeAdmin: {
            url: '/hotel/liste/popunjeneAnketeAdmin',
            tekst: 'Popunjene ankete'
        },
        popunjeneAnketeProfesor: {
            url: '/hotel/liste/popunjeneAnketeProf',
            tekst: 'Popunjene ankete'
        },
        anketePoPredmetimaStudent: {
            url: '/hotel/liste/anketePoPredmetimaStudenti',
            tekst: 'Ankete na predmetima'
        },
        anketePoPredmetimaProfesor: {
            url: '/hotel/liste/anketePoPredmetimaProf',
            tekst: 'Ankete na predmetima'
        },
        anketePoPredmetimaAdmin: {
            url: '/hotel/liste/sveAnketeSviPredmetiAdmin',
            tekst: 'Ankete na predmetima'
        },
    }
    
    
    changePage(e) {
        
        let str = e.target.name
        let url = this.stranice[str].url
        this.props.history.push(url)
        this.setState({
            page: e.target.name
        })
    }
    render() {
        let buttonStyle = {
            width: "100%",
            textAlign: "left",
            margin: "0",
            border: "none",
            borderRadius: "0",
            height: "50px"
        }
        return (
            <div class="row" style={{margin: "0", padding: "0", backgroundColor: "#2C3E50", height: "calc(100vh - 80px)"}}>
                <div class="col-3" style={{padding: "0"}}>
                    <ul>
                        {
                            this.state.meni.map(item => (
                            <li>
                                <button 
                                    type = "button"
                                    className = "btn btn-primary"
                                    name = {item}
                                    onClick = {this.changePage}
                                    style = {buttonStyle}
                                >
                                    {this.stranice[item].tekst}
                                </button>
                            </li>))
                        }
                    </ul>
                </div>
                <div class="col-9" style={{padding: "0"}}>
                    <Route exact path="/hotel" component={MojeAnkete} />
                    <Route path="/hotel/kreiranje/" component={Kreiranje} />
                    <Route path="/hotel/popunjavanje/:id" component={Popunjavanje} />
                    <Route path="/hotel/rezultati/:id" component={Rezultati} />
                    <Route path="/hotel/liste" component={Liste} />
                    <Route path="/hotel/uredi/:id" component={Uredi} />
                    <Route path="/hotel/popunjenaanketa/:id" component={PopunjenaAnketa} />
                </div>
            </div>
        )
    }

    componentDidMount() {
        fetch('http://si2019golf.herokuapp.com/r1/uloga/' + window.localStorage.getItem("id") + '?username=' + window.localStorage.getItem("username"), {
            method: 'get',
            headers: {
                'Authorization': window.localStorage.getItem("token")
            }
        }).then(res => res.json())
          .then(res => {
                console.log(res)
                if(res.loginError) {
                    window.location.href = window.location.origin + '/romeo/login'
                }
                else {
                    console.log(res)
                    let meni = this.meniStudent 
                    if(res.uloga == "ADMIN")
                        meni = this.meniAdmin
                    else if(res.uloga == "PROFESOR" || res.uloga == "ASISTENT")
                        meni = this.meniProfesor
                    console.log(res.uloga, "-1-2-2")
                    this.setState({
                        uloga: res.uloga,
                        meni
                    })
                }
          })
    }
}