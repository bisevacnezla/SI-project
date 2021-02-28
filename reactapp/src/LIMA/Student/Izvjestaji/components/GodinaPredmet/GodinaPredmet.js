import React, { Component, Fragment } from 'react';
import { Collapse } from 'reactstrap';

import { dataPredmetPoGodini, godine } from '../../api.js';
import UkupniBrojPoPredmetu from '../Dijagrami/UkupniBrojPoPredmetu.js';
import PrisustvoPoPredmetu from '../Dijagrami/PrisustvoPoPredmetu';
import OcjenePoPredmetu from '../Dijagrami/OcjenePoPredmetu.js';
import ZadacePoPredmetu from '../Dijagrami/ZadacePoPredmetu.js'
import PrviParcijalniPoPredmetu from '../Dijagrami/PrviParcijalniPoPredmetu.js';
import DrugiParcijalniPoPredmetu from '../Dijagrami/DrugiParcijalniPoPredmetu.js';
import UsmeniPoPredmetu from '../Dijagrami/UsmeniPoPredmetu.js';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';

class GodinaPredmet extends Component {
    constructor(props){
        super(props);
        this.state = {
            stavkeOpened: {},
            nizStavki: [],
        }
    }
    componentDidMount(){
        let { predmetId, godinaId } = this.props.match.params;
            dataPredmetPoGodini.get(predmetId, godinaId).then((data) => {
                let { nizStavki, nazivGodine, nazivPredmeta } = data;
                let opened = [];
                for(let i=0;i<nizStavki.length;i++){
                    if(nizStavki[i].datum == null){
                        opened[nizStavki[i].tip] = false;
                    } else {
                        opened[`${nizStavki[i].tip} ${nizStavki[i].datum}`] = false;
                    }
                }
                this.setState({
                    nizStavki: nizStavki,
                    stavkeOpened: opened,
                    nazivGodine: nazivGodine,
                    nazivPredmeta: nazivPredmeta,
                    postoji: true
                })
            }).catch((res)=>{
                toast.error(res.message);
                this.setState({
                    postoji: false
                })
            })
    }
    renderStavke(){
        return this.state.nizStavki.map((stavka) => {
            let id;
            if(stavka.datum == null){
                id = stavka.tip;
            } else {
                id = `${stavka.tip} ${stavka.datum}`;
            }
            return (
            <Fragment key={id}>
                <h5 className="card-header btn-light border" style={{borderColor: '#dddddd', cursor: 'pointer'}} id={id} onClick={()=>{
                        let newOpened = {...this.state.stavkeOpened};
                        newOpened[id] = !newOpened[id];
                        this.setState({stavkeOpened: newOpened})
                    }}>
                    {id}
                </h5>
                <Collapse isOpen={this.state.stavkeOpened[id]}>
                        <div className="card-body border pt-0" style={{borderColor: '#aaa'}}>
                            {(()=>{
                                let { predmetId, godinaId } = this.props.match.params;
                                switch(stavka.tip){
                                    case "Prvi parcijalni":
                                        return <PrviParcijalniPoPredmetu predmetId={predmetId} godinaId={godinaId} datum={stavka.datum} />
                                    case "Drugi parcijalni":
                                        return <DrugiParcijalniPoPredmetu predmetId={predmetId} godinaId={godinaId} datum={stavka.datum} />
                                    case "Usmeni":
                                        return <UsmeniPoPredmetu predmetId={predmetId} godinaId={godinaId} datum={stavka.datum} />
                                    case "Prisustvo":
                                        return <PrisustvoPoPredmetu predmetId={predmetId} godinaId={godinaId} />
                                    case "Zadaca":
                                        return <ZadacePoPredmetu predmetId={predmetId} godinaId={godinaId} />
                                    case "Bodovi":
                                        return <UkupniBrojPoPredmetu predmetId={predmetId} godinaId={godinaId} />
                                    case "Ocjena":
                                        return <OcjenePoPredmetu predmetId={predmetId} godinaId={godinaId} />
                                    default:
                                }
                            })()}
                        </div>
                </Collapse>
            </Fragment>
            )
        })
    }
    render(){
        return (
            this.state.postoji == null ? <div className="d-flex w-100 justify-content-center"><Spinner /></div> : (
            !this.state.postoji ?
            <div className="d-flex w-100 justify-content-center">Izvjestaj ne postoji!</div> :
            <div className="p-2">
                <h3>{this.state.nazivPredmeta}</h3>
                <h4>Akademska {this.state.nazivGodine} godina - Izvještaj o predmetu</h4>
                {this.renderStavke()}
            </div>
            )
        )
    }
}


export default GodinaPredmet;