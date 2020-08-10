import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Register from "./components/view/Register";

function App() {
  return (
    <main>
      <Switch>
        <Redirect exact from="/" to="/register">
          <Register />
        </Redirect>
        <Route to="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
