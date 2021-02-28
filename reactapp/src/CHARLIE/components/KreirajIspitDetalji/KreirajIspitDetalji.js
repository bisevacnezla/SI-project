import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datetime';

class KreirajIspitDetalji extends Component {
  constructor() {
    super();
    this.state = {
      rokPrijave: new Date(),
      termin: new Date(),
      sala: null,
      vrijemeTrajanja: 0,
      kapacitet: 0,
      napomena: '',
      validno: true,
      greske: ['', '', '', '', '', '']
    };
  }

  handleRokPrijave = (rokPrijave) => {
    this.setState({rokPrijave});
  };

  handleTermin = (termin) => {
    this.setState({termin});
  };

  kreirajIspit = async () => {
    const result = this.props.data()
    // const obj = {...this.state, ...result, idProfesor:5}
    try {
      const obj = {
        idProfesor: result.idProfesor,
        idPredmet: result.idPredmet || 8,
        brojStudenata: result.brojStudenata,
        tipIspita: result.tipIspita,
        rokPrijave: new Date(this.state.rokPrijave),
        sala: this.state.sala || 'MA',
        termin: new Date(this.state.termin),
        vrijemeTrajanja: this.state.vrijemeTrajanja,
        kapacitet: this.state.kapacitet,
        napomena: this.state.napomena
      }
      console.log(obj)
      const {status} = await axios.post('http://si2019charlie.herokuapp.com/ispit', obj)
      // const {status} = await axios.post('http://localhost:31903/ispit', obj)
      status===200 ? window.alert('Uspjesno kreiran ispit') : window.alert('Greska pri kreiranju ispita')
      this.props.onChangeActiveId(1)
    } catch (error) {
      console.log(error)
    }
    
  }

  render() {
    console.log(this.state)
    return (
      <div class='container-fluid' style={{ marginTop: '30px' }}>
        <h2 style={{ marginBottom: '30px' }}>Kreiraj ispit detalji</h2>

        <div class='card align-items-center'>
          <div class='card-body' style={{ minWidth: '100%' }}>
            <div class='row justify-content-lg-around justify-content-md-center'>
              <div class='col-lg-4 col-sm-12 col-md-6 justify-content-sm-center '>
                <h4 class='card-title'>Kreiranje ispita</h4>
                <h6 class='card-subtitle mb-2 text-muted'>
                  Ovdje je potrebno unijeti sve informacije kako biste mogli
                  kreirati termin ispita.
                </h6>
                <div style={{ textAlign: 'left' }}>
                  <label
                    htmlFor='rokPrijave'
                    class='col-form-label col-form-label-lg'
                  >
                    Rok prijave:{' '}
                  </label>
                </div>
                <DatePicker id='rokPrijave' value={this.state.rokPrijave} onChange={this.handleRokPrijave}/>
                <div style={{ textAlign: 'left' }}>
                  <label
                    htmlFor='sala'
                    class='col-form-label col-form-label-lg'
                  >
                    Sala:
                  </label>
                </div>
                <select multiple class='custom-select' id='sala' value={this.state.sala} onChange={(e) => this.setState({sala: e.target.value})}>
                  <option>VA</option>
                  <option>MA</option>
                  <option>S0</option>
                  <option>S1</option>
                  <option>S3</option>
                </select>
                <div style={{ textAlign: 'left' }}>
                  <label
                    htmlFor='termin'
                    class='col-form-label col-form-label-lg'
                  >
                    Termin:{' '}
                  </label>
                </div>
                <DatePicker id='termin' value={this.state.termin} onChange={this.handleTermin}/>
                <div style={{ textAlign: 'left' }}>
                  <label
                    class='col-form-label col-form-label-lg'
                    htmlFor='vrijemeTrajanja'
                  >
                    Vrijeme trajanja:{' '}
                  </label>{' '}
                </div>
                <input type='number' className='form-control' id='vrijemeT' value={this.state.vrijemeTrajanja} onChange={(e) => this.setState({vrijemeTrajanja:e.target.value})}/>
                <div style={{ textAlign: 'left' }}>
                  <label
                    class='col-form-label col-form-label-lg'
                    htmlFor='Kapacitet'
                  >
                    Kapacitet:{' '}
                  </label>{' '}
                </div>
                <input type='number' className='form-control' id='kapacitet' value={this.state.kapacitet} onChange={(e) => this.setState({kapacitet:e.target.value})}/>
                <div style={{ textAlign: 'left' }}>
                  <label
                    class='col-form-label col-form-label-lg'
                    htmlFor='Kapacitet'
                  >
                    Napomena:{' '}
                  </label>{' '}
                </div>

                <textarea
                  className='form-control'
                  id='ispitnaNapomena'
                  placeholder='Ovdje unesite napomenu...'
                  rows='15'
                  value={this.state.napomena} 
                  onChange={(e) => this.setState({napomena:e.target.value})}
                />

                <div style={{ float: 'right' }}>
                  <button
                    type='button'
                    class='btn btn-primary'
                    id='btnSpasiCharlie'
                    name='btnSpasiCharlie'
                    style={{ marginTop: '20px', marginRight: '10px' }}
                    onClick={this.kreirajIspit}
                  >
                    Kreiraj ispit
                  </button>

                  <button
                    type='button'
                    class='btn btn-secondary'
                    id='btnPovratak'
                    style={{ marginTop: '20px' }}
                    onClick={() => this.props.onChangeActiveId(0)}
                  >
                    Odustani
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KreirajIspitDetalji;
