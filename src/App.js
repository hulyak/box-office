import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Show from './pages/Show';
import Starred from './pages/Starred';
import { ThemeProvider } from 'styled-components';

// global theme
const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/starred">
          <Starred />
        </Route>

        <Route exact path="/show/:id">
          <Show />
        </Route>
        {/* undefined route - default */}
        <Route>
          <div>This is 404 Page</div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
