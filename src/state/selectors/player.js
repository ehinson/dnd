import { createSelector } from 'reselect';

export const getPlayer = state => state.get('player') || state;

export const getPlayerAbility = (state, ability) => {
    return getPlayer(state).getIn([ability, 'score'])
};

export const getPlayerAbilityModifier = createSelector(
    getPlayerAbility,
    (strength) => getAbilityModifier(strength)
);

function getAbilityModifier(ability){
    const score = Math.floor(Number(ability)/2) - 5
    return score;
}

export const getMainStats = (state) => {
    return getPlayer(state).get('mainStats');
};

export const getRace = (state) => {
    return getPlayer(state).getIn(['race', 'name']);
};

export const getProficiencies = (state) => {
    return getPlayer(state).get('proficiencies');
};

export const getProficiencyBonus = (state) => {
    return getPlayer(state).getIn(['level', 'proficiencyBonus']);
};