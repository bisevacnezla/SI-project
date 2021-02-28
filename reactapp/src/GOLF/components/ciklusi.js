import React, { Component } from 'react'
import Odsjeci from './odsjeci'
import './golf.css'


class Ciklusi extends Component {

    constructor(props) {
        super(props)

        this.state = {
            kliknut: false,
            kliknut1: false,
            kliknut2: false
        }

        this.Otvori = this.Otvori.bind(this)
    }

    Otvori(br) {
        if (br == 1)
            this.setState({
                kliknut: !this.state.kliknut
            })
        else if (br == 2) this.setState({
            kliknut1: !this.state.kliknut1
        })
        else {
            this.setState({
                kliknut2: !this.state.kliknut2
            })
        }
    }

    render() {
        return (
            <div id="navv" class='side'>
                <button type="button" class="btn btn-primary left-buttons" onClick={() => this.Otvori(1)}>Prvi ciklus</button>
                <br></br>
                {this.state.kliknut && <Odsjeci ciklus="1" />}
                <button type="button" class="btn btn-primary left-buttons" onClick={() => this.Otvori(2)}>Drugi ciklus</button>
                <br></br>
                {this.state.kliknut1 && <Odsjeci ciklus="2" />}
                <button type="button" class="btn btn-primary left-buttons" onClick={() => this.Otvori(3)}>Treći ciklus</button>
                <br></br>
                {this.state.kliknut2 && <Odsjeci ciklus="3" />}
            </div>
        )
    }
}

export default Ciklusi