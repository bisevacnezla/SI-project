import React, { Component } from 'react'
import axios from 'axios';

export class prisustvoTabela extends Component {
    
    state = {
        prisustvoPredavanja : [{brojSedmice: 1, prisutan: "DA"}, {brojSedmice: 2, prisutan: "NE"}, {brojSedmice: 3, prisutan: "NE"}],
        prisustvoTutorijali : [{brojSedmice: 1, prisutan: "NE"}, {brojSedmice: 2, prisutan: "DA"}]
    };

    componentDidMount(){

        let idPredmeta = this.props.idPredmeta
        let idStudenta = this.props.idStudenta

        axios.get("https://si2019delta.herokuapp.com/prisustvoPredavanja/" + idPredmeta + "/" + idStudenta)
        .then(res => this.setState({prisustvoPredavanja: res.data}))

        axios.get("https://si2019delta.herokuapp.com/prisustvoTutorijala/" + idPredmeta + "/" + idStudenta)
        .then(res => this.setState({prisustvoTutorijali: res.data}))
    }

    dajStilPolja = (p) => {
        let boja = "yellow"
        if (p == "ne")
            boja = "red"
        else if (p == "da")
        boja = "green"
    
        let stil = {backgroundColor:boja, minWidth: 30}
        return stil;
    }

    createTable = (prisustva) => {
        let table = []
        let children = [[],[]]

        children[0].push(<td>Broj sedmice: </td>)
        children[1].push(<td>Prisustvovao/la: </td>)

        for (let i = 0; i < prisustva.length; i++)
        {
            children[0].push(
            <td>
                {prisustva[i].brojSedmice}
            </td>)
            let p = prisustva[i].prisutan;
            if (p == null) p = "null"
            children[1].push(
            <td style = {this.dajStilPolja(p)}>
                {p}
            </td>)    
        }
        table.push(<tr>{children[0]}</tr>)
        table.push(<tr>{children[1]}</tr>)
        
        return table;

    }

    render() {
        return (
            <div>
                Predavanja:
                <table>
                    {this.createTable(this.state.prisustvoPredavanja)}
                </table>
                Tutorijali:
                <table>
                    {this.createTable(this.state.prisustvoTutorijali)}
                </table>
            </div>
        )
    }
}

export default prisustvoTabela

