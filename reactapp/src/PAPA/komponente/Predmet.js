import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import papaApi from './papaApi'
import ColorPicker from './manjeKomponente/ColorPicker';




class PredmetOne extends Component {

  constructor(props) {
    super(props);
    this.state = {  
                    boja:"white",
                    naslov: "Izaberite nacin prikazivanja",
                    lista:[],
                    showPredmet:true
                 };
    this.trenutniPredmeti = this.trenutniPredmeti.bind(this); 
    this.odslusaniPredmeti = this.odslusaniPredmeti.bind(this); 
    this.polozeniPredmeti = this.polozeniPredmeti.bind(this); 
    this.nePolozeniPredmeti = this.nePolozeniPredmeti.bind(this);            
    this.trenutniSaDrugihOdsjeka = this.trenutniSaDrugihOdsjeka.bind(this); 
    this.trenutniSaDrugihSemestara = this.trenutniSaDrugihSemestara.bind(this); 
    this.trenutniProfesori = this.trenutniProfesori.bind(this); 
    this.trenutniAsistenti = this.trenutniAsistenti.bind(this);
    this.kliknutPredmet=this.kliknutPredmet.bind(this);
  }

  kliknutPredmet(){
    if(this.state.showPredmet){
      window.location.replace("/DELTA");
    }
  }

  promijeniBoju(novaBoja){
    this.setState({
      boja:novaBoja  
    });
  }
  
  trenutniPredmeti(){
    papaApi.trenutniPredmeti().then((res) => {
        this.setState({
          showPredmet:true,
          naslov:"Trenutni predmeti",
          lista:res.data});
    }).catch((err) => {
      this.setState({
        showPredmet:true,
        naslov:"Trenutni predmeti",
        lista:[]});
    });
  }
  odslusaniPredmeti(){
    papaApi.odslusaniPredmeti().then((res) => {
      this.setState({
        showPredmet:true,
        naslov:"Odslusani predmeti",
        lista:res.data});
    }).catch((err) => {
      this.setState({
        naslov:"Odslusani predmeti",
        lista:[]});
    });
  }
  polozeniPredmeti(){
    papaApi.polozeniPredmeti().then((res) => {
      this.setState({
        showPredmet:true,
        naslov:"Polozeni predmeti",
        lista:res.data});
    }).catch((err) => {
      this.setState({
        showPredmet:true,
        naslov:"Polozeni predmeti",
        lista:[]});
    });
  }
  nePolozeniPredmeti(){
    papaApi.nePolozeniPredmeti().then((res) => {
      this.setState({
        showPredmet:true,
        naslov:"Nepolozeni predmeti",
        lista:res.data});
    }).catch((err) => {
      this.setState({
        showPredmet:true,
        naslov:"Nepolozeni predmeti",
        lista:[]});
    });
  }
  trenutniSaDrugihOdsjeka(){
    papaApi.trenutniSaDrugihOdsjeka().then((res) => {
      this.setState({
        showPredmet:true,
        naslov:"Predmeti sa drugih odsjeka",
        lista:res.data});
    }).catch((err)=>{
      this.setState({
        showPredmet:true,
        naslov:"Predmeti sa drugih odsjeka",
        lista:[]});
    });
  }
  trenutniSaDrugihSemestara(){
    papaApi.trenutniSaDrugihSemestara().then((res) => {
      this.setState({
        naslov:"Predmeti sa drugih semestara",
        lista:res.data,
        showPredmet:true
    });
    }).catch((err) => {
      this.setState({
        naslov:"Predmeti sa drugih semestara",
        lista:[],
        showPredmet:true
       });
    });
  }
  trenutniAsistenti(){
    papaApi.trenutniAsistenti().then((res) => {
      let niz=[];
      for (let a = 0; a < res.data.length; a++ ) {
        niz.push({
          id:res.data[a].id,
          naziv:res.data[a].ime+" "+res.data[a].prezime
        })
      }
      this.setState({
        showPredmet:false,
        naslov:"Asistenti",
        lista:niz});
    }).catch((err) => {
      this.setState({
        showPredmet:false,
        naslov:"Asistenti",
        lista:[]});
    });
  }
  
  trenutniProfesori(){
    papaApi.trenutniProfesori().then((res) => {
      let niz=[];
      for (let a = 0; a < res.data.length; a++ ) {
        niz.push({
          id:res.data[a].id,
          naziv:res.data[a].ime+" "+res.data[a].prezime
        })
      }
      this.setState({
        naslov:"Profesori",
        lista:niz,
        showPredmet:false
      });
    }).catch((err) =>{
      this.setState({
        naslov:"Profesori",
        lista:[],
        showPredmet:false
      });
    });
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%'}}>
        <Card className="m-0" style={{ width: '100%', height: '100%', backgroundColor:this.state.boja}}>
        <Card.Header className='bg-primary' >
          <div style={{width: '100%',  display: 'flex',justifyContent:'space-between'}}>
            {<h3 style={{color:"white"}} >Predmeti</h3>}
            <ButtonGroup vertical  style={{alignSelf: 'flex-end'}}>
              <DropdownButton as={ButtonGroup} 
                alignRight
                title="Filteri "
                id="dropdown-menu-align-right">
                <Dropdown.Item eventKey="1" onClick={this.trenutniPredmeti}>Trenutni predmeti</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={this.odslusaniPredmeti}>Odslusani predmeti </Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={this.polozeniPredmeti}>Polozeni predmeti</Dropdown.Item>
                <Dropdown.Item eventKey="4" onClick={this.nePolozeniPredmeti}>Nepolozeni predmeti</Dropdown.Item>
                <Dropdown.Item eventKey="5" onClick={this.trenutniSaDrugihOdsjeka}>Trenutni sa drugih odsjeka</Dropdown.Item>
                <Dropdown.Item eventKey="6" onClick={this.trenutniSaDrugihSemestara}>Trenutni sa drugih semestara</Dropdown.Item>  
                <Dropdown.Item eventKey="5" onClick={this.trenutniAsistenti}>Trenutni asistenti</Dropdown.Item>
                <Dropdown.Item eventKey="6" onClick={this.trenutniProfesori}>Trenutni profesori</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title style ={{fontWeight: "bold"}}>{this.state.naslov}</Card.Title>
          <div>
              <ul style={{listStyleType: "square"}}>
                {this.state.lista.map(item => (
                  <li style={{ margin: "1rem"}} key={item.id} onClick={this.kliknutPredmet.bind(this)}>{item.naziv}</li>
                ))}
              </ul>
          </div>
        </Card.Body>
        <ColorPicker promijeniBoju={this.promijeniBoju.bind(this)}/>
      </Card>
      </div>
    );
  }
}

export default PredmetOne;