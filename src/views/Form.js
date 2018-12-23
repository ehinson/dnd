import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form/immutable';
import { fromJS } from 'immutable';

import playerActions from '../state/actions/player';
import { roll } from '../utils/playerUtils';


class Form extends React.Component {
  generateAbilityScore = (fieldName, sides, numberOfDice) => {
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
      this.props.changeFieldValue(fieldName, total)
    } else {
      this.props.changeFieldValue(fieldName, 20)
    }

  }
  submit = values => {
    const newPlayer = fromJS({
      mainStats: {
        strength: {
            score: values.get('strength'),
        },
        dexterity: {
            score: values.get('dexterity'),
        },
        constitution: {
            score: values.get('constitution'),
        },
        intelligence: {
            score: values.get('intelligence'),
        },
        wisdom: {
            score: values.get('wisdom'),
        },
        charisma: {
            score: values.get('charisma'),
        },
      },
      race: {
        name: values.get('race'),
      },
      health: {
        currentHealth: 0,
        maxHealth: 0,
      },
      category: {
        name: values.get('category'),
      }
    })
    this.props.createPlayer(newPlayer)
  }

  render() {
    const {handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
      <div>
          <label htmlFor="strength">strength</label>
          <Field name="strength" component="input" type="number" min="-10" max="20" />
          <input type="button" value="Roll" onClick={()=> this.generateAbilityScore('strength', 6, 4)}/>
        </div>
        <div>
          <label htmlFor="dexterity">dexterity</label>
          <Field name="dexterity" component="input" type="number" min="-10" max="20" />
          <input type="button" value="Roll" onClick={()=> this.generateAbilityScore('dexterity', 6, 4)}/>
        </div>
        <div>
          <label htmlFor="constitution">constitution</label>
          <Field name="constitution" component="input" type="number" min="-10" max="20" />
          <input type="button" value="Roll" onClick={()=> this.generateAbilityScore('constitution', 6, 4)}/>
        </div>
        <div>
          <label htmlFor="intelligence">intelligence</label>
          <Field name="intelligence" component="input" type="number" min="-10" max="20" />
          <input type="button" value="Roll" onClick={()=> this.generateAbilityScore('intelligence', 6, 4)}/>
        </div>
        <div>
          <label htmlFor="wisdom">wisdom</label>
          <Field name="wisdom" component="input" type="number" min="-10" max="20" />
          <input type="button" value="Roll" onClick={()=> this.generateAbilityScore('wisdom', 6, 4)}/>
        </div>
        <div>
          <label htmlFor="charisma">charisma</label>
          <Field name="charisma" component="input" type="number" min="-10" max="20" />
          <input type="button" value="Roll" onClick={()=> this.generateAbilityScore('charisma', 6, 4)}/>
        </div>
        <div>
          <label>Race</label>
          <div>
            <Field name="race" component="select">
              <option />
              <option value="human">Human</option>
              <option value="elf">Elf</option>
              <option value="dwarf">Dwarf</option>
            </Field>
          </div>
        </div>
        <div>
          <label>Category</label>
          <div>
            <Field name="category" component="select">
              <option />
              <option value="fighter">Fighter</option>
              <option value="wizard">Wizard</option>
            </Field>
          </div>
        </div>
        <input type="submit" value="Submit" disabled={submitting}/>
      </form>

    );
  }
}

const mapStateToProps = ({player}) => {
  return {
    player,
    initialValues: fromJS({
      strength: player.getIn(['mainStats','strength','score']) || 10,
      dexterity: player.getIn(['mainStats','dexterity','score']) || 10,
      constitution: player.getIn(['mainStats','constitution','score']) || 10,
      intelligence: player.getIn(['mainStats','intelligence','score']) || 10,
      wisdom: player.getIn(['mainStats','wisdom','score']) || 10,
      charisma: player.getIn(['mainStats','charisma','score']) || 10,
    }),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPlayer: player => {
      // async?
      dispatch(playerActions.race.set(player.get('race')))
      dispatch(playerActions.mainStats.set(player.get('mainStats')))
      dispatch(playerActions.category.set(player.get('category')))
      dispatch(playerActions.health.set(player.get('health')))
      // this depends on mainStats being set
      dispatch(playerActions.initiative.set())
    },
    changeFieldValue: function(field, value) {
      dispatch(change('player', field, value))
    }
  }
}

const PlayerForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'player'
})(Form))


export default PlayerForm