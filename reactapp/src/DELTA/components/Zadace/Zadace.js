

import React, { Component } from 'react';
import axios from 'axios';
import { object } from 'prop-types';
class Zadace extends Component {  

    state = {zadaca:"", zadaceObavjestenje: ""}

    async componentDidMount(){
        //hardkodirane vrijednosti
         const idzadaca=3;
         const idStudent=3;
         const idPredmeta=3;
         const {data} = await axios.get('https://si2019kilo.herokuapp.com/bodoviZadace/'+idStudent+'/'+idzadaca); 
         this.setState({zadaca:data});
         const {data1} = await axios.get('https://si2019delta.herokuapp.com/zadacaObavjestenje/'+idPredmeta);
        this.setState({zadaceObavjestenje:data1});
    }

    getProgressBarStil = ()=>{
        const stringicZadace = this.state.zadaca+"%";
        var boja = 'red';
        if (this.state.zadaca < 40)
            boja = 'red';
        else if (this.state.zadaca >= 40 && this.state.zadaca < 70)
            boja  = 'yellow';
        else
            boja = 'green';
        return {width: stringicZadace, background : boja};
    }

    render () {
        

        return(
            <div className="row">
            <div className="col-3">
                <b>Zadaće i projekti</b>
            </div>
            <div className="col-6">
                <div class="progress"  style={{width:250, height:25,  margin:5}}>
                  <div class="progress-bar" role="progressbar" style={this.getProgressBarStil()}  aria-valuenow={this.state.zadaca} aria-valuemin="0" aria-valuemax="100">{this.state.zadaca}%</div>
                </div>
            </div>
              <div className="col-3">
              <a class="btn btn-primary btn-block" href="https://si2019frontend.herokuapp.com/KILO/student?idPredmeta=1&idStudenta=1&fbclid=IwAR3JhxrygHTZF3BlR1wU_6KEFJX8knLRQxccaf8jYcGtLLQBP2Tb5Gbf2wo" role="button">Zadaće</a>
              <div className="row">
                        <p class="text-danger" style={{padding:"10px"}}>{this.state.zadaceObavjestenje}</p>
                  </div>
            </div>
           </div>
        );
    }
}

export default Zadace;



