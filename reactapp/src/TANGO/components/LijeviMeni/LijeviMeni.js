import React from 'react';
import {Link} from 'react-router-dom';

class LijeviMeni extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDivId: 1,  //open pokazuje da li formu treba prikazati ili ne
        };
    };

    changeActiveId = (id) => {
        this.props.triggerChangeActiveId(id)
    }

    render() {
        return (
            <div >
                
                    <button type="button" onClick={()=>{window.parent.location = '/Tango/Teme';}} className="btn btn-primary left-buttons" >Teme</button>

                
                    <button type="button" onClick={()=>{window.parent.location = '/Tango/NovaTema';}} className="btn btn-primary left-buttons" >Nova Tema</button>


            </div>
        );
   }
};

export default LijeviMeni;