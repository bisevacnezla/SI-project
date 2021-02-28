import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';
import Issue from '../helpers/issue.js';
import axios from 'axios';
import {standardHeaders} from '../helpers/getStandardHeaders'

class IssueListSS extends React.Component {
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

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        const res = await axios.get('https://si2019beta.herokuapp.com/issues/get', standardHeaders());

        let dN = [];
        let dIP = [];
        let dR = [];

        //new
        res.data.new.forEach( async (issue) => {
            let cn = await axios.get(`https://si2019beta.herokuapp.com/category/get/${issue.categoryID}`, standardHeaders());
            let dn = issue.messages;
            dN.push({id: issue.id, title: cn.data.naziv, messages: dn});
        });

        //inProgress
        res.data.inProgress.forEach( async (issue) => {
            let cip = await axios.get(`https://si2019beta.herokuapp.com/category/get/${issue.categoryID}`, standardHeaders());
            let dip = issue.messages;
            dIP.push({id: issue.id, title: cip.data.naziv, messages: dip});
        });

        //resolved
        res.data.resolved.forEach( async (issue) => {
            let cr = await axios.get(`https://si2019beta.herokuapp.com/category/get/${issue.categoryID}`, standardHeaders());
            let dr = issue.messages;
            dR.push({id: issue.id, title: cr.data.naziv, messages: dr});
        });

        this.setStateAsync({dataNew: dN});
        this.setStateAsync({dataInProgress: dIP});
        this.setStateAsync({dataResolved: dR});

        this.setState({isLoading: false});
    }

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

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner animation='border' role='status' id="issue-tabs-Spinner">
                    <span className="sr-only">Učitavanje...</span>
                </Spinner>
            );
        }
        return (
            <div >
                <div id="search-issue-tab-Beta">Ovdje ce biti search filter
                </div>
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

export default IssueListSS;
