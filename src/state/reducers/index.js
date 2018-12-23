import player from './player';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form/immutable';


const dndApp = combineReducers({
    player,
    form: formReducer,
});

export default dndApp