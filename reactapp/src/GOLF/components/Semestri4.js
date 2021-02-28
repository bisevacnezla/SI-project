import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './golf.css'

class Semestri4 extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="vanjski">
                <div class="treci">

                    <Link to={'/Golf/semestarPredmeti/' + this.props.ciklus + '/' + this.props.odsjek + '/1'}>
                        <button type="button" class="btn btn-primary left-buttons" id="mpl">1. semestar</button>
                    </Link>
                    <Link to={'/Golf/semestarPredmeti/' + this.props.ciklus + '/' + this.props.odsjek + '/2'}>
                        <button type="button" class="btn btn-primary left-buttons" id="mpl">2. semestar</button>
                    </Link>
                    <Link to={'/Golf/semestarPredmeti/' + this.props.ciklus + '/' + this.props.odsjek + '/3'}>
                        <button type="button" class="btn btn-primary left-buttons" id="mpl">3. semestar</button>
                    </Link>
                    <Link to={'/Golf/semestarPredmeti/' + this.props.ciklus + '/' + this.props.odsjek + '/4'}>
                        <button type="button" class="btn btn-primary left-buttons" id="mpl">4. semestar</button>
                    </Link>

                </div>
            </div>
        )
    }
}

export default Semestri4