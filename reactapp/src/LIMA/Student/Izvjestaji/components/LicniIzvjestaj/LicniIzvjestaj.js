import React, { Component, Fragment } from 'react';
import ProsjekPoGodinama from '../Dijagrami/ProsjekPoGodinama';
import { Collapse } from 'reactstrap';

class LicniIzvjestaj extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapseOpened: false
        }
    }
    render(){
        return (
            <div className="mb-2">
                <h4 className="card-header btn-light border" style={{borderColor: '#dddddd', color: '#18bc9c', cursor: 'pointer'}} onClick={()=>{
                        this.setState({collapseOpened: !this.state.collapseOpened})
                    }}>
                    {"Prosjek po godinama"}
                </h4>
                <Collapse isOpen={this.state.collapseOpened}>
                        <div className="card-body border pt-0" style={{borderColor: '#aaa'}}>
                            <ProsjekPoGodinama />
                        </div>
                </Collapse>
            </div>
        )
    }
}

export default LicniIzvjestaj;