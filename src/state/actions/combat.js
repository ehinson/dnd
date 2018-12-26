import { createActions } from 'redux-actions';

const actions = createActions({
    COMBAT: {
        SET: combat => combat,

        RESET: combat => combat,

        ACTIVE: {
            SET: active => active,
        },

        INITIATIVE: {
            SET: init => init,
        },

        LOG: {
            SET: log => log,
        },

        MOBS: {
            SET: mobs => mobs,
            ATTACK: {
                TOGGLE: index => index,
            },
            HEALTH: {
                SET: health => health,
                HEAL: {
                    SET: (heal, index) => (heal, index),
                },
                HARM: {
                    SET: (harm, index) => ({harm, index}),
                },
            },
        },

        PLAYER: {
            SET: player => player,
            ATTACK: {
                TOGGLE: index => index,
            }
        },

        ROUND: {
            SET: round => round,
            NEXT: {
                SET: round => round,
            },
        },
    }
})

export default actions.combat;