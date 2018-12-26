import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';


export const defaultState = fromJS({
    round: 0,
    active: 0,
    initiative: [],
    mobs: [], // add isAlive: true to each mob
    player: {
        isAlive: true,
        isAttacking: false,
    },
    log: [],
  })


export default handleActions({
    COMBAT: {
        SET: (state, { payload: combat }) => state.set('combat', combat),
        RESET: (state) => state.set('combat', defaultState),
        INITIATIVE: {
            SET: (state, { payload: init }) => state.set('initiative', init),
        },
        ACTIVE: {
            SET: (state, { payload: active }) => state.set('active', active),
        },
        MOBS: {
            SET: (state, { payload: mobs }) => state.set('mobs', state.get('mobs').push(mobs.set('isAlive', true).set('isAttacking', false))),
            ATTACK: {
                TOGGLE: (state,{ payload: index }) => state.setIn(['mobs', index, 'isAttacking'], !state.getIn(['mobs', index, 'isAttacking']))
            },
            HEALTH: {
                HEAL: {
                    SET: (state, { payload: heal, index }) => state.setIn(['mobs', index,'health','currentHealth'], fromJS(state.getIn(['mobs', index, 'health', 'currentHealth']) + heal)),
                },
                HARM: {
                    SET: (state, { payload: {harm, index} }) => state.setIn(['mobs', index,'health','currentHealth'], fromJS(state.getIn(['mobs', index, 'health', 'currentHealth']) - harm)),
                }
            },
        },
        PLAYER: {
            SET: (state, { payload: player }) => state.setIn(['player', 'stats'], player),
            ATTACK: {
                TOGGLE: (state,{ payload: index }) => state.setIn(['player','isAttacking'], !state.getIn(['player', 'isAttacking']))
            }
        },
        ROUND: {
            SET: (state, { payload: round }) => state.set('round', round),
            NEXT: {
                SET: (state) => state.set('round', state.get('round') + 1),
            },
        },
        LOG: {
            SET: (state, { payload: log }) => state.set('log', state.get('log').push(log)),
        }
    },
}, defaultState)

