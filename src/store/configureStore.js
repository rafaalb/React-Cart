import {createStore, compose, applyMiddleware} from 'redux' 
import { persistStore, persistReducer } from 'redux-persist' 
import storage from 'redux-persist/lib/storage' 
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant' 
import thunk from 'redux-thunk' 
import rootReducer from '../reducers' 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
} 

function configureStoreProd(initialState) {
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
  ] 

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  ) 
}

function configureStoreDev(initialState) {
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
  ] 

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  // add support for Redux dev tools
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  ) 
  const persistor = persistStore(store) 
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default  // eslint-disable-line global-require
      store.replaceReducer(nextReducer) 
    }) 
  }

  return { store, persistor } 
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev 

export default configureStore 
