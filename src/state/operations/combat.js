import { change } from 'redux-form/immutable';
import { fromJS, Map } from 'immutable';
import { push } from 'connected-react-router/immutable';
import * as math from 'mathjs'

import { roll, setAbilityModifier } from '../../utils/playerUtils';
import * as p from '../selectors/player';
import * as m from '../selectors/mob';
import * as c from '../selectors/combat';

import * as mobOperations from '../operations/mob';
import * as playerOperations from '../operations/player';

import mobActions from '../actions/mob';
import combatActions from '../actions/combat';
import playerActions from '../actions/player';

import mobs from '../../utils/5e_SRD_monster';

export const createCombat = () => (dispatch, getState) => {
    mobOperations.fetchRandomMob()(dispatch, getState).then(mob => {
        dispatch(mobActions.set(mob))
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
    console.log(currentTurn.toJS())

    debugger;
    switch (currentTurn.get('type')) {
        case 'mob':
            const currentMobIndex = mobs.findIndex(el => el.get('name') === currentTurn.get('name'));
            dispatch(combatActions.mobs.attack.toggle(currentMobIndex));
            mobAttack(mobs.get(currentMobIndex), player)(dispatch, getState);
            if (activeIndex !== initiativeOrder.size + 1) {
                activeIndex ++;
            } else {
                activeIndex = 0;
                dispatch(combatActions.round.next.set());
            }
            dispatch(combatActions.active.set(activeIndex))
            dispatch(combatActions.mobs.attack.toggle(currentMobIndex));
            break;

        case 'player':
            // TODO: prompt player to click button, select who they are fighting. only button click will attack

            dispatch(combatActions.player.attack.toggle());
            playerAttack(player, mobs.get(0))(dispatch, getState);
            if (activeIndex !== initiativeOrder.size + 1) {
                activeIndex ++;
            } else {
                activeIndex = 0;
                dispatch(combatActions.round.next.set());
            }
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
        console.log(`${mob.get('name')} rolled a ${attackRoll} and hit ${target.get('name')} with ${damageRoll[0].get('name')}!`, damageRoll[1], damageRoll[0].get('desc'))
        dispatch(combatActions.log.set(`${mob.get('name')} rolled a ${attackRoll} and hit ${target.get('name')} with ${damageRoll[0].get('name')} for ${damageRoll[1]} damage!`))
        dispatch(playerActions.health.harm.set(damageRoll[1]))
    } else if(attackRoll === 'critical miss') {
        console.log(`${mob.get('name')} critically missed!`, attackRoll, damageRoll[1])
        dispatch(combatActions.log.set(`${mob.get('name')} critically missed!`))
    } else {
        console.log(`${mob.get('name')} missed!`, attackRoll, damageRoll[1])
        dispatch(combatActions.log.set(`${mob.get('name')} rolled a ${attackRoll} and missed!`))
    }
}

const playerAttack = (player, target) => (dispatch, getState) =>  {
    const attackRoll = playerOperations.attackRoll();
    const damageRoll = playerOperations.damageRoll();

    if (target.get('armorClass') <= attackRoll || attackRoll === 'critical hit') {
        console.log(`${player.get('name')} rolled a ${attackRoll} and hit ${target.get('name')} with ${damageRoll[0].get('name')}!`, damageRoll[1], damageRoll[0].get('desc'))
        dispatch(combatActions.log.set(`${player.get('name')} rolled a ${attackRoll} and hit ${target.get('name')} with ${damageRoll[0].get('name')} for ${damageRoll[1]} damage!`))
        dispatch(playerActions.health.harm.set(damageRoll[1]))
    } else if(attackRoll === 'critical miss') {
        console.log(`${player.get('name')} critically missed!`, attackRoll, damageRoll[1])
        dispatch(combatActions.log.set(`${player.get('name')} critically missed!`))
    } else {
        console.log(`${player.get('name')} missed!`, attackRoll, damageRoll[1])
        dispatch(combatActions.log.set(`${player.get('name')} rolled a ${attackRoll} and missed!`))
    }
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
    // clear the previous mobs out?
    const mobs = c.getMobs(state).map(mob => Map({
        name: mob.get('name'),
        initiative: mob.get('initiative'),
        type: 'mob',
    }))
    const orderedInitiative = fromJS(initiative).concat(mobs).sort((a, b) => b.get('initiative') - a.get('initiative') )
    dispatch(combatActions.initiative.set(orderedInitiative))
}