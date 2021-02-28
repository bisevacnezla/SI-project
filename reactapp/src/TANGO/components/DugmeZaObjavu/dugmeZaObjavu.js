import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {IdUSER} from '../id.js';

class DugmeZaObjavu extends Component {

    handleUnesi = evt => {
        if (!this.MozeBitiUneseno()) {
          evt.preventDefault();
          return;
        }
        const { idTeme, text } = this.props; 
          evt.preventDefault()
        fetch("https://si2019tango.herokuapp.com/addComment", {
          method: 'POST',  
          body: JSON.stringify({
          idUser: '1',
          idTheme: IdUSER,
          text: text,
          timeCreated: Date.now()
        }),  
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));   
      window.location = 'http://localhost:3000/Tango/Komentari/?idTheme='+idTeme;  
     return false;
      };
    
        MozeBitiUneseno() {
        return (
            this.props.text.length > 0
          );
        }

    render() { 
      const idTeme = this.props.idTeme;
        return ( 
            <div>
                {/*<button type="button" class="btn btn-success mt-2" onClick={this.handleUnesi}>Objavi</button>*/}
               
                  <button type="button" class="btn btn-primary mt-2" onClick={this.handleUnesi}>Objavi</button>
                
                
            </div>
         );
    }
}
 
export default DugmeZaObjavu;