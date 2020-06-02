import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StreamShow from './streams/StreamShow';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import Header from './Header';

const App = () => (
  <div className="ui container">
    <Header />
    <Switch>
      <Route exact path="/" component={StreamList} />
      <Route exact path="/streams/show" component={StreamShow} />
      <Route exact path="/streams/create" component={StreamCreate} />
      <Route exact path="/streams/edit/:id" component={StreamEdit} />
      <Route exact path="/streams/delete/:id" component={StreamDelete} />
    </Switch>
  </div>
);

export default App;
