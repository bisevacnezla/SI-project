import React from 'react';

function Poruka(props) {

    const zatvoriAlert = () => {
        const alertNeuspjeh = document.getElementById('alertNeuspjeh');
        if(alertNeuspjeh !== null) alertNeuspjeh.style.display = "none";

        const alertUspjeh = document.getElementById('alertUspjeh');
        if(alertUspjeh !== null) alertUspjeh.style.display = "none";
    }

    const greska = props.greska;

    const alertNeuspjeh = document.getElementById('alertNeuspjeh');
    if(alertNeuspjeh !== null) alertNeuspjeh.style.display = "block";

    const alertUspjeh = document.getElementById('alertUspjeh');
    if(alertUspjeh !== null) alertUspjeh.style.display = "block";

    if (greska === 1) {
        return (
            <div id="alertNeuspjeh" class="alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert" onClick={zatvoriAlert}>&times;</button>
                <strong>{props.naslovGreska}</strong> <br/> {props.opisGreska}
            </div>
        );
    }
    if (greska === 2) {
        return (
            <div id="alertUspjeh" class="alert alert-dismissible alert-success">
                <button type="button" class="close" data-dismiss="alert" onClick={zatvoriAlert}>&times;</button>
                <strong>{props.naslovUspjeh}</strong> <br/> {props.opisUspjeh}
            </div>
        );
    }
    if (greska === 3) {
        return (
            <div id="alertUspjeh" class="alert alert-dismissible alert-secondary">
                <button type="button" class="close" data-dismiss="alert" onClick={zatvoriAlert}>&times;</button>
                <strong>Sačekajte...</strong> <br/> Uspostavlja se veza sa bazom podataka.
            </div>
        );
    }
    return ""
}

export default Poruka;