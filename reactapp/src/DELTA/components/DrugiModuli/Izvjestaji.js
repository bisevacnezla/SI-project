import React, { Component } from 'react';
class Izvjestaj extends Component {  


   state={idPredmet:1};
    render () {

        return(
            <a class="btn btn-primary m-2" style={{ width : 100}} href='https://si2019frontend.herokuapp.com/Lima/izvjestaji/godina=12&predmet=1' role="button">Izvjestaji</a>
             
        );
    }
}

export default  Izvjestaj;