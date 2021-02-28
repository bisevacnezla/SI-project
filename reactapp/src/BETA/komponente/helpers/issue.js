import React from 'react';
import IssueMessage from "./IssueMessage";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import ModalComponent from './OdgovorForma.js'
import {standardHeaders} from '../helpers/getStandardHeaders'

export default class Issue extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            trashStudent: 1,
            trashSS: 0,
            issueID: null,
            clickedItem: {
                data: null,
                expanded: false,
            },
            newArray: this.props.data,
            showModal: false,
            idForReply: 0
            
        }
    }

    setIssue = (item) => {
        this.setState({
            clickedItem: {
                data: item,
                expanded: !this.state.clickedItem.expanded
            },


        });
    };

    setIdForReply = (item) => {
        this.setState({
            idForReply: item,
            modalShow: true
        })
    }

    archiveIssue = (idIssue) => {

        const { trashStudent, trashSS } = this.state;
        axios.put('https://si2019beta.herokuapp.com/issues/archived/add', { trashStudent, trashSS, idIssue }, standardHeaders())
            .then((result) => {

                for (let i = 0; i < this.props.data.length; i++) {
                    if (this.props.data[i].id == idIssue) {
                        this.props.data.splice(i, 1);
                        this.setState({
                            newArray: this.props.data
                        })
                    }
                }

            this.props.triggerRefreshList(this.state.newArray);
        });


    }
    resloveIssue = (idIssue) => {

        const { trashStudent, trashSS } = this.state;
        axios.put('https://si2019beta.herokuapp.com/issues/reslove', { trashStudent, trashSS, idIssue }, standardHeaders())
            .then((result) => {

                for (let i = 0; i < this.props.data.length; i++) {
                    if (this.props.data[i].id == idIssue) {
                        this.props.data.splice(i, 1);
                        this.setState({
                            newArray: this.props.data
                        })
                    }
                }

                this.props.triggerRefreshList(this.state.newArray);
            });


    }

    componentWillReceiveProp() {
        alert("Usao sam sada ovo");
    }

    replyOnIssue = (id) => {
        //otvoriti modal
    }

    render() {
        return this.props.data.map((issue, index) => {
            let d = new Date(issue.messages[issue.messages.length-1].datum);
        
            let datum = [];
            datum.push(d[11]);
            datum.push(d[12]);
            datum.push(d[13]);
            datum.push(d[14]);
            datum.push(d[15]);
            datum.push('    ');
            datum.push(d[8]);
            datum.push(d[9]);
            datum.push('.');
            datum.push(d[5]);
            datum.push(d[6]);
            datum.push('.');
            datum.push(d[0]);
            datum.push(d[1]);
            datum.push(d[2]);
            datum.push(d[3]);
            datum.push('.');

            return (
                <div className="row">
                    <div key={index} className="card issue-card" style={{minWidth: "100%"}} >
                        <div className="card-title">
                            <div className="issue-body card-body">
                                <div className="issueID">id:{issue.id}</div>
                                <div className="issueDate">DATUM I VRIJEME: {d.toLocaleString()}</div>
                                <div onClick={() => this.setIssue(issue.id)} className="issue-title">NASLOV: {issue.title}</div>
                                <div className="issueButtonDelete">
                                    <Button onClick={() => this.archiveIssue(issue.id)}>Arhiviraj</Button>

                                    
                                </div>
                                <div className="issueButtonDelete">
                                   
                                    <Button onClick={() => this.resloveIssue(issue.id)}>Riješi</Button>


                                     <Button onClick={() => this.setIdForReply(issue.id)}>Odgovori</Button>

                                </div>

                            </div>
                        </div>


                        {this.state.clickedItem.data === issue.id && this.state.clickedItem.expanded ?
                            <ListGroup>
                                <IssueMessage className="card-body"
                                    messages={issue.messages}
                                />
                            </ListGroup> : null
                        }

                    </div>

                    {this.state.idForReply === issue.id ?
                    <ModalComponent 
                        ID = {issue.id}
                        show = {this.state.modalShow}
                        naslovModala = "Pošalji odgovor"
                        btnPotvrdi = "Odgovori"
                        onHide = {() => this.setState({modalShow: false})}>
                    </ModalComponent> : null
                    }

                </div>
            );
        })
    }
}
