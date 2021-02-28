import React from 'react';
import ModalComponent from './NoviIssueModal.js';

class LeftMenuStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDivId: 1,
            showModal: false,

        };
    };

    changeActiveId(id){
        this.props.triggerChangeActiveId(id)
    }

    render() {
        return (
            <div >
                  <button 
                  type="button"
                  className="btn btn-primary left-buttons"
                  id="createNewIssue"
                  onClick={() => this.setState({ modalShow: true })} >
                  Kreiraj novi upit
              </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons" 
                    id = "moj"
                    onClick = {()=>this.changeActiveId(1)}>Prati upite
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(2)}>Draftovi
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(3)}>Arhiva
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(4)}>Često postavljani upiti
                </button>
    
                <ModalComponent
                    
                    show={this.state.modalShow}
                    naslovModala="Pošalji novi upit"
                    btnPotvrdi="Pošalji upit"
                    onHide={() => this.setState({modalShow: false})}
                    
                    

                />
            </div>
            
        );
   }
};

export default LeftMenuStudent;