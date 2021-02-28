import React, { Fragment, Component } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';

import { generateRandomColor } from '../../static/dummy';
import { Spinner } from 'reactstrap';

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
        xAxes: [],
    },
}

const chart = {
    Pie: Pie,
    Bar: Bar,
    Line: Line,
}

class GrafikStavka extends Component {
    constructor(){
        super();
        this.state = {
            data: null,
            tipGrafika: "Bar"
        };
    }
    componentDidMount(){
        this.generateDataForState();
    }
    generateDataForState(tipGrafika = null){
        let { data, nazivStavke } = this.props;
        if(tipGrafika == null) tipGrafika = this.props.tipGrafika;
        let dataAggregate = {};
        for(let i=0;i<data.length;i++){
            if(data[i] in dataAggregate){
                dataAggregate[data[i]]++;
            } else dataAggregate[data[i]] = 1;
        }
        let dataForState;
        if(tipGrafika != 'Pie'){
            dataForState = {
                labels: [],
                datasets: [{
                    label: nazivStavke!="Ocjena" ? "Bodovi: "+nazivStavke : nazivStavke,
                    backgroundColor: 'rgba(15,145,20,0.2)',
                    borderColor: 'rgba(15,145,20,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,252,82,0.4)',
                    hoverBorderColor: 'rgba(75,252,82,1)',
                    data: []
                }]
            };
        } else {
            dataForState = {
                labels: [],
                datasets: [{
                    label: "Bodovi: "+nazivStavke,
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1,
                    data: []
                }]
            };
        }
        for(var instance in dataAggregate) {
            dataForState.labels.push(instance);
            dataForState.datasets[0].data.push(dataAggregate[instance]);
            if(tipGrafika == "Pie"){
                let color = generateRandomColor();
                let { r, g, b } = color;
                dataForState.datasets[0].backgroundColor.push(`rgba(${r},${g},${b},0.2)`);
                dataForState.datasets[0].borderColor.push(`rgba(${r},${g},${b},1)`);
            }
        }
        this.setState({
            data: dataForState,
            tipGrafika: tipGrafika
        });
    }
    tipGrafikaChange(tipGrafika){
        this.generateDataForState(tipGrafika);
    }
    renderTipGrafikaSelect(){
        return (
            <div className="row d-flex align-items-center mb-2">
                <label className="mx-3 my-0">Tip grafika:</label>
                <select className="form-control col" value={this.state.tipGrafika} onChange={(e)=>{this.tipGrafikaChange(e.target.value)}}>
                    <option value={"Bar"}>Bar</option>
                    <option value={"Pie"}>Pie</option>
                    <option value={"Line"}>Line</option>
                </select>
            </div>
        )
    }
    render(){
        const Chart = chart[this.state.tipGrafika]
        return (this.state.data ? 
            <div className="p-3 w-100">
                {this.renderTipGrafikaSelect()}
                <div className="w-100  d-flex justify-content-center" style={{
                        overflow: 'hidden',
                        position: 'relative',
                        width: '100%',
                        height: '250px'
                    }} >
                    <Chart
                        data={this.state.data}
                        options={ options }
                    />
                </div>
            </div> :
            <Spinner />)
    }
}

export default GrafikStavka;