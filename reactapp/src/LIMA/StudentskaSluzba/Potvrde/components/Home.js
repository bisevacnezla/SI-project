import React, { Component } from 'react';

import PregledZahtjeva from './PregledZahtjeva/PregledZahtjeva';

class Home extends Component {
    render(){
        return (
            <div className="p-2">
                <PregledZahtjeva />
            </div>
        )
    }
}

export default Home;