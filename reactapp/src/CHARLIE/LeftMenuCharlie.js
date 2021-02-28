import React from 'react';
import { Link } from 'react-router-dom'

class LeftMenuCharlie extends React.Component {
    constructor() {
        super();
        this.state = {
            activeDivId: 0  //open pokazuje da li formu treba prikazati ili ne
            
        }
        this.changeActiveId = this.changeActiveId.bind(this);
       
    };
    
    

    changeActiveId(id){
        this.props.triggerChangeActiveId(id);
    }

    render() {
        return (
            <div>
            {this.props.btnList.map(x=>
               <button
                type="button"
                
                className="btn btn-primary left-buttons"
                onClick={()=>this.changeActiveId(x.changeId)}
                style={{width:"100%"}}
                >
                    {x.naziv}
                </button>
                )}
            </div>
            
        );
   }
};

export default LeftMenuCharlie;