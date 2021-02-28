import React, {Component} from 'react';

class Korisnik extends Component{

    render(){
      const {id,ime,prezime, fotografija}= this.props.korisnik;
    
      var data = fotografija;
      var url = "/Siera/profil/"+id;
      const Example = ({ data }) => <img style={{width:"60px", height:"60px"}} src={`${data}`} alt="nema slike"/>

      return(
        <div className='slika_ime'>
                <Example data={data} />
              <p><a href={`${url}`} >{ime}</a></p>
            </div>
      );
    }
  }
  
export default Korisnik;