import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

class ConfirmationModal extends React.Component {
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>{this.props.poruka}</ModalHeader>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{
                            this.props.confirm();
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
export default ConfirmationModal;