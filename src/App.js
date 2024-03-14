import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import User from "./pages/User";
import Error from "./pages/Error";
import Match from "./pages/Match";
import Players from "./pages/Players";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/user/:region/:username" exact component={User} />
        <Route path="/match/:region/:matchID" exact component={Match} />
        <Route path="/players" exact component={Players} />
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
