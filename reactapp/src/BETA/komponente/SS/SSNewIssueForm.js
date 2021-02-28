import React from 'react';
import Modal from 'react-responsive-modal'; //paket za gotove modale odnosno popup-e
import CategoryComponent from './SSCategoryComponent.js';
import axios from 'axios'
import AddNewCategoryForm from './AddNewCategoryForm.js';
import {standardHeaders} from '../helpers/getStandardHeaders';

class NoviIssueForma extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            issueTitle: '',
            issueText: '',
            fileTooBig: false,
            openAddNewCategoryModal: false,
            procitaoStudent: 0,
            procitalaSS: 1,
        }
    }

    onCloseAddNewCategoryModal = (value) => {
        this.setState({
            openAddNewCategoryModal: false,
        })
    }

    onButtonCloseClicked = () => {
        this.props.triggerOnCloseModal2('false') 
    }
 
    onSubmit = (e) => {

        //PROVJERITI DA LI JE NASLOV JEDNAK 'Add new title...'
        //AKO JESTE, NE SLATI ISSUE NEGO POSLATI OBAVIJEST DA SE PROMIJENI
        if(this.state.issueTitle == 'Add new title...')
        {
            alert("Wrong title!");
        }
        else{
            e.preventDefault();
            // get our form data out of state
            const { issueTitle, issueText } = this.state;

            axios.post('https://si2019beta.herokuapp.com/issue/send/ss?issueTitle='+issueTitle+'&issueText='+issueText, standardHeaders())
            .then((result) => {
                alert(result.data); //Ovdje treba pokupiti odgovor od backend-a, ali ne znam kako !!!!!
            });
        }
    }

    onChangeIssueText = (object) => {
        this.setState({[object.target.name]: object.target.value})
    };

    onChangeTitleInCategoryComponent = (title) => {
        this.setState({
            issueTitle: title
        })
        if(title == 'Add new title...')
        {
          //otvori formu za dodavanje novog naslova/kategorije
          this.setState({openAddNewCategoryModal: true})
          
        }

    };

    fileChangedHandler = (event) => {
        if(event.target.files[0] == null){
            this.setState({fileTooBig : false});
        }
        else{
            if(event.target.files[0].size/1024/1024 > 25){
                this.setState({fileTooBig : true});
                alert("Ne možete poslati fajl veći od 25 MB");
            }
            else{
                this.setState({fileTooBig : false});
            }
        }
        //let file_name = event.target.files[0].name;
        };

        saveAsDraft = () => {
            
            const {issueTitle, issueText, procitaoStudent, procitalaSS} = this.state;
    
                axios.post('https://si2019beta.herokuapp.com/issues/draft/add/ss', { issueTitle, issueText, procitaoStudent, procitalaSS}, standardHeaders())
                .then((result) => {if (result.data === "Successfully saved issue as draft!") { { this.setState({ greska: false,draft: true }); } }
                else{
                    { this.setState({ greska: true})}
                    alert(JSON.stringify(result.data));
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ greska: true });
            });
         }
    
         fileChangedHandler = (event) => {
            if(event.target.files[0] == null){
                this.setState({fileTooBig : false});
                this.setState({fileWrong : false});
            }
            else{
                if(event.target.files[0].size/1024/1024 > 25){
                    this.setState({fileTooBig : true});
                }
                else{
                    this.setState({fileTooBig : false});
                }
                
                this.setState({fileWrong : true});
                for(var i=0;i<this.state.allowedFiles.length;i++)
                    if(event.target.files[0].type == this.state.allowedFiles[i]){
                        this.setState({fileWrong : false});
                        break;
                    }
            }
            //let file_name = event.target.files[0].name;
            };
    

        deattachFile = () => {
            this.refs.inputFileSS.value = "";
        }

    render() {
        return (

            <div  >
                <form 
                    id = "formNoviIssue" 
                    onSubmit={this.handleSubmit}
                    style={{display : this.state.openAddNewCategoryModal ? 'none' : 'inherit'}}
                >

                    <div id=" naslovDiv">

                        <label 
                            id="naslov"
                            style={{
                            marginLeft: '12px', 
                            marginTop: '16px'
                            }}
                        >Naslov:
                        </label>

                        <CategoryComponent triggerGetTitleFromCategoryComponent = {this.onChangeTitleInCategoryComponent}
                        />

                        <button  type = "close" id = "closeIssueForm">X</button>

                    </div>

                    <div 
                        className="form-group row col-12" 
                        style={{
                            marginTop: '5px', 
                            marginLeft: '2px'
                        }}
                    >
                        <textarea
                            className="form-control"
                            id="exampleTextarea"
                            rows="10"
                            name="issueText"
                            value={this.state.issueText}
                            onChange={this.onChangeIssueText}
                        />
                    </div>

                    <div className="form-group row col-12">

                        <div className="custom-file col-8">
                            <input 
                                type="file" 
                                className="form-control-file class1" 
                                id="exampleInputFile"
                                aria-describedby="fileHelp"
                                onChange={this.fileChangedHandler}
                                ref="inputFileSS"
                            />

                            <button
                                className=""
                                type="button"
                                onClick={this.deattachFile} 
                                style = {{marginTop:10}}
                            > Ukloni priloženi fajl
                            </button>
                        </div>

                        <button 
                            id = "buttonDraft"
                            className="btn btn-primary class1"
                            onClick={this.saveAsDraft}
                            disabled={!this.state.issueText || this.state.fileTooBig || this.state.fileWrong}
                        >Sačuvaj kao draft
                        </button>

                        <button
                            id = "buttonSend"
                            type="submit"
                            className="btn btn-primary class1"
                            disabled={!this.state.issueText || this.state.fileTooBig}
                            onClick={this.onSubmit}
                        >Pošalji upit
                        </button>
                        
                    </div>
                </form>

                <div
                    id = "addNewTitleDiv"
                    style={{display : this.state.openAddNewCategoryModal ? 'inherit' : 'none'}}
                >   
                    <AddNewCategoryForm triggerCloseModal = {this.onCloseAddNewCategoryModal}/>
                </div>
               
            </div>
        );
    }
}

export default NoviIssueForma;



