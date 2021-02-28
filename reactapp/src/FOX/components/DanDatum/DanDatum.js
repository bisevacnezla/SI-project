import React, { Component } from 'react';

class DanDatum extends Component {
    state = {  }
    getDayDate = () => { 
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var days = ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"];
        var day = days[today.getDay()];
        return day + ', ' + dd + '.' + mm + '.' + yyyy + '.';
    }
    render() { 
        return ( <p>{this.getDayDate()}</p> );
    }
}
 
export default DanDatum;