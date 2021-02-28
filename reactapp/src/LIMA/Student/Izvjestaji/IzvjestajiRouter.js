import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import Home from './components/Home.js' 

import PrisustvoPoPredmetu from "./components/Dijagrami/PrisustvoPoPredmetu";

import GodinaPredmet from "./components/GodinaPredmet/GodinaPredmet";

function IzvjestajiRouter() {
  return (
    <Fragment>
      <Route path="/Lima/izvjestaji/prisustvo" component={PrisustvoPoPredmetu} />
      <Route path="/Lima/izvjestaji/godina=:godinaId&predmet=:predmetId" component={GodinaPredmet} />
      <Route exact path="/Lima/izvjestaji" component={Home} />
    </Fragment>
  );
}

function Paths() {
  return (
    <ul>
      <li>
        <Link to="/Lima/izvjestaji/prisustvo"><div className="btn btn-primary">Dijagram prisustva</div></Link>
      </li>
      <li>
        <Link to="/Lima/izvjestaji/godina=12&predmet=12"><div className="btn btn-primary">Izvjestaj predmeta</div></Link>
      </li>
    </ul>
  );
}

export default IzvjestajiRouter;
