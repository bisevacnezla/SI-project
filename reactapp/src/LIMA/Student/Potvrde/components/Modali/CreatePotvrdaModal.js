import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

class CreatePotvrdaModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            svrhaId: null
        }
    }
    changeSvrha(svrhaId){
        this.setState({
            svrhaId: svrhaId
        })
    }
    componentWillReceiveProps(newProps){
        if(newProps.svrhe && newProps.svrhe.length>0){
            this.setState({
                svrhaId: newProps.svrhe[0].id
            })
        }
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>Podnošenje zahtjeva</ModalHeader>
                <ModalBody>
                    Svaka potvrda poslije 5. se plaća. Vi imate pravo na još {this.props.brojPreostalihBesplatnih} besplatnih potvrda.
                    <div className="row d-flex align-items-center mb-2">
                        <label className="col-4">Tip uvjerenja:</label>
                        <select className="form-control col-6 mr-2">
                            <option>potvrda o redovnom studiju</option>
                        </select>
                    </div>
                    <div className="row d-flex align-items-center mb-2">
                        <label className="col-4">Svrha:</label>
                        <select className="form-control col-6 mr-2" value={this.state.svrhaId} onChange={(e)=>{this.changeSvrha(e.target.value)}}>
                            {this.props.svrhe.map((svrha)=>{
                                return <option value={svrha.id}>{svrha.nazivSvrhe}</option>
                            })}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{
                            this.props.confirm(this.state.svrhaId);
                            this.props.toggle();
                        }}>Da</Button>{' '}
                    <Button color="secondary" onClick={()=>{
                            this.props.toggle();
                        }}>Ne</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
export default CreatePotvrdaModal;