import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StreamShow from './streams/StreamShow';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={StreamList} />
      <Route exact path="/streams/show" component={StreamShow} />
      <Route exact path="/streams/create" component={StreamCreate} />
      <Route exact path="/streams/edit" component={StreamEdit} />
      <Route exact path="/streams/delete" component={StreamDelete} />
    </Switch>
  </div>
);

export default App;
