import React from 'react'
import {withRouter} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class TabelaPredmeti extends  React.Component {
    constructor(props){
        super(props);
        var dataY;
        if(this.props.tipIspita === 'I parcijalni'){
            dataY = [{
                Ime: 'Amer',
                Prezime: 'Abaz',
                Bodovi: '4',
                Index: '17468'                
              },
              {
                Ime: 'Azra',
                Prezime: 'Abazović',
                Bodovi: '9',
                Index: '17320'                
              },
              {
                Ime: 'Adna ',
                Prezime: 'Aličić',
                Bodovi: '12',
                Index: '17664'                
              },
              {Prezime:'Abaz', Ime:'Amer', Bodovi:'10', Index:'17468' }, 
              {Prezime:'Abazović', Ime:'Azra', Bodovi:'12', Index:'17320' }, 
              {Prezime:'Abazović', Ime:'Dženir', Bodovi:'1', Index:'17290' }, 
              {Prezime:'Aćimović', Ime:'Dejan', Bodovi:'19', Index:'17328' }, 
              {Prezime:'Adilović', Ime:'Belmin', Bodovi:'13', Index:'17602' }, 
              {Prezime:'Aganović', Ime:'Tarik', Bodovi:'10', Index:'17391' }, 
              {Prezime:'Ahmetspahić', Ime:'Jan', Bodovi:'20', Index:'17441' }, 
              {Prezime:'Ajdinović', Ime:'Haris', Bodovi:'10', Index:'17510' }
            ];
        }
        else if(this.props.tipIspita === 'II parcijalni'){
            dataY = [{
                Ime: 'Ajla',
                Prezime: 'Abazović',
                Bodovi: '17',
                Index: '17585'                
              },
              {
                Ime: 'Edin',
                Prezime: 'Brkić',
                Bodovi: '13',
                Index: '17300'                
              },
              {
                Ime: 'Benjamin',
                Prezime: 'Čovčić',
                Bodovi: '6',
                Index: '17435'                
              },
              {Prezime:'Kapić', Ime:'Amna', Bodovi:'10', Index:'17669' }        ,  
                {Prezime:'Karakaš', Ime:'Dino', Bodovi:'2', Index:'17454' }     ,
                {Prezime:'Muzurović', Ime:'Amina', Bodovi:'12', Index:'17519' }   ,  
                {Prezime:'Nišić', Ime:'Esma', Bodovi:'19', Index:'17677' }        ,  
                {Prezime:'Karadža', Ime:'Adil', Bodovi:'13', Index:'17317' }      ,  
                {Prezime:'Aganović', Ime:'Tarik', Bodovi:'10', Index:'17391' }    ,  
                {Prezime:'Kapo', Ime:'Muhamed', Bodovi:'20', Index:'17384' }      ,  
                {Prezime:'Kapetanović', Ime:'Eldin', Bodovi:'10', Index:'17412' } 
            ];
        }
        else{
            dataY = [{
                Ime: 'Hamo',
                Prezime: 'Jazvin',
                Bodovi: '1',
                Index: '17570'                
              },
              {
                Ime: 'Elvin',
                Prezime: 'Jažić',
                Bodovi: '17',
                Index: '17551'                
              },
              {
                Ime: 'Sadik',
                Prezime: 'Jukić',
                Bodovi: '14',
                Index: '17442'                
              },
              {Prezime:'Abaz', Ime:'Amer', Bodovi:'10', Index:'17468' }, 
              {Prezime:'Abazović', Ime:'Azra', Bodovi:'12', Index:'17320' }, 
              {Prezime:'Abazović', Ime:'Dženir', Bodovi:'1', Index:'17290' }, 
              {Prezime:'Aćimović', Ime:'Dejan', Bodovi:'19', Index:'17328' }, 
              {Prezime:'Adilović', Ime:'Belmin', Bodovi:'13', Index:'17602' }, 
              {Prezime:'Aganović', Ime:'Tarik', Bodovi:'10', Index:'17391' }, 
              {Prezime:'Ahmetspahić', Ime:'Jan', Bodovi:'20', Index:'17441' }, 
              {Prezime:'Ajdinović', Ime:'Haris', Bodovi:'10', Index:'17510' }
            ];
        }
        this.state = {
            studenti : false,
            data: dataY
        }
    }
    render() {
        const data2 = this.state.data;
        var brojac = 0;
        console.log(data2);
        return (
            <div>
                <Table striped bordered responsive bsPrefix="table">
                    <thead>
                        <tr className="table-primary" hover="false">
                            <th>Ime</th>
                            <th>Prezime</th>
                            <th>Bodovi</th>
                            <th>Index</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {
                            data2.map((dataf, i) => {
                                return <tr>
                                    <td>{dataf.Ime}</td>
                                    <td>{dataf.Prezime}</td>
                                    <td>{dataf.Bodovi}</td>
                                    <td>{dataf.Index}</td>
                                </tr>                            
                            })
                            }
                        </tbody>
                    </Table>
                    
                    <Container>
                      <Row className="justify-content-md-center" style={{margin: "0"}}>
                          <Col style={{textAlign: "center"}}>
                              <button 
                                  type="button" 
                                  className="btn btn-primary"
                                  onClick={this.props.handleNazad}> Nazad na listu ispita
                              </button>
                          </Col>
                      </Row>
                  </Container>
            </div>
        );
      }
      
}


export default withRouter(TabelaPredmeti);