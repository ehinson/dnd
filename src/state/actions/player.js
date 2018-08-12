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

        PROFICIENCIES: {
            SET: prof => prof
        },

        MAIN_STATS: {
            SET: stats => stats,
        }
    }
})

export default actions.player;