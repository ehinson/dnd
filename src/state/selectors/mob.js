// recompose

export const getMob = state => state.mob || state;

export const getMobChallengeRating = state => {
    return getMob(state).get('challenge')
}
export const getMainStats = (state) => {
    return getMob(state).get('mainStats');
};

export const getMobAbility = (state, ability) => {
    return getMainStats(state).getIn([ability, 'score'])
};

export const getMobAbilityModifier = (state, ability) => {
    return getMainStats(state).getIn([ability, 'modifier'])
};

export const getAlignment = (state) => {
    return getMob(state).get('alignment');
};

export const getProficiencies = (state) => {
    return getMob(state).get('proficiencies');
};

export const getProficienciesKeys = (state) => {
    return [...getProficiencies(state).keys()];
};

export const getInitiative = (state) => {
    return getMob(state).get('initiative');
};