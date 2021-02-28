import React, { Suspense, Fragment, memo , Component} from "react";
import uuid from 'uuid';
import axios from 'axios';
import './grupeProfesor.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import TabelaGrupa from './tabelaGrupa.js';
import TabelaNesvrstani from './tabelaNesvrstani.js';
import jQuery from 'jquery'; 


class Grupe extends Component {

state = {
    isLoaded:false,    
    grupe:[],
    predmet:undefined,
    nesvrstani:[],
    trenutniRedoslijed:undefined,
    provjerenToken:false
  }

  

  componentDidMount = () =>{
    
    {
      console.log("1111111111111111111111111111");
      fetch('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/getRedoslijed")
      .then(resRedoslijed => resRedoslijed.json())
      .then(jsonRedoslijed => {
        var linkGrupe;
        if(jsonRedoslijed.naziv=="Redoslijed abecede")
          linkGrupe='https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/getGrupeAbeceda/4";
        else
          linkGrupe='https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/getGrupePrijavljivanje/4";

          fetch('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/getPredmet/4")
            .then(resPredmet => resPredmet.json())
            .then(jsonPredmet => {
                fetch('https://cors-anywhere.herokuapp.com/'+"https://si2019uniform.herokuapp.com/getNesvrstaniStudentiNaPredmetu/4")
                 .then(resNesvrstani => resNesvrstani.json())
                 .then(jsonNesvrstani => {
                    fetch(linkGrupe)
                       .then(resGrupe => resGrupe.json())
                       .then(jsonGrupe => {
                     
                        this.setState({
                        isLoaded:true,
                        grupe:jsonGrupe,
                        predmet:jsonPredmet,
                        nesvrstani:jsonNesvrstani,
                        trenutniRedoslijed:jsonRedoslijed
                        })
                 });
                });
            });
        });
    } 
    

        
  }

render = () =>{ 
   
    var spisakGrupe=this.state.grupe;
    var dataPredmet = this.state.predmet;
    var dataStudenti=this.state.nesvrstani;
    if(!spisakGrupe || spisakGrupe==undefined)
  {
    spisakGrupe=[];
  }
  if(!dataPredmet || dataPredmet==undefined)
  {
    dataPredmet={
      naziv: "Projektovanje informacionih sistema"      
    };
  }
  if(!dataStudenti || dataStudenti==undefined)
  {
    dataStudenti=[];
  }
    var idStudent=1;

    var indexGrupeLogovanogStudenta=-1;      
    var nadjenStudent=false;

    var maxKapacitet=0;
    var rendering=[];

    for(var i=0;i<spisakGrupe.length;i++)
    {
        if(!nadjenStudent)
        {
            for(var j=0;j<spisakGrupe[i].studenti.length;j++)
            {
                if(spisakGrupe[i].studenti[j].idStudent==idStudent.toString())
                {
                    indexGrupeLogovanogStudenta = i;
                    nadjenStudent=true;
                    break;    
                }
            }
        }
    }
    datum="";
    var podnaslov="";
    
    if(spisakGrupe.length>0)
    {
        var datum=spisakGrupe[0].rokPrijave.toString();    
        if(datum && datum<danas)
       podnaslov = (<h3 style={podnaslovStyle}>Rok za prijavu grupe je istekao</h3>)
    else
       podnaslov = (<h3 style={podnaslovStyle}>Rok za prijavu grupe je: {datum}</h3>)    
    }
    else
    {
      podnaslov = (<h3 style={podnaslovStyle}>Nema definisanih grupa</h3>);
    }

   
    
    var danas = new Date();    
    var dd = String(danas.getDate()).padStart(2, '0');
    var mm = String(danas.getMonth() + 1).padStart(2, '0'); //Januar je 0!
    var yyyy = danas.getFullYear();
    danas = yyyy + '-' + mm + '-' + dd;

   

       var lockState=false;
        if(datum && datum<danas)
        lockState=true;
  
    for(var i=0;i<spisakGrupe.length;i++)
    {
        

        if(spisakGrupe[i].kapacitet>maxKapacitet)
        maxKapacitet=spisakGrupe[i].kapacitet;
        
        var headTitle="Grupa G"+(i+1)
        + " - " + dani[parseInt(spisakGrupe[i].danUSedmici)-1].title 
        + " "   + spisakGrupe[i].vrijeme 
        + " "   + spisakGrupe[i].kabinet;
        var trenutniRedoslijed = this.state.trenutniRedoslijed;
        if(!trenutniRedoslijed || trenutniRedoslijed==undefined)
        {
          trenutniRedoslijed=[];
        }
        rendering.push(
            <TabelaGrupa trenutniRedoslijed={trenutniRedoslijed} idPredmet={dataPredmet.id} lockState={lockState} redniBroj = {i} kapacitet={maxKapacitet} naziv={headTitle} grupa={spisakGrupe[i]} />
        );
    }

    
    return(
    <div class="p-2">
        <div style={naslovStyle}>
            <h1>{dataPredmet.naziv}</h1>             
        </div>
        <div>
            {podnaslov}
           <div style={divStyle}>
             {rendering}               
           </div>
        </div>
        <div style={naslovStyle}>
            <TabelaNesvrstani lockState={lockState} studenti={dataStudenti}/>                    
        </div>
    </div>     
    )
  }
}

export default React.memo(Grupe);

const divStyle=
{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
}

const datetimeStyle=
{
    justifyContent: "center"
}


const naslovStyle=
{
    textAlign: 'center'
}

const podnaslovStyle=
{
    textAlign: 'center',
    color:'gray'
}

const dani =[
    {
      title:'Ponedjeljak'
    },
    {
      title:'Utorak'
    },
    {
      title:'Srijeda'
    },
    {
      title:'Četvrtak'
    },
    {
      title:'Petak'
    },
    {
      title:'Subota'
    },
    {
      title:'Nedjelja'
    }
  ];

