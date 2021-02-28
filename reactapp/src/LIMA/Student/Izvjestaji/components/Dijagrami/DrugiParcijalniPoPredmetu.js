import React, { Fragment, Component } from 'react';

import GrafikStavka from './GrafikStavka.js';

import { dataPredmetPoGodini } from '../../api.js';
import { Spinner } from 'reactstrap';
import { nazivStavkePoTipu } from '../../static/dummy.js';
import { toast } from 'react-toastify';

class DrugiParcijalniPoPredmetu extends Component {
    constructor(){
        super();
        this.state = {
            data: null,
            izasloNaIspit: null,
            ukupnoStudenata: null,
            polozilo: null,
        };
    }
    componentDidMount(){
        let { predmetId, godinaId, datum } = this.props;
        dataPredmetPoGodini.get(predmetId, godinaId, "Drugi parcijalni", datum).then( data => {
            this.setState(data);
        }).catch(err => {
            toast.error("Greska!");
        })
    }
    render(){
        let { izasloNaIspit, ukupnoStudenata, polozilo } = this.state;
        return (this.state.data ? 
            <Fragment>
                <h6 className="pt-3 px-3">Izlaznost: {izasloNaIspit}/{ukupnoStudenata}={100*izasloNaIspit/ukupnoStudenata}%</h6>
                <h6 className="px-3">Prolaznost: {polozilo}/{izasloNaIspit}={100*polozilo/izasloNaIspit}%</h6>
                <GrafikStavka
                    data={this.state.data}
                    nazivStavke={`Drugi parcijalni ${this.props.datum}`}
                    tipGrafika='Bar'
                />
            </Fragment> :
            <Spinner />)
    }
}

export default DrugiParcijalniPoPredmetu;