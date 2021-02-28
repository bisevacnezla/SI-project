import React, { Component } from 'react';
import Axios from 'axios';
import '../styles/UsersList.css'

class FileSidebar extends Component {
    constructor(props){
        super(props);

        this.state = {
            files: [],
            input:'',
        }

        this.handleItemClick = this.handleItemClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentWillMount(){
        Axios.get('https://si2019juliet.herokuapp.com/files/' + this.props.roomId)
        .then(res => {
            if(res.data === null){
                this.setState({
                    files: new Array(0)
                })
            }
            else{
                this.setState({
                    files: res.data
                })
            }
        }
            
        )
        .catch(err => console.log(err));
    }

    componentDidUpdate(prevProps){

        if(prevProps.roomId !== this.props.roomId){
            Axios.get('https://si2019juliet.herokuapp.com/files/' + this.props.roomId)
            .then(res => {
                if(res.data === null){
                    this.setState({
                        files: new Array(0)
                    })
                }
                else{
                    this.setState({
                        files: res.data
                    })
                }
            }
                
            )
            .catch(err => console.log(err));
        }
    }

    handleItemClick(name){
        this.props.downloadClick(name);
    }
    onChangeHandler(e){
        this.setState({
          input: e.target.value,
        })
    }

    render(){




        //Filter
        const resultFiles = this.state.files.filter(f => this.state.input === '' || f.naziv.toLowerCase().includes(this.state.input.toLowerCase()) || f.posiljaoc.toLowerCase()===this.state.input.toLowerCase() || f.posiljaoc.toLowerCase().includes(this.state.input.toLowerCase()));
        return(
            <div style={{width: '100%', padding: '10px 0'}}>     
                <div className="juliet-section-h" onClick={(e) => {
                        let node = document.getElementById('shared-files')
                        let display = node.style.display;
                        node.style.display = display === "block" ? 'none' : "block";
                        node = document.getElementsByClassName('arrow-files')[0]; 
                        if (node) {
                            let innerHTML = node.innerHTML; 
                            node.innerHTML = innerHTML === "keyboard_arrow_right" ? "keyboard_arrow_down" : "keyboard_arrow_right"
                        }
                   }}>
                    <div className="juliet-section-header"><h5>Podijeljene datoteke</h5></div>
                    <i className="arrow-files" class="material-icons-outlined md-14">keyboard_arrow_right</i>
                </div> 
                <ul style={{overflowX: 'hidden', height:'80%', margin: '0', display: 'none'}} id="shared-files">
                <input className="pretragaFajlovaText" placeholder="Tražite" value={this.state.input} type="text" onChange={this.onChangeHandler.bind(this)} style={fileSearchCSS}/>
                {resultFiles ? 
                        resultFiles.map((file, index) => (
                            <li key={index} className='user' onClick={() => {this.handleItemClick(file.naziv)}}> 
                                { file.posiljaoc + ': ' + file.naziv} 
                            </li>
                        ))
                    :
                    null
                }
                </ul>
                
            </div>
        )
    }
}

const fileSearchCSS ={
    padding:'3px 6px',
    marginBottom:'5px',
    width: '100%',
    height: '35px',
    borderRadius: '5px',
    border: '0.5px solid rgb(0,0,0,0.4)'
};

export default FileSidebar;