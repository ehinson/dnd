import player from './player';
import mob from './mob';
// TODO: combat reducer , npc reducer(relationships, level, abilities), and app reducer(rooms visited, etc)?
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router/immutable';
import { reducer as formReducer } from 'redux-form/immutable';


const dndApp = (history) => combineReducers({
    player,
    mob,
    form: formReducer,
    router: connectRouter(history),
});

export default dndApp