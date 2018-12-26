import { createActions } from 'redux-actions';

const actions = createActions({
    PLAYER: {
        SET: player => player,

        NAME: {
            SET: name => name,
        },

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
            SET: prof => prof,
        },

        FEATURES: {
            SET: feature => feature,
        },

        CHOICES: {
            SET: choices => choices,
        },

        INITIATIVE: {
            SET: init => init,
        },

        ARMOR_CLASS: {
            SET: armor => armor,
        },

        MAIN_STATS: {
            SET: stats => stats,
        }
    }
})

export default actions.player;