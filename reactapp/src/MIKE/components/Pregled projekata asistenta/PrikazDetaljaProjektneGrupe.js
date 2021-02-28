import React from "react";

class DetaljiProjektneGrupe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          clanovi:[{"ime":"Mirza","prezime":"Delibasic"},{"ime":"Lamija","prezime":"Alagic"}]
        };
      }
    render() {
       
        return (
          <div>
                <label className="col-form-label col-form-label-lg">Naziv grupe:</label>
                <br/>
                <label className="control-label">Alpha</label>
                <br/>
                <label className="col-form-label col-form-label-lg">Broj kreiranih zadataka:</label>
                <br/>
                <label className="control-label">4</label>
                <br/>
                <label className="col-form-label col-form-label-lg">Članovi:</label>
                <br/>
					    <div className="list-group">
              {
                this.state.clanovi.map(student=>{
                  return (<a href="#" className="list-group-item list-group-item-action">{student.ime} {student.prezime}</a>)
                })
              }
              </div>
            </div>
        );
      }

}
export default DetaljiProjektneGrupe;