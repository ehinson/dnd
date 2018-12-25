import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import * as m from '../selectors/mob';

export const defaultState = fromJS({
    name: '',
    armorClass: 0,
    challenge: 0,
    proficiencies: [],
    alignment: '',
    mainStats: {
        strength: {
            score: 0,
            modifier: 0,
            save: 0,
        },
        dexterity: {
            score: 0,
            modifier: 0,
            save: 0,
        },
        constitution: {
            score: 0,
            modifier: 0,
            save: 0,
        },
        intelligence: {
            score: 0,
            modifier: 0,
            save: 0,
        },
        wisdom: {
            score: 0,
            modifier: 0,
            save: 0,
        },
        charisma: {
            score: 0,
            modifier: 0,
            save: 0,
        },
    },
    health: {
        currentHealth: 0,
        maxHealth: 0,
    },
    initiative: 0,
  })


// calculate modifiers and add them to the object
export default handleActions({
    MOB: {
        SET: (state, { payload: mob }) => state.mergeDeep(fromJS(mob)),
        HEALTH: {
            HEAL: {
                SET: (state, { payload: heal }) => state.setIn(['health','currentHealth'], fromJS(state.getIn(['health', 'currentHealth']) + heal)),
            },
            HARM: {
                SET: (state, { payload: harm }) => state.setIn(['health','currentHealth'], fromJS(state.getIn(['health', 'currentHealth']) - harm)),
            }
        },
        INITIATIVE: {
            SET: (state, { payload: init }) => state.set('initiative', init),
        },
    },
}, defaultState)

