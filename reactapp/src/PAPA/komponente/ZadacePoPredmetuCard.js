import React from 'react';
import Card from 'react-bootstrap/Card'
import ZadacePoPredmetu from '../../LIMA/Student/Izvjestaji/components/Dijagrami/ZadacePoPredmetu.js';
import './manjeKomponente/stil.css'
import ColorPicker from './manjeKomponente/ColorPicker.js'
import papaApi from './papaApi';



class ZadacePoPredmetuCard extends React.Component {

    constructor(){
        super();
        this.state={
            
            idGodina:null,
            idPredmet:null,
            nizPredmeta:[],
            nizGodina:[],
            boja:"white",
            show:true
        }
        this.showHide = this.showHide.bind(this);
        this.renderPredmetiSelect=this.renderPredmetiSelect.bind(this);
        this.renderGodineSelect=this.renderGodineSelect.bind(this);
    }

    componentDidMount(){
        papaApi.sveGodine().then((res) => {
            let niz=[];
            for (let a = 0; a < res.data.length; a++ ) {
                niz.push({
                    id:res.data[a].id,
                    naziv:res.data[a].naziv 
                });
            }
            console.log(niz);
            if(niz.length==0){niz.push({id:1})};
            this.setState({ nizGodina:niz,
                            idGodina:niz[0].id
                        });
                    
        }).catch((err) => {});
        papaApi.sviPredmeti().then((res) => {
            let niz=[];
            for (let a = 0; a < res.data.length; a++ ) {
                niz.push({
                    id:res.data[a].id,
                    naziv:res.data[a].naziv 
                });
            }
            if(niz.length==0){niz.push({id:1})};
            console.log(niz);
            this.setState({ nizPredmeta:niz,
                            idPredmet:niz[0].id
                        });
                    
        }).catch((err) => {});
    }

    promijeniBoju(novaBoja){
        this.setState({
          boja:novaBoja  
        });
      }

    showHide(){
        this.setState({
            show:!this.state.show
        })
    }
    promijeniPredmet(key){
        this.setState({
            idPredmet:key
        })
    }
    promijeniGodinu(key){
        this.setState({
            idGodina:key
        })
    }
    renderPredmetiSelect(){
        return (
            <div className="row d-flex align-items-center mb-2">
                <label className="mx-3 my-0">Predmeti: </label>
                <select className="form-control col" value={this.state.tipGrafika} onChange={(e)=>{this.promijeniPredmet(e.target.value)}}>
                    {this.state.nizPredmeta.map(fbb =>
                        <option key={fbb.id} value={fbb.id}>{fbb.naziv}</option>
                    )};
                </select>
            </div>
        )
    }
    renderGodineSelect(){
        return (
            <div className="row d-flex align-items-center mb-2">
                <label className="mx-3 my-0">Godine: </label>
                <select className="form-control col" value={this.state.tipGrafika} onChange={(e)=>{this.promijeniGodinu(e.target.value)}}>
                    {this.state.nizGodina.map(fbb =>
                        <option key={fbb.id} value={fbb.id}>{fbb.naziv}</option>
                    )};
                </select>
            </div>
        )
    }
    render() {
      return (
        <div  style={{ width: '100%', height: '100%', margin:"0"}}>
          {this.state.show ?
            <div style={{ width: '100%', height: '100%',  margin:"0"}}>
                <Card style={{ width: '100%', height: '100%', backgroundColor:this.state.boja, margin:"0"}}>
                    <Card.Header className='bg-primary'>
                    <div style={{width: '100%',  display: 'flex',justifyContent:'space-between'}}>
                        {<h3 style={{color:"white"}} >Zadace po predmetu</h3>}
                        <div className={"center"}  onClick={this.showHide} style={{ backgroundColor:"red" }}>
                            <p className={"centerp"}>X</p>
                        </div>               
                    </div>
                    </Card.Header>
                    <Card.Body>
                        {this.renderPredmetiSelect()}
                        {this.renderGodineSelect()}
                        <ZadacePoPredmetu predmetId={this.state.idPredmet} godinaId={this.state.idGodina}/>
                    </Card.Body>
                    <ColorPicker promijeniBoju={this.promijeniBoju.bind(this)}/>
                </Card>
            </div>
            :
            <div className={"center2"} >
                <div className={"center3"}  onClick={this.showHide} style={{ backgroundColor:"light_green" }}>
                    <p className={"centerp2"}>Dodaj zadace po predmetu</p>
                </div>
            </div>
          }
        </div>  
      );
    }
  }
  
  export default ZadacePoPredmetuCard;