import Modal from "react-bootstrap/Modal";
import React, { Component } from 'react';
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import data_1 from "./ChangeLog/version_1.0.0";
import data_2 from "./ChangeLog/version_1.0.1";
import data_3 from "./ChangeLog/version_1.0.2";

let data = null;
class ModalChangeLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalShow: false,
    }
  }
  show() {
    this.setState({
        modalShow: true,
    })
  }
  hide() {
    this.setState({
        modalShow: false,
    })
  }
  render() {
    data = [{
        verzija: "v1.0.0.",
        body: data_1
      }, {
        verzija: "v1.0.1.",
        body: data_2
      },{
        verzija:"v1.0.2.",
        body: data_3
      }];
    return <Modal
    {...this.props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={this.state.modalShow}
    onHide={()=>{this.setState({modalShow:false})}}
  >
    <ModalHeader closeButton style={{backgroundColor:"#2C3D4F", color:"white"}}>
      <ModalTitle id="contained-modal-title-vcenter" >ChangeLog</ModalTitle>
    </ModalHeader>
    <ModalBody style={{ maxHeight: "600px", overflowY: "scroll" }}>
      {data.map(x =>
        <>
          <ModalHeader >
            <ModalTitle id="contained-modal-title-vcenter">{x.verzija}</ModalTitle>
          </ModalHeader>

          <ModalBody style={{ maxHeight: "300px", overflowY: "scroll" }}>
            {x.body.map(grupa =>
              <div className="form-group">
                <div className="col-form-label col-form-label-lg">{grupa.grupa}</div>

                <div className="col-form-label">
                  {grupa.opis.map(opis =>
                    <>
                      {opis}
                      <br></br>
                    </>
                  )}
                </div>
              </div>
            )}


          </ModalBody>
          <br></br>
        </>
      )}

    </ModalBody>
    </Modal>
  }
}

export default ModalChangeLog