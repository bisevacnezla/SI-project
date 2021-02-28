import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import IzvjestajiProfesora from './Precice/IzvjestajiProfesora';

class Home extends Component {
    render(){
        return <div className="p-2">
            <IzvjestajiProfesora />
        </div>
    }
}


export default Home;