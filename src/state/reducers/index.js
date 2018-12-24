import player from './player';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';


const dndApp = (history) => combineReducers({
    player,
    form: formReducer,
    router: connectRouter(history),
});

export default dndApp