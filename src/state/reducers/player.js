import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import * as p from '../selectors/player';
import { setAbilityModifier, calculateHealth } from '../../utils/playerUtils';

export const defaultState = fromJS({
    name: '',
    race: {
        name: "human",
    },
    category: {
        name: "fighter",
    },
    level: {
        currentLevel: 1,
        proficiencyBonus: 2,
    },
    health: {
        currentHealth: 8,
        maxHealth: 8,
    },
    proficiencies: [],
    armor_class: 10,
    features: [],
    actions: [],
    choices: {},// organize by level?
    mainStats: {
        strength: {
            score: 10,
            modifier: 0,
        },
        dexterity: {
            score: 10,
            modifier: 0,
        },
        constitution: {
            score: 10,
            modifier: 0,
        },
        intelligence: {
            score: 10,
            modifier: 0,
        },
        wisdom: {
            score: 10,
            modifier: 0,
        },
        charisma: {
            score: 10,
            modifier: 0,
        },
    }
  })


export default handleActions({
    PLAYER: {
        SET: (state, { payload: player }) => state.mergeDeep(fromJS(player)),
        NAME: {
            SET: (state, { payload: name }) => state.set('name', name),
        },
        MODIFIER: {
            SET: (state, { payload: modifier }) => state.set('modifier', fromJS(modifier)),
        },
        RACE: {
            SET: (state, { payload: race }) => state.set('race', fromJS(race)),
        },
        CATEGORY: {
            SET: (state, { payload: category }) => state.set('category', fromJS(category)),
        },
        HEALTH: {
            SET: (state, { payload: category }) => state.set('health', fromJS(calculateHealth(category, p.getPlayerAbilityModifier(state, 'constitution'), p.getPlayerLevel(state)))),
            HEAL: {
                SET: (state, { payload: heal }) => state.setIn(['health','currentHealth'], fromJS(state.getIn(['health', 'currentHealth']) + heal)),
            },
            HARM: {
                SET: (state, { payload: harm }) => state.setIn(['health','currentHealth'], fromJS(state.getIn(['health', 'currentHealth']) - harm)),
            }
        },
        INITIATIVE: {
            SET: (state) => state.set('initiative', p.getPlayerAbilityModifier(state, 'dexterity')),
        },
        ARMOR_CLASS: {
            SET: (state) => state.set('armor_class', (p.getPlayerAbilityModifier(state, 'dexterity') + 10)),
        },
        PROFICIENCIES: {
            SET: (state, { payload: prof }) => state.mergeIn('proficiencies', fromJS(prof)),
        },
        FEATURES: {
            SET: (state, { payload: feature }) => {
                const featureList = state.get('features')
                return state.set('features', featureList.concat(fromJS(feature)))
            },
        },
        CHOICES: {
            SET: (state, { payload: choices }) => {
                const choiceList = state.getIn(['choices', `level_${p.getPlayerLevel(state)}`])
                if(!choiceList) {
                    return state.setIn(['choices', `level_${p.getPlayerLevel(state)}`], fromJS(choices))
                }
                return state.mergeIn(['choices', `level_${p.getPlayerLevel(state)}`], fromJS(choices))
            },
        },
        MAIN_STATS: {
            SET: (state, { payload: stats }) => state.set('mainStats', fromJS(setAbilityModifier(stats, state))),
        }
    },
}, defaultState)

