import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Potvrda from "./Potvrda.js";
import {standardHeaders} from '../helpers/getStandardHeaders'

class ModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             issueTitle: '',
            issueText: '',
            greska: null,
            brojac: 0,
            fileTooBig: false,
            openAddNewCategoryModal: false,
            procitaoStudent: 0,
            procitalaSS: 1,
            naslovGreska:false

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
      
        event.preventDefault();

        const issueID = this.props.ID;

        const {issueText } = this.state;

        axios.post('https://si2019beta.herokuapp.com/issue/reply/student', { issueID, issueText}, standardHeaders())
        .then(result => {
            if (result.data === "Uspjesan upis!") { { this.setState({ greska: false}); } }
            else{
                { this.setState({ greska: true})}
            }
        })
        .catch(err => {
           
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

    renderujPotvrdu() {
      
         if(this.state.fileTooBig){
            return(
            <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Ne možete poslati fajl veći od 25 MB"
                />
            );
        }
        else if(this.state.fileWrong){
            return(
            <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Ne možete poslati fajl ovog tipa"
                />
            );
        }
        else if (this.state.greska == false ) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="true"
                    msg="Uspješno ste poslali odgovor"
                />
            );
        }
        else if(this.state.greska == false && this.state.draft == true){
            return (
                <Potvrda
                    key={this.brojac}
                    successful="true"
                    msg="Uspješno ste sačuvali upit kao draft!"
                />
            );
        }

           else if (this.state.greska) {
            return (
                <Potvrda
                    key={this.brojac}
                    successful="false"
                    msg="Vaš odgovor nije poslan! Pokušajte ponovo!"
                />
            );
        }
       
        return null;
    }

    deattachFile = () => {
        this.refs.inputFile.value = "";
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            > {this.renderujPotvrdu()}

                <Modal.Header closeButton>

                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.props.naslovModala}
                    </Modal.Title>

                </Modal.Header>

                <form onSubmit={this.handleSubmit}>
                    <Modal.Body>

                        <div className="form-group">
                            <>
                                <label className="col-form-label" for="inputDefault" >Odgovor:</label>
                               

                                <textarea
                                    className="form-control"
                                    name="issueText"
                                    value={this.state.issueText}
                                    onChange={this.handleChange}
                                    rows="10">

                                </textarea>


                                <input
                                    type="file"
                                    className="form-control-file"
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

                            </>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        
                      
                        <button type="submit"
                            id="buttonSend"
                            className="btn btn-primary"
                            disabled={!this.state.issueText || this.state.fileTooBig || this.state.fileWrong}

                        >{this.props.btnPotvrdi}
                        </button>


                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default ModalComponent;
