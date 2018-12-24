export const getMob = state => state.mob || state;

export const getMobAbility = (state, ability) => {
    return getMob(state).getIn([ability, 'score'])
};

export const getMobLevel = state => {
    return getMob(state).getIn(['level', 'currentLevel'])
}

export const getMobAbilityModifier = (state, ability) => {
    return getMainStats(state).getIn([ability, 'modifier'])
};

export const getMainStats = (state) => {
    return getMob(state).get('mainStats');
};

export const getRace = (state) => {
    return getMob(state).getIn(['race', 'name']);
};

export const getProficiencies = (state) => {
    return getMob(state).get('proficiencies');
};

export const getProficiencyBonus = (state) => {
    return getMob(state).getIn(['level', 'proficiencyBonus']);
};

export const getInitiative = (state) => {
    return getMainStats(state).getIn(['dexterity', 'modifier'])
};