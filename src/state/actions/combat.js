import { createActions } from 'redux-actions';

const actions = createActions({
    COMBAT: {
        SET: combat => combat,

        RESET: combat => combat,

        ACTIVE: {
            SET: active => active,
        },

        HEALTH: {
            SET: health => health,
            HEAL: {
                SET: heal => heal,
            },
            HARM: {
                SET: harm => harm,
            },
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
            }
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