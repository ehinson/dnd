import { createActions } from 'redux-actions';

const actions = createActions({
    PLAYER: {
        SET: player => player,

        MODIFIER: {
            SET: modifier => modifier,
        },

        CATEGORY: {
            SET: category => category,
        },

        RACE: {
            SET: race => race,
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

        MAIN_STATS: {
            SET: stats => stats,
        }
    }
})

export default actions.player;