import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Alpha from './ALPHA/app.js'
import Beta from './BETA/app.js'
import Charlie from './CHARLIE/app.js'
import Delta from './DELTA/app.js'
import Echo from './ECHO/app.js'
import Fox from './FOX/components/App/app.js'
import Golf from './GOLF/app.js'
import Hotel from './HOTEL/app.js'
import India from './INDIA/app.js'
import Juliet from './JULIET/app.js'
import Kilo from './KILO/app.js'
import Lima from './LIMA/app.js'
import Mike from './MIKE/app.js'
import November from './NOVEMBER/app.js'
import Oscar from './OSCAR/app.js'
import Papa from './PAPA/app.js'
import Romeo from './ROMEO/app.js'
import Siera from './SIERA/app.js'
import Tango from './TANGO/app.js'
import Uniform from './UNIFORM/app.js'
import Header from './header'
import Footer from './footer'



class App extends Component {
  render() {
    return (
      <Router>
          <Header />
          <div >
          <Route exact path="/" component={Alpha} />
            <Route path="/alpha" component={Alpha} />
            <Route exact path="/beta" component={Beta} />
            <Route path="/charlie" component={Charlie} />
            <Route path="/delta" component={Delta} />
            <Route path="/echo" component={Echo} />
            <Route path="/fox" component={Fox} />
            <Route path="/golf" component={Golf} />
            <Route path="/hotel" component={Hotel} />
            <Route path="/india" component={India} />
            <Route path="/juliet" component={Juliet} />
            <Route path="/kilo" component={Kilo} />
            <Route path="/lima" component={Lima} />
            <Route path="/mike" component={Mike} />
            <Route path="/november" component={November} />
            <Route path="/oscar" component={Oscar} />
            <Route path="/papa" component={Papa} />
            <Route path="/romeo" component={Romeo} />
            <Route path="/siera" component={Siera} />
            <Route path="/tango" component={Tango} />
            <Route path="/uniform" component={Uniform} />
          </div>
          <Footer/>
      </Router>
    );
  }
}

export default App;
