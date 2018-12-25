import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router/immutable';

import dndApp from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createBrowserHistory();

const store = createStore(
    dndApp(history),
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
        ),
    ),
)

export default store;