import React from "react";
import { Route, IndexRoute } from "react-router";

import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

export default (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="*" component={NotFound} />
  </Route>
)
