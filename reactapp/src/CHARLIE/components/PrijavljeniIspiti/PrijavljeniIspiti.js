import React from 'react';
import Notifikacija from '../SharedComponents/Notifikacija';
import axios from 'axios';
import '../SharedComponents/tabeleCharlie.css';
import { FormGroup, Table } from 'reactstrap';
import Modal2 from '../SharedComponents/Modal2';

class PrijavljeniIspiti extends React.Component {
  constructor() {
    super();

    this.state = {
      ispiti: [
        {
          idIspit: '',
          idPredmet: '',
          tipIspita: '',
          termin: ''
        }
      ],
      ispitID: null,
      predmetID: null,
      notifikacija: false,
      notifikacijaPoruka: '',
      severity: '',
      modalShow: false,
      greska: null,
      fetched: false
    };
  }
  // state = { notifikacija: false, notifikacijaPoruka:'', severity:'' };

  renderNotification = () => {
    const { severity, notifikacija } = this.state;
    let background;
    if (severity === 'high') background = 'red';
    else background = severity === 'medium' ? 'orange' : 'green';
    return (
      notifikacija && (
        <div>
          <Notifikacija
            poruka={this.state.notifikacijaPoruka}
            background={background}
            onClick={() =>
              this.setState({
                notifikacija: false,
                notifikacijaPoruka: '',
                background: ''
              })
            }
          />
        </div>
      )
    );
  };

  odjavaSaIspita = () => {
    // await axios.delete(`/prijava/${el.idPredmet}/:studentID`)
    // Dobaviti status iz axiosa
    const status = 201;
    status === 200 &&
      this.setState({
        notifikacija: true,
        notifikacijaPoruka: 'Uspjesna odjava sa ispita'
      });
    status !== 200 &&
      this.setState({
        notifikacija: true,
        notifikacijaPoruka: 'Neuspjesna odjava sa ispita',
        severity: 'high'
      });
  };

  async componentDidMount() {
    const idKorisnika = window.localStorage.getItem('id');
    const ispiti = await axios.get(
      `http://si2019charlie.herokuapp.com/prijavljeniIspiti/${idKorisnika}`
    );
    this.setState({ ispiti: ispiti.data });
  }

  renderPrijavljeniIspiti = () => {
    // const mockIspiti = [{idPredmet:1,tipIspita:'Prvi parcijalni', termin: new Date(), idIspit:1}]

    return this.state.ispiti.map(el => (
    // return mockIspiti.map(el => (
      <tr>
        <td class='tabtip1'>{el.idPredmet}</td>
        <td class='tabtip1'>{el.tipIspita}</td>
        <td class='tabtip1'>{new Date(el.termin).toUTCString()}</td>
        <td class='tabtip1' >
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => this.otvoriModal(el.idPredmet, el.idIspit)}
        >
          Odjavi
        </button>
        </td>
      </tr>
    ));
  };

  otvoriModal = (predmetID, ispitID)=>{
    this.setState({modalShow:true, ispitID, predmetID})
  }

  handleSubmit = async () => {
    try {
      const {ispitID, predmetID} = this.state
      const { status } = await axios.delete(
        `http://si2019charlie.herokuapp.com/prijava/${ispitID}/${predmetID}`
      );
      return status === 200
    } catch (error) {
      console.log(error.message);
    }
  };
  saveState = () => this.setState({modalShow:false})
  onClose = () => this.setState({modalShow:false})

  render() {
    return (
      <div class='container-fluid' style={{ marginTop: '30px' }}>
        <h2 style={{ marginBottom: '30px' }}>Prijavljeni ispiti</h2>
        {this.renderNotification()}

        <div>
          <FormGroup className='px-4' style={{ marginTop: '20px' }}>
            <Table className='table table-bordered text-center bg-active border-solid'>
              <thead>
                <tr className='bg-primary text-light'>
                  <th class='tabtip'>Predmet</th>
                  <th class='tabtip'>Tip ispita</th>
                  <th class='tabtip'>Datum ispita</th>
                  <th class='tabtip' />
                </tr>
              </thead>
              <tbody>{this.renderPrijavljeniIspiti()}</tbody>
            </Table>
          </FormGroup>

          <br />
        </div>

        <button
          type='button'
          className='btn btn-primary'
          onClick={() => this.props.onChangeActiveId(3)}
        >
          Nazad
        </button>
        <Modal2
          saveState={this.saveState}
          show={this.state.modalShow}
          naslovModala='Jeste li sigurni da želite odjaviti ispit?'
          obrisiIspit={this.state}
          potvrdiBtnCharlie='Potvrdi'
          onConfirm={this.handleSubmit}
          onClose={this.onClose}
          handleSubmit={this.handleSubmit}
          greska = {this.state.greska}
          fetched = {this.state.fetched}
        />
      </div>
    );
  }
}

export default PrijavljeniIspiti;
