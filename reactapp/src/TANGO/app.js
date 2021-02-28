import React, { Component } from 'react';
import {BrowserRouter, Route, Router} from 'react-router-dom';
import './App.css';
import '../bootstrapflatly.css';

import NovaTema from './components/NovaTema/novaTema';
import LijeviMeni from './components/LijeviMeni';
import Lista from './components/ListaTema'
import ListaKomentara from './components/ListaKomentara';
import ObjaviKomentar from './components/ObjaviKomentar';


class App extends Component {
  render() {
    return (
    
      <div className='App'>
        <div id='naslovTango'>
                <h3 id='tekstNaslova'>Forum!</h3>
              </div>
          <div id="glavniTango">
              <div id="lijeviTango">
                <LijeviMeni/>
              </div>

              <div id="desniTango">
                <BrowserRouter>
                  <Route path='/Tango/Teme' exact component={Lista}/>
                  <Route path='/Tango/NovaTema' exact component={NovaTema}/>
                  <Route path='/Tango/Komentari' exact component={ListaKomentara}/>
                  <Route path='/Tango/Komentar' exact component={ObjaviKomentar}/>
                </BrowserRouter>
              </div>
          </div>
      </div>
   
    );
  }
}

export default App;
