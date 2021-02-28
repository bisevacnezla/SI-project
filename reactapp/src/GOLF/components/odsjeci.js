import React, { Component } from 'react'
import './golf.css'
import Semestri6 from './Semestri6'
import Semestri4 from './Semestri4'

class Odsjeci extends Component {

    constructor(props) {
        super(props)

        this.state = {
            kliknutRI: false,
            kliknutAiE: false,
            kliknutEE: false,
            kliknutTK: false
        }
    }

    Otvori(br) {
        if (br == 1) {
            this.setState({
                kliknutRI: !this.state.kliknutRI
            })
        }
        else if (br == 2) {
            this.setState({
                kliknutAiE: !this.state.kliknutAiE
            })
        }
        else if (br == 3) {
            this.setState({
                kliknutEE: !this.state.kliknutEE
            })
        }
        else {
            this.setState({
                kliknutTK: !this.state.kliknutTK
            })
        }
    }

    render() {
        return (
            <div class='vanjski'>
                <div class="side" id="drugi">
                    <button type="button" class="btn btn-primary left-buttons" onClick={() => this.Otvori(1)}>Računarstvo i informatika</button>
                    <br></br>
                    {this.state.kliknutRI && this.props.ciklus == "1" && <Semestri6 ciklus={this.props.ciklus} odsjek='RI'> </Semestri6> || this.state.kliknutRI && <Semestri4 ciklus={this.props.ciklus} odsjek='RI'></Semestri4>}
                    <button type="button" class="btn btn-primary left-buttons" onClick={() => this.Otvori(2)}>Automatika i elektronika</button>
                    <br></br>
                    {this.state.kliknutAiE && this.props.ciklus == "1" && <Semestri6 ciklus={this.props.ciklus} odsjek='AIE'> </Semestri6> || this.state.kliknutAiE && <Semestri4 ciklus={this.props.ciklus} odsjek='AIE'></Semestri4>}
                    <button type="button" class="btn btn-primary left-buttons" onClick={() => this.Otvori(3)}>Elektroenergetika</button>
                    <br></br>
                    {this.state.kliknutEE && this.props.ciklus == "1" && <Semestri6 ciklus={this.props.ciklus} odsjek='EE'> </Semestri6> || this.state.kliknutEE && <Semestri4 ciklus={this.props.ciklus} odsjek='EE'></Semestri4>}
                    <button type="button" class="btn btn-primary left-buttons" onClick={() => this.Otvori(4)}>Telekomunikacije</button>
                    <br></br>
                    {this.state.kliknutTK && this.props.ciklus == "1" && <Semestri6 ciklus={this.props.ciklus} odsjek='TK'> </Semestri6> || this.state.kliknutTK && <Semestri4 ciklus={this.props.ciklus} odsjek='TK'></Semestri4>}
                </div>
            </div>
        )
    }
}

export default Odsjeci