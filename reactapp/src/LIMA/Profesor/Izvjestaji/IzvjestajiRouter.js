import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import Home from './components/Home.js' 

import GodinaPredmet from "./components/GodinaPredmet/GodinaPredmet";

function IzvjestajiRouter() {
  return (
    <Fragment>
      <Route path="/Lima/izvjestaji/godina=:godinaId&predmet=:predmetId&tabelarno=:daLiJeTabelarno" component={GodinaPredmet} />
      <Route exact path="/Lima/izvjestaji" component={Home} />
    </Fragment>
  );
}

function Paths() {
  return (
    <ul>
      <li>
        <Link to="/Lima/izvjestaji/godina=11&predmet=102&tabelarno=true"><div className="btn btn-primary">Izvjestaj predmeta</div></Link>
      </li>
    </ul>
  );
}

export default IzvjestajiRouter;
