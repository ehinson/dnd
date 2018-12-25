import { createActions } from 'redux-actions';

const actions = createActions({
    MOB: {
        SET: mob => mob,

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
    }
})

export default actions.mob;