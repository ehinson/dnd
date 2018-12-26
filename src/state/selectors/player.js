export const getPlayer = state => state.player || state;

export const getPlayerAbility = (state, ability) => {
    return getPlayer(state).getIn([ability, 'score'])
};

export const getPlayerLevel = state => {
    return getPlayer(state).getIn(['level', 'currentLevel'])
}

export const getPlayerAbilityModifier = (state, ability) => {
    return getMainStats(state).getIn([ability, 'modifier'])
};

export const getMainStats = (state) => {
    return getPlayer(state).get('mainStats');
};

export const getRace = (state) => {
    return getPlayer(state).getIn(['race', 'name']);
};

export const getCategory = (state) => {
    return getPlayer(state).getIn(['category', 'name']);
};

export const getProficiencies = (state) => {
    return getPlayer(state).get('proficiencies');
};

export const getName = (state) => {
    return getPlayer(state).get('name');
};

export const getProficiencyBonus = (state) => {
    return getPlayer(state).getIn(['level', 'proficiencyBonus']);
};

export const getInitiative = (state) => {
    return getPlayer(state).get('initiative');
};