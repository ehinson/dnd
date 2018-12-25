// recompose

export const getCombat = state => state.combat || state;

export const getMobs = state => getCombat(state).get('mobs');
export const getInitiative = state => getCombat(state).get('initiative');
export const getActive = state => getCombat(state).get('active');
