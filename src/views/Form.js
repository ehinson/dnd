import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form'

import playerActions from '../state/actions/player'
import * as s from '../state/selectors/player';


class Form extends React.Component {
  roll = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
  }
  generateAbilityScore = (fieldName, sides, numberOfDice) => {
    let rollArray = [];
    for(var i = 0; i < numberOfDice; i++){
      let diceRoll = this.roll(sides)
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
    const newPlayer = {
      mainStats: {
        strength: {
            score: values.strength,
        },
        dexterity: {
            score: values.dexterity,
        },
        constitution: {
            score: values.constitution,
        },
        intelligence: {
            score: values.intelligence,
        },
        wisdom: {
            score: values.wisdom,
        },
        charisma: {
            score: values.charisma,
        },
      },
      race: {
        name: values.race,
      }
    }
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
            <option value="Elf">Elf</option>
            <option value="Dwarf">Dwarf</option>
          </Field>
        </div>
      </div>
        <input type="submit" value="Submit" disabled={submitting}/>
      </form>

    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.player,
    initialValues: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPlayer: player => {
      dispatch(playerActions.mainStats.set(player.mainStats))
      dispatch(playerActions.race.set(player.race))
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
  // a unique name for the form
  form: 'player'
})(Form))


export default PlayerForm