import React from 'react';

class LeftMenuStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDivId: 1,  //open pokazuje da li formu treba prikazati ili ne
        };
    };

    changeActiveId(id){
        this.props.triggerChangeActiveId(id)
    }

    render() {
        return (
            <div >
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons" 
                    id = "moj"
                    onClick = {()=>this.changeActiveId(1)}
                    style={{width:"100%"}}>Raspored studenta
                </button>               
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons" 
                    id = "moj"
                    onClick = {()=>this.changeActiveId(2)}
                    style={{width:"100%"}}>Raspored profesora
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(3)}
                    style={{width:"100%"}}>Raspored sale za studenta
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(4)}
                    style={{width:"100%"}}>Raspored sale za profesora
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(5)}
                    style={{width:"100%"}}>Grupe za studenta
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary left-buttons"
                    onClick = {()=>this.changeActiveId(6)}
                    style={{width:"100%"}}>Grupe za profesora
                </button>    
            </div>
        );
   }
};

export default LeftMenuStudent;
