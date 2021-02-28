import React, {Component, Form} from 'react';
import { Fragment } from 'react';

class PregledDetaljaPredmeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div style={{textAlign:"left"}}>
                <label className="col-form-label col-form-label-lg">Naziv projekta:</label>
                <br/>
                <label className="control-label">{this.props.naziv}</label>
                <br/>
                <label className="col-form-label col-form-label-lg">Opis projekta:</label>
                <br/>
                <label className="control-label">{this.props.opis}</label>
                <br/>
                <label className="col-form-label col-form-label-lg">Broj mogućih bodova:</label>
                <br/>
                <label className="control-label">{this.props.bodovi}</label>
                <br/>
            </div>
        );
    }

}

export default PregledDetaljaPredmeta;