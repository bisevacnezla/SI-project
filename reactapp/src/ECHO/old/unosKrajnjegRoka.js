// Let's use moment static reference in the Datetime component.
import React, { Component } from 'react';
import Datetime from 'react-datetime';
import "./unosKrajnjegRoka.css";


class UnosKrajnjegRoka extends Component{
    render() {
        return (
            <div className="divFormaKrajnjegRoka">
                <form>
                <label>Unesite datum i vrijeme za krajnji rok unosa i promjene slobodnih termina za nastavno osoblje:</label>
                <br></br>

                <div id="KalendarZaUnos">
                <Datetime input={ false } isValidDate={ valid }   />
                </div>
                <button id="Potvrda">Unesi</button>
                </form>
            
            </div>
        );
    }
}
    

    var yesterday = Datetime.moment().subtract(1, 'day');
    var valid = function( current ){
    return current.isAfter( yesterday );
    }


export default UnosKrajnjegRoka;

