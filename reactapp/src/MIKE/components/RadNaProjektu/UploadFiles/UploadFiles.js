import React, { Component, Fragment } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import 'filepond/dist/filepond.min.css';
import './komponenta.css';

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      idZadatka: props.idZadatka,
      fajlovi : []
    };
  }

  render() {
    let detalji = <div id="detalji"></div>
    if(this.state.fajlovi.length > 0)
      detalji = (<div id="detalji">
        <label className="col-form-label col-form-label-lg" >Fajlovi za upload: </label>
      { this.state.fajlovi != null ? this.state.fajlovi.map((fajl) => { return (<Fragment><label className="col-form-label col-form-label-lg" >{fajl.name}</label><br/></Fragment>)}) : null }
      </div>);

    return (
        <div >
          <label className="col-form-label col-form-label-lg" >Odaberite projektne fajlove za upload: </label>
            <div >
              <Form method="post" action="https://si-mike-2019.herokuapp.com/api/work/addfile" enctype="multipart/Form-data">
                <FormGroup>

                  <Input name="idProjektnogZadatka" type="hidden" value={this.state.idZadatka}></Input>

                  <br/>

                  <Input id="filesToUpload" name="fajlovi" type="file" onChange={this.handleChange.bind(this)} required multiple />
                  
                  <br/><br/>

                  <Input type="submit" value="Upload" />

                </FormGroup>
              </Form>
            </div>
            <br/><br/>
            {detalji}
        </div>
    );
  }

  handleChange(event) {
    this.setState({ fajlovi : [...event.target.files] })
    console.log(event.target.files);
  }
}

export default UploadFiles;