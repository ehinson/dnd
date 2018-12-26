import { fromJS } from 'immutable';
import * as math from 'mathjs'

import { roll } from '../../utils/playerUtils';
import * as s from '../selectors/player';
import * as m from '../selectors/mob';

import mobActions from '../actions/mob';
import mobs from '../../utils/5e_SRD_monster';

import { calculateModifier } from '../../utils/playerUtils';


export const fetchRandomMob = () => (dispatch, getState) =>  {
    return new Promise((resolve, reject) => {
        // fetch a random mob with CR x from the API
        const state = getState();
        const playerLevel = s.getPlayerLevel(state) || 1;
        const challengeRating = getChallengeRating(playerLevel)

        // CR less than .25 has actions with damage dice, isn't good, spawn multiple mobs up to CR?
        const mediumChallenge = mobs.filter(el => {
            return el.challenge_rating
                && (math.fraction(el.challenge_rating) < challengeRating)
                && mobIsNotGood(el)
                && mobCanDoDamage(el)
        })

        const randomIndex = math.randomInt(mediumChallenge.length - 1)
        const randomMob = createMob(mediumChallenge[randomIndex])

        // return mob or set in an array on the mob reducer???
        dispatch(mobActions.set(randomMob));

        resolve(randomMob);
    })
    // console.log(damageRoll(mediumChallenge[randomIndex].actions[0])(dispatch))
    // console.log(attackRoll(mediumChallenge[randomIndex].actions[0])(dispatch))
}

// cast spell?

export const attackRoll =  (actions) => {
    const attackBonus = actions.get('attack_bonus') || 0;
    const roll20 = roll(20);
    let attackRoll;

    switch (roll20) {
        case 1:
            attackRoll = 'critical miss'
            break;
        case 20:
            attackRoll = 'critical hit'
            break;

        default:
            attackRoll = roll20 + attackBonus;
            break;
    }

    return attackRoll;
}

export const damageRoll =  (actions) => {
    const randomIndex = actions.length > 1 ? math.randomInt(actions.length) : 0;
    const action = actions.get(randomIndex)
    const damageDice = action.get('damage_dice');
    const numberOfDice = damageDice.split("d")[0];
    const sides = damageDice.split("d")[1];
    const damageBonus = action.get('damage_bonus') || 0;

    let rollArray = [];

    for(var i = 0; i < numberOfDice; i++){
      let diceRoll = roll(sides)
      rollArray.push(diceRoll)
    }

    const damageRoll = rollArray.reduce((item, total)=> {
      return item + total
    });

    return [action, damageRoll + damageBonus];
}

export const initiativeRoll =  (dexModifier = 0) => {
    // adjust for multiple mobs
    // json doesn't have modifiers? calculate?
    const roll20 = roll(20);
    return roll20 + dexModifier;
}

export function getChallengeRating(level){
    // right now this is only the CR for one player. Add NPCs later
    return level * 0.25
}

export function createMob(values){
    const dexterity_modifier = calculateModifier(
        fromJS({ dexterity: values.dexterity}),
        'dexterity',
        null);
    const mob =  {
        name: values.name,
        armorClass: values.armor_class,
        challenge: values.challenge_rating,
        actions: values.actions,
        alignment: values.alignment,
        senses: values.senses,
        mainStats: {
          strength: {
              score: values.strength,
              save: values.strength_save || 0,
          },
          dexterity: {
              score: values.dexterity,
              save: values.dexterity_save || 0,
              modifier: dexterity_modifier,
          },
          constitution: {
              score: values.constitution,
              save: values.constitution_save || 0,
          },
          intelligence: {
              score: values.intelligence,
              save: values.intelligence_save || 0,
          },
          wisdom: {
              score: values.wisdom,
              save: values.wisdom_save || 0,
          },
          charisma: {
              score: values.charisma,
              save: values.charisma_save || 0,
          },
        },
        initiative: initiativeRoll(dexterity_modifier),
        health: {
          currentHealth: values.hit_points,
          maxHealth: values.hit_points,
          hitDice: values.hit_dice,
        },
    }
    return (fromJS(mob))
}

function mobIsNotGood(mob){
    return !mob.alignment.match(/good/ig)
}

function mobCanDoDamage(mob){
    return mob.actions && mob.actions.some(action => action.damage_dice)
}
