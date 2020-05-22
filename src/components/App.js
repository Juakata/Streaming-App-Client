import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StreamShow from './streams/StreamShow';
import StreamCreate from './streams/StreamCreate';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" />
      <Route exact path="/streams/show" component={StreamShow} />
      <Route exact path="/streams/create" component={StreamCreate} />
    </Switch>
  </div>
);

export default App;
