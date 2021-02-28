import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import UnosPrisustva from '../UnosPrisustva/UnosPrisustva';
import UnosOcjene from '../UnosOcjene/UnosOcjene';
import UnosBodova from '../UnosBodova/UnosBodova';
import TemeZavrsnih from '../UnosTeme/TemeZavrsnih';
import StranicaPredmeta from '../StranicaPredmeta/StranicaPredmeta';
import Home from '../Home/Home';
import Ispiti from '../Ispiti/Ispiti';
import Obavijesti from '../Obavijesti/Obavijesti';
import NovaTema from '../UnosTeme/NovaTema';
import IzmjeniTemu from '../UnosTeme/IzmjeniTemu';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/fox" exact component={Home}/>
        <Route path="/fox/stranicaPredmeta" component={StranicaPredmeta}/>
        <Route path="/fox/unosPrisustva" component={UnosPrisustva}/>
        <Route path="/fox/unosBodova" component={UnosBodova}/>
        <Route path="/fox/unosOcjene" component={UnosOcjene}/>
        <Route path="/fox/unosTeme" component={TemeZavrsnih}/>
        <Route path="/fox/obavijesti" component={Obavijesti}/>
        <Route path="/fox/ispiti" component={Ispiti}/>
        <Route path="/fox/novaTema" component={NovaTema}/>
        <Route path="/fox/izmjenaTeme/:id/:naziv/:opis" component={IzmjeniTemu}/>
   
      </Router>
    );
  }
}

export default App;
