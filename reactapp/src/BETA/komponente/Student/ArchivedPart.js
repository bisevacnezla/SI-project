import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'
import Issue from '../helpers/Archived.js';
import axios from 'axios';
import { standardHeaders } from '../helpers/getStandardHeaders'
class ArchivedPart extends React.Component {
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
            isLoading: true,
            trashStudent: 2,
            trashSS: 0
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

    emptyFolder = (data, code) => {
        
        const {trashStudent, trashSS} = this.state;

        for(let i = 0; i < data.length; i++){
            const id = data[i].id;
            
            axios.put('https://si2019beta.herokuapp.com/issues/archived/delete', { trashStudent, trashSS, id }, standardHeaders())
            .then((result) => {
            });
        }

        if(code == 1){
            this.setState({
                dataNew: []
            })
        }
        else if(code == 2){
            this.setState({
                dataInProgress: []
            })
        }
        else if(code == 3){
            this.setState({
                dataResolved: []
            })
        }

    }

    async componentDidMount() {
        this.setState({isLoading: true});
        const res = await axios.get('https://si2019beta.herokuapp.com/issues/archived/get', standardHeaders());

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

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner animation='border' role='status'>
                    <span className="sr-only">Loading...</span>
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
                        <div className="tab-button-container">
                            <Button onClick = {() => this.emptyFolder(this.state.dataNew, 1)}>Isprazni folder</Button>
                        </div>
                    </Tab>
                    <Tab
                        className = "tab-issue"
                        eventKey="inProgress"
                        title={`U progresu (${this.state.dataInProgress.length})`}
                    >
                        <div className="tab-button-container">
                            <Button onClick = {() => this.emptyFolder(this.state.dataInProgress, 2)}>Isprazni folder</Button>
                        </div>
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
                        <div className="tab-button-container">
                            <Button onClick = {() => this.emptyFolder(this.state.dataResolved, 3)}>Isprazni folder</Button>
                        </div>
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

export default ArchivedPart;
