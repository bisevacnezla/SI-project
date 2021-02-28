import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./components/Login";
import HomePage from "./components/HomePage";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Route
            path="/romeo/login"
            exact
            component={Login}
          />
          <Route
            path="/romeo/home"
            exact
            component={HomePage}
          />
          <Route path="/romeo" exact component={Login} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
