import React from 'react';
import axios from 'axios';

class StudentsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      studentsArray: [],
      studentsTitle: ''
    };
  }

  componentDidMount(){
    axios.get('https://si2019beta.herokuapp.com/korisnici/get').then( res => {

      let displayNames = [];
      
      for(let i = 1; i < res.data.length; i++)
      {
          if(res.data[i].username != null)
            displayNames.push(res.data[i].username)
      }
    
      this.setState({studentsArray: displayNames, loading: true, studentsTitle: displayNames[displayNames.length-1]});
    })
  }

  onChangeTitle = (e) => {
    this.setState({studentTitle: e.target.value});
    this.props.triggerGetTitleFromStudentsComponent(e.target.value) 
  };

  render() {
    let options = [];
    for(let j = 0; j < this.state.studentsArray.length; j++)
      options.push(<option key={j}>{this.state.studentsArray[j]}</option>)
    return (
      <select 
        className="custom-select" 
         onChange = {this.onChangeTitle}
      >{options}
      </select>
      
     
    );
  }
}

 
export default StudentsComponent;

