import React, { Component } from 'react';

import Precice from './Precice/Precice.js'
import TrenutnaGodina from './Precice/TrenutnaGodina.js';
import LicniIzvjestaj from './LicniIzvjestaj/LicniIzvjestaj.js';

class Home extends Component {
    render(){
        return <div className="p-2">
            <LicniIzvjestaj />
            <TrenutnaGodina />
            <Precice />
        </div>
    }
}


export default Home;