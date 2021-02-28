import React, { Component } from 'react'
import FormaPr from './FormaPr'
import Povezivanje from './povezivanjeProfesorPredmet'
import FormaPrikazProf from './FormaPrikazProf'
import FormaUrediProf from './FormaUrediProf'


import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import FormaPrikazStud from './FormaPrikazStud';

class DodajProfesora extends Component {
    render () {
        return (
            <div className="dodajProfesor" style={{color: "#2C3E50"}} id="content">
                <h1 style={{color: "#fff", background: "#2C3E50"}} id="h1">Profesor</h1>
            
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Dodaj profesora">
                        <FormaPr />
                    </Tab>

                    <Tab eventKey="profile" title="Dodaj profesora na predmet">
                        <Povezivanje />
                    </Tab>

                    <Tab eventKey="prikaz" title="Prikaz profesora">
                        <FormaPrikazProf />
                    </Tab>

                    <Tab eventKey="uredi" title="Uredi profesora">
                        <FormaUrediProf />
                    </Tab>
                </Tabs>
</div>
        )
    }
}

export default DodajProfesora
