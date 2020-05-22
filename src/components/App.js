import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StreamShow from './streams/StreamShow';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" />
      <Route exact path="/streams/show" component={StreamShow} />
    </Switch>
  </div>
);

export default App;
