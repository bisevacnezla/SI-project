import React from 'react';
import AddNewCategoryModal from './AddNewCategoryModal.js'
import ModalComponent from './SSNewIssueModal.js';

class LeftMenuSS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDivId: 1,
            showNoviIssue: false,
            modalShowSS:false,
            modalShowAddCategory: false
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
                  onClick={() => this.setState({ modalShowSS: true })} >
                 >
                  Kreiraj novi upit
              </button>
              <button 
                  type="button"
                  className="btn btn-primary left-buttons"
                  id="createNewIssue"
                  onClick={() => this.setState({ modalShowAddCategory: true })} >
                  Dodaj novu kategoriju
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
    
              
                 <AddNewCategoryModal
                    show={this.state.modalShowAddCategory}
                    naslovModala="Dodaj novu kategoriju"
                    btnPotvrdi="Dodaj kategoriju"
                    onHide={() => this.setState({modalShowAddCategory: false})}
                />
                <ModalComponent
                    show={this.state.modalShowSS}
                    naslovModala="Pošalji novi upit"
                    btnPotvrdi="Pošalji upit"
                    onHide={() => this.setState({modalShowSS: false})}
                />
            </div>
            
        );
   }
};

export default LeftMenuSS;