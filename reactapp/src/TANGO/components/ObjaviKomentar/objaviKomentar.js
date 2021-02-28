import React, {Component} from 'react';
import DugmeZaObjavu from '../DugmeZaObjavu';



class ObjaviKomentar extends Component {

    constructor() {
        super();
        this.state = {
          komentar: ""
         
        };
      }
    
      handleOdgovorChange = evt => {
        this.setState({
          komentar: evt.target.value
        });
      }

    render() {
      const id = this.props.id;
      const nazivTeme = this.props.nazivTeme;
        return(
          <div class="row">
          <div class="col"></div>
          <div class="col">
              <div class="card border-info mb-3">                   
                  <div class="card-body"   style={{ width:  "793px" }}>
                    <h4 class="card-title">Komentar </h4>
                    <h6 class="card-subtitle mb-2 text-muted"> {nazivTeme} </h6>
                    <div class="form-group">
                    <textarea class="form-control" onChange={this.handleOdgovorChange}></textarea>
                    <div class="d-flex flex-row-reverse">
                      <DugmeZaObjavu idTeme={id} text={this.state.komentar}/>
                    </div>
                    </div>
                </div>
              </div>
          </div>
          <div class="col"></div>
      </div>
           
        );
    }
}
 
export default ObjaviKomentar;