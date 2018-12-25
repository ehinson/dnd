import { change } from 'redux-form/immutable';
import { fromJS, Map } from 'immutable';
import { push } from 'connected-react-router/immutable';
import * as math from 'mathjs'

import { roll, setAbilityModifier } from '../../utils/playerUtils';
import * as p from '../selectors/player';
import * as m from '../selectors/mob';
import * as c from '../selectors/combat';

import * as mobOperations from '../operations/mob';

import mobActions from '../actions/mob';
import combatActions from '../actions/combat';
import playerActions from '../actions/player';

import mobs from '../../utils/5e_SRD_monster';

export const createCombat = () => (dispatch, getState) => {
    mobOperations.fetchRandomMob()(dispatch, getState).then(mob => {
        dispatch(combatActions.mobs.set(mob))
        setInitiativeOrder()(dispatch, getState)
        fight()(dispatch, getState)
    });

}

export const fight = () => (dispatch, getState) => {
    dispatch(combatActions.round.next.set());

    const state = getState();
    const initiativeOrder = c.getInitiative(state);
    const mobs = c.getMobs(state);
    const player = p.getPlayer(state);
    let activeIndex = c.getActive(state);
    const currentTurn = initiativeOrder.get(activeIndex);
    const currentMobIndex = mobs.findIndex(el => el.get('name') === currentTurn.get('name'))
    dispatch(combatActions.mobs.attack.toggle(currentMobIndex));

    switch (currentTurn.get('type')) {
        case 'mob':
            mobAttack(mobs.get(currentMobIndex), player)(dispatch, getState);
            dispatch(combatActions.mobs.attack.toggle(currentMobIndex));
            if (activeIndex !== initiativeOrder.size + 1) {
                activeIndex ++;
            } else {
                activeIndex = 0;
                dispatch(combatActions.round.next.set());
            }
            dispatch(combatActions.active.set(activeIndex))
            break;

        case 'player':
            // prompt player to click button, select who they are fighting. only button click will attack
            // playerAttack('player')
            dispatch(combatActions.player.attack.toggle());
            break;

        default:
            break;
    }

}

const mobAttack = (mob, target) => (dispatch, getState) =>  {
    // one attack roll for each type
    const actions = mob.get('actions');
    const attackRoll = mobOperations.attackRoll(actions);
    const damageRoll = mobOperations.damageRoll(actions);

    if (target.get('armor_class') <= attackRoll || attackRoll === 'critical hit') {
        console.log(`${mob.get('name')} hit ${target.get('name')} with ${damageRoll[0].get('name')}!`, damageRoll[1], damageRoll[0].get('desc'))
        // update combat log
        // harm the target for x points
        dispatch(playerActions.health.harm.set(damageRoll[1]))
    } else if(attackRoll === 'critical miss') {
        console.log(`${mob.get('name')} critically missed!`, attackRoll, damageRoll[1])
        // update the combat log
    } else {
        console.log(`${mob.get('name')} missed!`, attackRoll, damageRoll[1])
        // update the combat log
    }
}

const playerAttack = (target) => (dispatch, getState) =>  {

}

export const setInitiativeOrder = () => (dispatch, getState) => {
    const state = getState();
    const initiative = [];

    const player = {
        name: p.getName(state) || 'player',
        initiative: p.getInitiative(state) || 1,
        type: 'player'
    }

    initiative.push(player)
    // TODO create one initiative per mob.name so groups of hyenas go at a time
    const mobs = c.getMobs(state).map(mob => Map({
        name: mob.get('name'),
        initiative: mob.get('initiative'),
        type: 'mob',
    }))
    const orderedInitiative = fromJS(initiative).concat(mobs).sort((a, b) => b.get('initiative') - a.get('initiative') )
    dispatch(combatActions.initiative.set(orderedInitiative))
}