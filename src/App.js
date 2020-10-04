import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Starred from './pages/Starred';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/starred">
        <Starred />
      </Route>

      {/* undefined route - default */}
      <Route>
        <div>This is 404 Page</div>
      </Route>
    </Switch>
  );
}

export default App;
