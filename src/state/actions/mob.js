import { createActions } from 'redux-actions';

const actions = createActions({
    MOB: {
        SET: player => player,

        NAME: {
            SET: name => name,
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

        PROFICIENCIES: {
            SET: prof => prof
        },

        INITIATIVE: {
            SET: init => init,
        },
    }
})

export default actions.mob;