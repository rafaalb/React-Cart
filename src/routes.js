import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App/index';
import Main from './containers/Main/index';
import ItemPage from './containers/ItemPage/index';
import MyItems from './containers/MyItems/index';
import ErrorPage from './components/ErrorPage/index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="item/:id" component={ItemPage} />
    <Route path="myItems" component={MyItems} />
    <Route path="*" component={ErrorPage} />
  </Route>
);
