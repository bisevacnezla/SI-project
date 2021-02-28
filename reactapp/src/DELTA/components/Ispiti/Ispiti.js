import React, { Component } from 'react';
import axios from 'axios';

class Ispiti extends Component {  
    state = {ispitiObavjestenje:"", ispit:40}

    
    async componentDidMount(){
        //hardkoridana vrijednost dok se ne kreira bekend za listu predmeta
        const idPredmeta=8;
        const idStudent=1;
        
        const {data} = await axios.get('https://si2019delta.herokuapp.com/ispitObavjestenje/'+idPredmeta);
        this.setState({ispitiObavjestenje:data});
        const {data1} = await axios.get('https://si2019delta.herokuapp.com/rezultatiIspita/'+idPredmeta+'/'+idStudent); 
         this.setState({ispit:data1});
      }

    getProgressBarStil = ()=>{
        const stringicIspiti = this.state.ispit+"%";
        var boja = 'red';
        if (this.state.ispit < 20)
            boja = 'red';
        else if (this.state.ispit >= 20 && this.state.ispit < 35)
            boja  = 'yellow';
        else
            boja = 'green';
        return {width: stringicIspiti, background : boja};
    }

    render () {
        

        return(
            <div className="row">
            <div className="col-3">
                <b className="text-left">Ispiti</b>
            </div>
            <div className="col-6">
                <div class="progress" style={{width:250, height:25,  margin:5}} >
                  <div class="progress-bar" role="progressbar" style={this.getProgressBarStil()}  aria-valuenow={this.state.ispit} aria-valuemin="0" aria-valuemax="40">{this.state.ispit}%</div>
                </div>
            </div>
              <div className="col-3">
                
                        <a class="btn btn-primary btn-block" href="/Charlie" role="button">Ispiti</a>
                        <div className="row">
                        <p class="text-danger" style={{padding:"10px"}}>{this.state.ispitiObavjestenje}</p>
                  </div>
                  
              
            </div>
           </div>
        );
    }
}

export default Ispiti;