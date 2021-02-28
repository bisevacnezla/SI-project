import React, { Component } from 'react';
class Forum extends Component {  
  
    constructor() {
        super();
      
      }
    OnClick(){
      localStorage.setItem("idTreutnogPredmeta", 1);
    }

    render () {

        return(
            <a class="btn btn-primary m-2" style={{ width : 100}} href="/Tango/Teme" role="button" onclick='OnClick()'   >Forum</a>

        );
    }
}

export default Forum;