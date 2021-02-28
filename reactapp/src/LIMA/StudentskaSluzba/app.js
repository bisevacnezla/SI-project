import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";
import PotvrdeRouter from './Potvrde/PotvrdeRouter.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.css';

function App() {
  return (
    <div className="row m-0">
      <ToastContainer />
      {Paths()}
      <div className="col-12 col-md-9 p-2">
        <Route path="/Lima/potvrde" component={PotvrdeRouter}/>
      </div>
    </div>
  );
}

function Paths() {
  return (
    <div style={{
        backgroundColor: "#2C3E50",
        minHeight: "calc(100vh - 78px)"
      }} className="col-12 col-md-3 p-0">
      <div>
        <Link to="/Lima/potvrde"><button className="btn btn-primary left-buttons">Potvrde</button></Link>
      </div>
    </div>
  );
}

export default App;