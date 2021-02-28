import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';
import Issue from './Draft.js';
import axios from 'axios';
import {standardHeaders} from '../helpers/getStandardHeaders'

class Drafts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'new',
            dataNew: {
                title: null,
                messages: null,
            },
            dataInProgress: {
                title: null,
                messages: null,
            },
            dataResolved: {
                title: null,
                messages: null,
            },
            isLoading: true
        }
    };

    onRefreshListNew = (newArray) => {
        this.setState({
            dataNew: newArray
        })
    };

    onRefreshListInProgress = (newArray) => {
        this.setState({
            dataInProgress: newArray
        })
    };

    onRefreshListResolved = (newArray) => {
        this.setState({
            dataResolved: newArray
        })
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        const res = await axios.get('https://si2019beta.herokuapp.com/issues/draft/get', standardHeaders());

        let dN = [];
        let dIP = [];
        let dR = [];

        //new
        res.data.new.forEach( async (issue) => {
            let cn = await axios.get(`https://si2019beta.herokuapp.com/category/get/${issue.categoryID}`, standardHeaders());
            let dn = issue.messages;
            console.log("maida")
            console.log(dn[0].draftStatus)
            let novi = [];
            for(let i = 0; i < dn.length; i++){
                if(dn[i].draftStatus == true)
                novi.push(dn[i]);
            }
            dN.push({id: issue.id, title: cn.data.naziv, messages: novi});
        });

        //inProgress
        res.data.inProgress.forEach( async (issue) => {
            let cip = await axios.get(`https://si2019beta.herokuapp.com/category/get/${issue.categoryID}`, standardHeaders());
            let dip = issue.messages;
            let novi = [];
            for(let i = 0; i < dip.length; i++){
                if(dip[i].draftStatus == true)
                novi.push(dip[i]);
            }
            dIP.push({id: issue.id, title: cip.data.naziv, messages: novi});
        });

        //resolved
        res.data.resolved.forEach( async (issue) => {
            let cr = await axios.get(`https://si2019beta.herokuapp.com/category/get/${issue.categoryID}`, standardHeaders());
            let dr = issue.messages;
            let novi = [];
            for(let i = 0; i < dr.length; i++){
                if(dr[i].draftStatus == true)
                novi.push(dr[i]);
            }
            dR.push({id: issue.id, title: cr.data.naziv, messages: novi});
        });

        this.setStateAsync({dataNew: dN});
        this.setStateAsync({dataInProgress: dIP});
        this.setStateAsync({dataResolved: dR});

        this.setState({isLoading: false});
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner animation='border' role='status'>
                    <span className="sr-only">Učitavanje...</span>
                </Spinner>
            );
        }
        console.log(this.state.dataNew.length)
        return (
            <div >
                <Tabs
                    className=".p-3"
                    id="tabs"
                    activeKey={this.state.key}
                    onSelect={key => this.setState({ key })}
                >
                    <Tab
                        className = "tab-issue"
                        eventKey="new"
                        title={`Novi (${this.state.dataNew.length})`}
                    >
                        {!this.state.isLoading &&
                            <div>
                                <Issue triggerRefreshList = {this.onRefreshListNew}
                                className="tab-issue card"
                                data={this.state.dataNew}
                                />

                            </div>
                        }
                    </Tab>
                    <Tab
                        className = "tab-issue"
                        eventKey="inProgress"
                        title={`U progresu (${this.state.dataInProgress.length})`}
                    >
                        {!this.state.isLoading  &&
                            <Issue triggerRefreshList = {this.onRefreshListInProgress}
                                className="tab-issue card"
                                data={this.state.dataInProgress}
                            />
                        }
                    </Tab>
                    <Tab
                        className = "tab-issue"
                        eventKey="resolved"
                        title={`Riješeni (${this.state.dataResolved.length})`}
                    >
                        {!this.state.isLoading &&
                            <Issue triggerRefreshList = {this.onRefreshListResolved}
                                className="tab-issue card"
                                data={this.state.dataResolved}
                            />
                        }
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Drafts;
