import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';
import Issue from '../helpers/issue.js';
import axios from 'axios';
import {standardHeaders} from '../helpers/getStandardHeaders'

class IssueList extends React.Component {
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
            categoryTitle: 'Sve',
            categoryArray: [],
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

        axios.get('https://si2019beta.herokuapp.com/category/get', standardHeaders()).then( res => {

            

            let displayNames = [];
            for(let i = 1; i < res.data.length; i++)
            {
                displayNames.push(res.data[i].naziv)
            }
            this.setState({categoryArray: displayNames, loading: true});
        });

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

    async changeIssueState(){
        // this.setState({kategorija : sljedecaKategorija});
                //alert(sljedecaKategorija.category);
                this.setState({isLoading: true});
                const res = await axios.get('https://si2019beta.herokuapp.com/issues/get', standardHeaders());
                //const kategorija = await axios.get('https://si2019beta.herokuapp.com/category/get/naziv?categoryNaziv='+'Da');
                //alert(kategorija.data);

                let dN = [];
                let dIP = [];
                let dR = [];

                //new
                res.data.new.forEach( async (issue) => {
                    let cn = await axios.get(`https://si2019beta.herokuapp.com/category/get/${issue.categoryID}`, standardHeaders());
                    if(this.state.categoryTitle == 'Sve' ||  cn.data.naziv == this.state.categoryTitle){
                    let dn = issue.messages;
                    dN.push({id: issue.id, title: cn.data.naziv, messages: dn});
                    }
                });

                //inProgress
                res.data.inProgress.forEach( async (issue) => {
                    let cip = await axios.get(`https://si2019beta.herokuapp.com/category/get/${issue.categoryID}`, standardHeaders());
                    if(this.state.categoryTitle == 'Sve' ||  cip.data.naziv == this.state.categoryTitle){
                    let dip = issue.messages;
                    dIP.push({id: issue.id, title: cip.data.naziv, messages: dip});
                    }
                });

                //resolved
                res.data.resolved.forEach( async (issue) => {
                    let cr = await axios.get(`https://si2019beta.herokuapp.com/category/get/${issue.categoryID}`, standardHeaders());
                    if(this.state.categoryTitle == 'Sve' ||  cr.data.naziv == this.state.categoryTitle){
                    let dr = issue.messages;
                    dR.push({id: issue.id, title: cr.data.naziv, messages: dr});
                    }
                });

                this.setStateAsync({dataNew: dN});
                this.setStateAsync({dataInProgress: dIP});
                this.setStateAsync({dataResolved: dR});

                this.setState({isLoading: false});
    };

    onChangeTitle = (e) => {
        this.setState({categoryTitle: e.target.value});
        this.changeIssueState();
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

    sortIssuesFromEarliest = (list) => {

    }

    render() {
        if (this.state.isLoading) {
            return (
                <Spinner animation='border' role='status' id="issue-tabs-Spinner">
                    <span className="sr-only">Učitavanje...</span>
                </Spinner>
            );
        }

        let options = [];
        options.push(<option>{this.state.categoryTitle}</option>);
        if(this.state.categoryTitle != 'Sve')
            options.push(<option>Sve</option>);
        for(let j = 0; j < this.state.categoryArray.length; j++)
            options.push(<option key={j}>{this.state.categoryArray[j]}</option>);

        return (
            <div >
                <div id="search-issue-tab-Beta">
                    <p id = "search-issue-text">Kategorija</p>
                    <select id = "search-issue-filter"
                        className="form-control"
                        onChange = {this.onChangeTitle}
                    >{options}
                    </select>
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

export default IssueList;
