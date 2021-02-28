import React, { Component } from 'react'
import FormaPredmet from './FormaPredmet'
import Forma from './editPredmeta'
import FormaPrikaz from './prikazPredmeta'
import FormaDodavanje from './povezivanjeOdsjekPredmet'


import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

class DodajPredmet extends Component {
    render () {
        return (
            <div className="dodajPredmet" style={{color: "#2C3E50"}} id="content">
                <h1 style={{color: "#fff", background: "#2C3E50"}} id="h1">Predmet</h1>
            
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Dodaj predmet">
                        <FormaPredmet />
                    </Tab>
                    
                    <Tab eventKey="profile2" title="Uredi predmet">
                        <Forma />
                    </Tab>
					
					<Tab eventKey="profile3" title="Prikaz predmeta">
                        <FormaPrikaz />
                    </Tab>
					
					<Tab eventKey="profile4" title="Dodaj predmet na odsjek">
                        <FormaDodavanje />
                    </Tab>
                  
                </Tabs>
</div>
        )
    }
}

export default DodajPredmet
