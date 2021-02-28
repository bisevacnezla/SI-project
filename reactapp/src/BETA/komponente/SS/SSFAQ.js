import React from 'react'
import { Button } from '@material-ui/core';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import ModalComponent from './NewFAQModal.js';
import {standardHeaders} from '../helpers/getStandardHeaders';

class SSFAQ extends React.Component {
    constructor() {
        super();
        this.state = {
            issues: [],
            id: 4,
            modalShow: false,
            isLoading: true,
            naziv: "test",
            tekst: "Sara"
        }

    }

    onChangeActiveId = (id) => {
        this.setState({
            activeContentId: id,
        })
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        axios.get('https://si2019beta.herokuapp.com/frequentIssue/get', standardHeaders()).then(res => {
            if (!(typeof res.data === 'string' || res.data instanceof String)) {
                this.setState({
                    issues: res.data,
                    isLoading: false
                });
            }
            
        });
    }

    saveState = (type, state) => {
        switch (type) {
            case "modalShow":
                this.setState({
                    modalShow: state
                });
                break;
            case "noviFAQ":
                console.log(state);
                this.setState(state, () => {
                    this.setState({
                        modalShow: false
                    });
                });
                break;
            default:
                break;
        }
    }

    render() {
         let issues = this.state.issues.map(x => (
            {
                naziv: x.naziv,
                tekst: x.tekst
            }))
        return (
            <div className="col-12"  id="listaFAQBeta">


                <br></br>

                <h4 id="FAQGlavniNaslov">Često postavljani upiti</h4>


                <div className="faq-issue">
                    {issues.map((issue) =>
                        <div class="card">
                            <div class="card-body">
                                <div className="row align-items-start">
                                    <h5 className="card-title"> Naslov: {issue.naziv}</h5>
                                </div>
                                <div className="row align-items-start">
                                    <p className="card-text">Odgovor: {issue.tekst}</p>
                                </div>
                            </div>
                        </div>





                    )}

                </div>

                <button
                    id="buttonObjaviFaq"
                    type="submit"
                    className="btn btn-primary float-right btn-lg "
                    onClick={() => this.setState({ modalShow: true })}
                    style={{ marginTop: '30px' }}
                >Istakni novi upit
                        </button>


                <ModalComponent

                    show={this.state.modalShow}
                    naslovModala="Objavi rjesenje novog upita"
                    btnPotvrdi="Objavi upit"
                    saveState={this.saveState}
                    noviFAQ={this.state}

                />
            </div>






        );
    }
}
export default SSFAQ