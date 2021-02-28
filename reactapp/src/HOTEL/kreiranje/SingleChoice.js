import React from 'react'
import './SingleChoiceStyle.css'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tekstPitanja: '',
            odgovori: ['', ''],
            vrstaPitanja: 'single-choice'
        }
        this.props.azurirajPitanje(this.state)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.dodajOdgovor = this.dodajOdgovor.bind(this)
        this.obrisiOdgovor = this.obrisiOdgovor.bind(this)
    }

    setState(par) {
        super.setState(par, () =>
           this.props.azurirajPitanje(this.state))
    }

    handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
     }

     handleInputChange(event) {
        
        event.target.style.height = 'inherit';
        if(event.keyCode == 13)
            event.target.rows = event.target.value.split('\n').length + 1
        else
            event.target.rows = event.target.value.split('\n').length
        let name = event.target.name
        if(name != 'tekstPitanja') {
            let odgovori = this.state.odgovori
            odgovori[parseInt(name)] = event.target.value
            this.setState({
                odgovori
            })
        }
        else {
            this.setState({
                [event.target.name]: event.target.value
              })
        }
     }
    
      dodajOdgovor(event) {
        let odgovori = this.state.odgovori
        odgovori.splice(parseInt(event.target.name) + 1, 0, '')
        this.setState({
            odgovori
        })
      }

      obrisiOdgovor(event) {
        let odgovori = this.state.odgovori
        if(odgovori.length == 2) 
            return
        odgovori.splice(JSON.parse(event.target.name), 1)
        this.setState({
            odgovori
        })
      }

    render() {
        return (
            <div class="card border-primary mb-3">
                <div class="form-group" style={{margin: "10px"}}>
                    <textarea class="form-control" placeholder="Unesi tekst pitanja" id="tekstPitanjaTextArea" rows="1" name="tekstPitanja" onChange={this.handleInputChange}></textarea>
                </div>
                {this.state.odgovori.map((odgovor, i) => {
                    return (
                        <div className="row" style={{margin: "10px"}}>
                            <div className="col-1"></div>
                            <input id="radioQuestion" type="radio" disabled/>
                            <div class="form-group col-6" >
                                <textarea placeholder="Unesi tekst odgovora" class="form-control" id="tekstPitanjaTextArea" value={this.state.odgovori[i]} name={`${i}`} rows="1" onChange={this.handleInputChange}></textarea>
                            </div>
                            <div className="col-2">
                                <button className="btn btn-primary btn-block" name={`${i}`} onClick={this.dodajOdgovor} type="button">
                                    Dodaj
                                </button> 
                            </div>
                            <div className="col-2">
                                <button className="btn btn-primary btn-block" name={`${i}`} onClick={this.obrisiOdgovor} type="button">
                                    Obriši
                                </button> 
                            </div>
                        </div>
                    )
                })}
                
            </div>
        )
    }
}