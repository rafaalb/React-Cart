import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Router, browserHistory } from 'react-router';
import configureStore from './store/configureStore';

import routes from './routes';

import './styles/global.sass';
import './favicon.ico';

const { store, persistor } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={browserHistory} routes={routes} />
     </PersistGate>
  </Provider>
  , document.getElementById('app'));
