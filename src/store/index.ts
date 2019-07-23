import { compose, createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [ thunk ];
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);
