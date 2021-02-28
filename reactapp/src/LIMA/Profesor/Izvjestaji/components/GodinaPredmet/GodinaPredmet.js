import React, { Component, Fragment } from 'react';
import { Route, } from "react-router-dom";
import { default as GodinaPredmetGUI } from '../../../../Student/Izvjestaji/components/GodinaPredmet/GodinaPredmet.js';
import TabelarniPrikaz from './TabelarniPrikaz.js';


class GodinaPredmet extends Component {
    render(){
        return (
            <Fragment>
                <Route path="/Lima/izvjestaji/godina=:godinaId&predmet=:predmetId&tabelarno=false" component={GodinaPredmetGUI} />
                <Route path="/Lima/izvjestaji/godina=:godinaId&predmet=:predmetId&tabelarno=true" component={TabelarniPrikaz} />
            </Fragment>
        )
    }
}


export default GodinaPredmet;