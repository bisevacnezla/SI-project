import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import PregledPotvrde from "../../Student/Potvrde/components/PregledPotvrde/PregledPotvrde";
import Home from './components/Home';

function PotvrdeRouter() {
  return (
    <Fragment>
      <Route path="/Lima/potvrde/id/:potvrdaId" component={PregledPotvrde} />
      <Route exact path="/Lima/potvrde" component={Home} />
    </Fragment>
  );
}

function Paths() {
  return (
    <ul>
      <li>
        <Link to="/Lima/potvrde/id/133">
          <div className="btn btn-primary">Pregled potvrde</div>
        </Link>
      </li>
    </ul>
  );
}

export default PotvrdeRouter;
