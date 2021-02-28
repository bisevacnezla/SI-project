import React, { Component } from 'react'
import FormaAsistent from './FormaAsistent'
import Povezivanje from './FormaAsistentPred'
import FormaUrediAsistenta from './FormaUrediAsistenta'
import Prikaz from './prikazAsistenta'


import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

class DodajAsistenta extends Component {
    render () {
        return (
            <div className="dodajAsistenta" style={{color: "#2C3E50"}} id="content">
                <h1 style={{color: "#fff", background: "#2C3E50"}} id="h1">Asistent</h1>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Dodaj asistenta">
                        <FormaAsistent />
                    </Tab>

                    <Tab eventKey="profile" title="Dodaj asistenta na predmet">
                        <Povezivanje />
                    </Tab>

                    <Tab eventKey="profile2" title="Uredi asistenta">
                        <FormaUrediAsistenta />
                    </Tab>
					<Tab eventKey="list" title="Prikaz asistenata">
                        <Prikaz />
                    </Tab>


                </Tabs>
</div>
        )
    }
}

export default DodajAsistenta
