import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import CarParking from "./CarParking";
const Routes = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/car-parking" component={CarParking} />
        </Switch>
      </Router>
    </div>
  );
};
export default Routes;
