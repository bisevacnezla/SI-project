import React from 'react';
import axios from 'axios';
import {standardHeaders} from '../helpers/getStandardHeaders'

class CategoryComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryArray: [],
      categoryTitle: ''
    };
  }

  componentDidMount(){
    axios.get('https://si2019beta.herokuapp.com/category/get', standardHeaders()).then( res => {

      let displayNames = [];
      
      for(let i = 0; i < res.data.length; i++)
      {
        displayNames.push(res.data[i].naziv)
      }
    
      this.setState({categoryArray: displayNames, loading: true});
    })
  }

  onChangeTitle = (e) => {
    this.setState({categoryTitle: e.target.value});
    this.props.triggerGetTitleFromCategoryComponent(e.target.value) 
  };

  render() {
    let options = [];
    for(let j = 0; j < this.state.categoryArray.length; j++)
      options.push(<option key={j}>{this.state.categoryArray[j]}</option>)
    return (
      <select 
        className="custom-select" 
         onChange = {this.onChangeTitle}
      >{options}
      </select>
      
     
    );
  }
}

 
export default CategoryComponent;

