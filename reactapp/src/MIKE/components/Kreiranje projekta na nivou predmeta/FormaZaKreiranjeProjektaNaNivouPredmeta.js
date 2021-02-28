import React, { Component, Fragment } from 'react';
import { Form, Label } from 'reactstrap';
//import './FormaZaKreiranjeProjektaNaNivouPredmeta.css';
import './bootstrapflatly.css';
import { format } from 'url';

class KreiranjeProjekta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idPredmeta:0,
            predmeti: this.props.predmeti,
            idAsistenta:4,
            opisProjekta: "",
            moguciBodovi: 40
        }
        this.saveProject = this.saveProject.bind(this);
        this.notDone = this.notDone.bind(this);
    }

    kreirajFromu() {
        return (
            <div className="card" style={{height:"100%", width:"100%"}}>
                <div class="card-body">
                <h4 class="card-title" style={{textAlign:"left"}}>Kreiranje novog projekta </h4>
                   <h6 class="card-subtitle mb-2 text-muted" style={{textAlign:"left"}}>Unesite potrebne informacije za projekat na nivou predmeta</h6>
                  <br/>
                <form class="form-style-7" style={{textAlign:"left"}}>
                    <ul>
                        <li>
                            <label class="col-form-label" for="name">Naziv projekta:</label>
                            <input type="text" className="form-control inputText" id="name" maxlength="100" />
                         
                        </li>
                        <li>
                            <label class="col-form-label" for="description">Opis projekta:</label>
                            <textarea id="projectDescription" className="form-control" maxlength="500"></textarea>
                            
                        </li>
                        <li>
                            <label class="col-form-label" for="assistent">Predmet:</label>
                            <div class="select-option">
                                <select className="form-control" id="pickupAssistent" name="pickupAssistent" onChange={() => (
                                    this.odabraniPredmet(document.getElementById("pickupAssistent").selectedIndex)
                                )}>
                                    {
                                        this.state.predmeti.map(predmet => {
                                            return <option class="option" className="list-group-item" >{predmet.naziv}</option>
                                        })
                                    }

                                </select>
                            </div>
                           
                        </li>
                        <li class="points">
                            <label class="col-form-label" >Broj moguće ostvarenih bodova:</label>
                            <input type="number" id="broj" className="form-control" name="count"   />
                        </li>

                        <li class="input-append date form_datetime">
                            <label class="col-form-label" >Rok završetka projekta:</label>
                            <input size="16" type="date" className="form-control inputText"/>
                            <span class="add-on"><i class="icon-th"></i></span>
                            
                        </li>
                        <li>
                            <label class="col-form-label" for="comment">Komentar na projekat:</label>
                            <textarea className="form-control" name="projectComment" maxlength="500"></textarea>
                            
                        </li>
                        <br/>
                        <li>
                            <button type="button" value="Uredu" className="btn btn-primary" style={{float:"right", margin:"10px"}}  onClick={this.saveProject}>Kreiraj</button>
                        </li>
                    </ul>
                </form>
                </div>
            </div>
        );

    }

    render() {
        if(this.state.predmeti.length>0)return (
            <Fragment>
                <Form>
  
                    {this.kreirajFromu()}
                </Form>
            </Fragment>
        );
        else return(
            <div className="alert alert-dismissible alert-danger" style={{width:"100%"}}>
        <strong>Nemate predmete za koje možete kreirati projekat</strong> <br />
      </div>
        )
    }
    notDone() {
        alert("Nije implementirano!");
    }
    saveProject(){
        var ajax=new XMLHttpRequest();
        var komponenta=this;
        var naziv=document.getElementById("name").value;
        var opis=document.getElementById("projectDescription").value;
        var bodovi=document.getElementById("broj").value;
        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status=="200"){
					var tekst=ajax.responseText;
                    if(tekst.length==0) {
                        alert("Prazan json");
                        return;
                    }
					alert("Sve je ok");
				}
				else if(ajax.status!="200"){
				}
		}
	    ajax.open("POST","https://si-mike-2019.herokuapp.com/services/projects/newp",true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.setRequestHeader("Authorization",window.localStorage.getItem("token"));
        ajax.send("naziv_projekta="+naziv + 
        "&id_predmeta="+komponenta.state.idPredmeta+"&id_asistenta="+komponenta.state.idAsistenta+
        "&opis_projekta=" +opis + 
        "&moguci_bodovi="+ bodovi+ "&progress=0&rok_projekta='30.06.2019.'&username="+window.localStorage.getItem("username"));
        alert("Upisano u bazu");
	}

    odabraniPredmet(index) {
        this.setState(state => ({
            idPredmeta: state.predmeti[index].idPredmet,
            predmeti: state.predmeti,
            idAsistenta: state.idAsistenta,
            opisProjekta: state.opisProjekta,
            moguciBodovi: state.moguciBodovi
        }));
    }
}
export default KreiranjeProjekta;