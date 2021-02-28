import React from 'react';
import Card from 'react-bootstrap/Card'
import ProsjekPoGodinama from '../../LIMA/Student/Izvjestaji/components/Dijagrami/ProsjekPoGodinama.js';
import './manjeKomponente/stil.css'
import ColorPicker from './manjeKomponente/ColorPicker.js'


class ProsjekPoGodinamaCard extends React.Component {

    constructor(){
        super();
        this.state={
            boja:"white",
            show:true
        }
        this.showHide = this.showHide.bind(this);
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

    render() {
      return (
        <div  style={{ width: '100%', height: '100%', margin:"0"}}>
          {this.state.show ?
            <div style={{ width: '100%', height: '100%',  margin:"0"}}>
                <Card style={{ width: '100%', height: '100%', backgroundColor:this.state.boja, margin:"0"}}>
                    <Card.Header className='bg-primary'>
                    <div style={{width: '100%',  display: 'flex',justifyContent:'space-between'}}>
                        <h3 style={{color:"white"}} >Prosjek po godinama</h3>
                        <div className={"center"}  onClick={this.showHide} style={{ backgroundColor:"red" }}>
                            <p className={"centerp"}>X</p>
                        </div>               
                    </div>
                    </Card.Header>
                    <Card.Body>
                        <ProsjekPoGodinama />
                    </Card.Body>
                    <ColorPicker promijeniBoju={this.promijeniBoju.bind(this)}/>
                </Card>
            </div>
            :
            <div className={"center2"} >
                <div className={"center3"}  onClick={this.showHide} style={{ backgroundColor:"light_green" }}>
                    <p className={"centerp2"}>Dodaj prosjek po godinama</p>
                </div>
            </div>
          }
        </div>  
      );
    }
  }
  
  export default ProsjekPoGodinamaCard;