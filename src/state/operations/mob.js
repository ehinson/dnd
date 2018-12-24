import { change } from 'redux-form/immutable';
import { fromJS, Map } from 'immutable';
import { push } from 'connected-react-router/immutable';
import * as math from 'mathjs'

import { roll, setAbilityModifier } from '../../utils/playerUtils';
import * as s from '../selectors/player';

import mobActions from '../actions/mob';
import mobs from '../../utils/5e_SRD_monster';


export const fetchRandomMob = player => (dispatch, getState) =>  {
    // fetch a random mob with CR x from the API
    const state = getState();
    const playerLevel = s.getPlayerLevel(state);
    const challengeRating = getChallengeRating(playerLevel)
    const foo = mobs.filter(el => math.fraction(el.Challenge.split(" ")[0]) < challengeRating && mobIsNotGood(el) )
    const randomIndex = math.randomInt(foo.length - 1)
    dispatch(mobActions.set(createMob(foo[randomIndex])))
}

// roll for initiative
// attack roll
// cast spell?

export const attack =  (sides, numberOfDice) => dispatch => {
    let rollArray = [];
    for(var i = 0; i < numberOfDice; i++){
      let diceRoll = roll(sides)
      rollArray.push(diceRoll)
    }
    rollArray.sort((a, b) => {
      if (a < b){
        return -1
      } else if (a > b){
        return 1
      } else {
        return 0;
      }
    })

    const total = rollArray.reduce((item, total)=> {
      return item + total
    })
}

export function getChallengeRating(level){
    // right now this is only the CR for one player. Add NPCs later
    return level * 0.25
}

export function createMob(values){
    const mob =  {
        name: values.name,
        armorClass: values["Armor Class"],
        challenge: values.Challenge,
        proficiencies: getMobSkills(values.Skills),
        alignment: values.meta.split(", ")[1],
        mainStats: {
          strength: {
              score: values.STR,
              modifier: math.parse(values.STR_mod).eval(),
          },
          dexterity: {
              score: values.DEX,
              modifier: math.parse(values.DEX_mod).eval(),
          },
          constitution: {
              score: values.CON,
              modifier: math.parse(values.CON_mod).eval(),
          },
          intelligence: {
              score: values.INT,
              modifier: math.parse(values.INT_mod).eval(),
          },
          wisdom: {
              score: values.WIS,
              modifier: math.parse(values.WIS_mod).eval(),
          },
          charisma: {
              score: values.CHA,
              modifier: math.parse(values.CHA_mod).eval(),
          },
        },
        health: {
          currentHealth: values["Hit Points"],
          maxHealth: values["Hit Points"],
        },
    }
    return (fromJS(mob))
}

function getMobSkills(values) {
    if (values) {
        const skillArray = values.split(", ")
        const skillList = skillArray.map(skillString => {
            const [skill, value] = skillString.split(" ")
            return { [skill] : math.parse(value).eval() }
        })
        return skillList;
    }
    return [];
}

function mobIsNotGood(mob){
    return !mob.meta.match(/good/ig)
}
