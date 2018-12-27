import { change } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import { push } from 'connected-react-router/immutable';
import math from 'mathjs';

import playerActions from '../actions/player';
import * as p from '../selectors/player';

import { roll, setAbilityModifier, calculateHealth  } from '../../utils/playerUtils';
import categories from '../../utils/5e_SRD_classes';

const NEW_PLAYER_LEVEL = 1;

export const fetchFeatureChoices = () => (dispatch, getState) => {
    const state = getState();
    const category = p.getCategory(state);
    const playerLevel = p.getPlayerLevel(state);

    const categoryData = categories
        .filter(el => el.name.toLowerCase() === category.toLowerCase())
    const featureChoices = categoryData[0].class_levels[playerLevel].feature_choices[0].choice.from;
    const features = categoryData[0].class_levels[playerLevel].features;
    // make two functions?
    dispatch(playerActions.features.set(features));
    dispatch(playerActions.choices.set(fromJS({
        featureChoices: featureChoices,
    })));
    return featureChoices;
}

export const fetchProficiencyChoices = () => (dispatch, getState) => {
    const state = getState();
    const category = p.getCategory(state);

    const categoryData = categories
        .filter(el => el.name.toLowerCase() === category.toLowerCase())
    const proficiencyChoices = categoryData[0].proficiency_choices[0].from;
    dispatch(playerActions.choices.set(fromJS({
        proficiencyChoices: proficiencyChoices,
    })));

    return proficiencyChoices;
}

export const fetchEquipmentChoices = () => (dispatch, getState) => {
    const state = getState();
    const category = p.getCategory(state);

    const categoryData = categories
        .filter(el => el.name.toLowerCase() === category.toLowerCase())
    const starting_equip = categoryData[0].starting_equipment;
    const equipmentChoices = [];
    Object.entries(starting_equip).forEach(([key, choice]) => {
        if (key.match(/choice_/gi)){
            console.log(choice)
            const foo = choice.map(item => {
                return item.from.map(it => it.item)
            })
            console.log("foo", foo)
            equipmentChoices.push(foo);
        }
    } )
    console.log("e choice", equipmentChoices)
    dispatch(playerActions.choices.set(fromJS({
        equipmentChoices: equipmentChoices,
    })));

    return equipmentChoices;
}

export const generateAbilityScore = (fieldName, sides, numberOfDice) => dispatch => {
    // make this more generic so you can use it for combat
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

    if (total <= 20){
        dispatch(change('player', `abilities.${fieldName}`, total))
    } else {
        dispatch(change('player', `abilities.${fieldName}`, 20))
    }
}

export const setPlayer = player => dispatch =>  {
    // async?
    // just calculate stats, etc here and playerActions.set
    dispatch(playerActions.set(player))
    // dispatch(playerActions.name.set(player.get('name')))
    // dispatch(playerActions.race.set(player.get('race')))
    // dispatch(playerActions.mainStats.set(player.get('mainStats')))
    // dispatch(playerActions.category.set(player.get('category')))
    // dispatch(playerActions.health.set(player.get('health')))
    // // this depends on mainStats being set
    // dispatch(playerActions.initiative.set())
    // dispatch(playerActions.armorClass.set())
}

export const submitCharacterForm = values => (dispatch) => {
    const newPlayer = createPlayer(values);
    setPlayer(newPlayer)(dispatch)
    dispatch(push('/character-summary'))
}

export function createPlayer(values){
    const player = {
        name: values.getIn(['identification', 'name']),
        level: {
            currentLevel: 1,
            proficiencyBonus: 2,
        },
        proficiencies: values.getIn(['classification', 'proficiencies']).map(prof => prof.replace(/Skill: /gi, '').toLowerCase()),
        race: {
          name: values.getIn(['classification','race']),
        },
        features: getFeatureData(
            values.getIn(['classification', 'features']),
            NEW_PLAYER_LEVEL,
            values.getIn(['classification','category'])
            ),
        actions: getActionData(
            values.getIn(['classification', 'features']),
            NEW_PLAYER_LEVEL,
            values.getIn(['classification','category'])
            ),
        category: {
          name: values.getIn(['classification','category']),
        }
    }
    // will this work?
    player.mainStats = setAbilityModifier(player, values.get('abilities'));
    player.health = calculateHealth(player.category, player.mainStats.getIn(['constitution','modifier']), player.level.currentLevel);
    return fromJS(player);
}

export const attackRoll =  (actions) => {
    // change this to features after fleshing out characters
    const attackBonus = actions ? actions.get('attack_bonus') : 0;
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
    // const randomIndex = actions && actions.length > 1 ? math.randomInt(actions.length) : 0;
    // const action = actions.get(randomIndex)
    // const damageDice = action.get('damage_dice');
    // const numberOfDice = damageDice.split("d")[0];
    // const sides = damageDice.split("d")[1];
    // const damageBonus = action.get('damage_bonus') || 0;

    let rollArray = [];

    for(var i = 0; i < 1; i++){
      let diceRoll = roll(10)
      rollArray.push(diceRoll)
    }

    const damageRoll = rollArray.reduce((item, total)=> {
      return item + total
    });

    return [fromJS({name: 'attack'}), damageRoll];
}

export const initiativeRoll =  (dexModifier=0) => {
    // adjust for multiple mobs
    // json doesn't have modifiers? calculate?
    const roll20 = roll(20);
    return roll20 + dexModifier;
}

function getFeatureData(featureName, playerLevel, playerCategory) {
    const categoryData = categories
        .filter(el => el.name.toLowerCase() === playerCategory.toLowerCase())
    const featureChoices = categoryData[0].class_levels[playerLevel].feature_choices[0].choice.from;
    const featureData = featureChoices.filter(choice => choice.name === featureName)
    return featureData
}

function getActionData(featureName, playerLevel, playerCategory) {
    const categoryData = categories
        .filter(el => el.name.toLowerCase() === playerCategory.toLowerCase())
    const featureChoices = categoryData[0].class_levels[playerLevel].feature_choices[0].choice.from;
    const featureData = featureChoices.filter(choice => choice.name === featureName)
    return featureData
}
