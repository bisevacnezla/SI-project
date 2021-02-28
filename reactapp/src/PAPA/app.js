import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import Predmet from './komponente/Predmet.js'
import Obavijestenja from './komponente/Obavjestenja';
import Calendar from './komponente/Calendar';
import ProsjekPoGodinamaCard from './komponente/ProsjekPoGodinamaCard';
import PrisustvoPoPredmetuCard from './komponente/PrisustvoPoPredmetuCard';
import ZadacePoPredmetuCard from './komponente/ZadacePoPredmetuCard';
import OcjenePoPredmetuCard from './komponente/OcjenePoPredmetuCard';
import UkupniBrojPoPredmetuCard from './komponente/UkupniBrojPoPredmetuCard';

const ResponsiveGridLayout = WidthProvider(Responsive);

let podatci = [
  {i: 'papa-predmet', x: 0, y: 0, w: 6, h: 12, minH:6, minW:3},
  {i: 'papa-obavjestenja', x: 6, y: 0, w: 6, h: 12, minH:6, minW:3},
  {i: 'papa-calendar', x: 4, y: 12, w: 8, h: 12, minH:12, minW:4, maxH:12},
  {i: 'papa-graf-prosjek', x: 0, y: 12, w: 4, h: 12, minH:11,minW:3},
  {i: 'papa-graf-zadace', x: 4, y: 24, w: 4, h: 15, minH:15,minW:4},
  {i: 'papa-graf-bodovi', x: 8, y: 24, w: 4, h: 15, minH:15,minW:4},
  {i: 'papa-graf-prisustvo', x: 0, y: 24, w: 4, h: 15, minH:15,minW:4}, 
  {i: 'papa-graf-ocjene', x: 0, y: 39, w: 6, h: 15, minH:15,minW:5}
];

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      layouts: {
        lg: podatci,
        md: podatci,
        sm: podatci,
        xs: podatci,
        xxs: podatci,
      }
    }
  }
  render() {
    return (
      <div style={{backgroundColor: "#fff", padding:"0% 5%"}}>
        <ResponsiveGridLayout 
          className="layout" 
          layouts={this.state.layouts}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          rowHeight={30}>
          <div key="papa-predmet"><Predmet/></div>
          <div key="papa-obavjestenja"><Obavijestenja /></div>
          <div key="papa-calendar"><Calendar /></div> 
          <div key="papa-graf-prosjek"><ProsjekPoGodinamaCard /></div>
          <div key="papa-graf-prisustvo"><PrisustvoPoPredmetuCard /></div>
          <div key="papa-graf-zadace"><ZadacePoPredmetuCard /></div>
          <div key="papa-graf-bodovi"><UkupniBrojPoPredmetuCard /></div>
          <div key="papa-graf-ocjene"><OcjenePoPredmetuCard /></div>
        </ResponsiveGridLayout>
      </div>
    );
  }
}

export default App;