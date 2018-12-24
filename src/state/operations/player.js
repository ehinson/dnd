import { change } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import playerActions from '../actions/player';
import { roll } from '../../utils/playerUtils';


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

export const createPlayer = player => dispatch =>  {
    // async?
    dispatch(playerActions.name.set(player.get('name')))
    dispatch(playerActions.race.set(player.get('race')))
    dispatch(playerActions.mainStats.set(player.get('mainStats')))
    dispatch(playerActions.category.set(player.get('category')))
    dispatch(playerActions.health.set(player.get('health')))
    // this depends on mainStats being set
    dispatch(playerActions.initiative.set())
}

export const submitCharacterForm = values => dispatch => {
    const newPlayer = fromJS({
        name: values.getIn(['identification', 'name']),
        mainStats: {
          strength: {
              score: values.getIn(['abilities','strength']),
          },
          dexterity: {
              score: values.getIn(['abilities','dexterity']),
          },
          constitution: {
              score: values.getIn(['abilities','constitution']),
          },
          intelligence: {
              score: values.getIn(['abilities','intelligence']),
          },
          wisdom: {
              score: values.getIn(['abilities','wisdom']),
          },
          charisma: {
              score: values.getIn(['abilities','charisma']),
          },
        },
        race: {
          name: values.getIn(['classification','race']),
        },
        health: {
          currentHealth: 0,
          maxHealth: 0,
        },
        category: {
          name: values.getIn(['classification','category']),
        }
      })
      createPlayer(newPlayer)(dispatch)
      // redirect to a summary page with stats and a link to go on
}

