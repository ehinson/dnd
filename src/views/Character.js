import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, FormSection } from 'redux-form/immutable';
import { fromJS } from 'immutable';

import * as playerOperations from '../state/operations/player';
import { SplitLayoutContainer, SplitLayout, FullScreen, Content } from './App';
import { Abilities, Classification, Identification } from "./Abilities";
import { bindActionCreators } from 'redux';


class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visited: false,

    };
  }
  render(){
    const {
      handleSubmit,
      submitting,
      submitCharacterForm,
      generateAbilityScore
    } = this.props;

    return (
      <SplitLayoutContainer>
        <SplitLayout>
          <FullScreen>
            <div>
              <button>London</button>
              <button>Paris</button>
              <button>Tokyo</button>
            </div>

            <form onSubmit={handleSubmit(submitCharacterForm)}>
              <div style={{ display: "none"}}>
                <Content>
                    Character<br/>
                    {this.state.visited}
                    <FormSection name="identification">
                      <Identification />
                    </FormSection>
                    <Link to="/">Link to Home</Link>
                    <input type="submit" value="Submit" disabled={submitting}/>
                </Content>
              </div>

              <div style={{ display: "none"}}>
                <Content>
                    Character<br/>
                    {this.state.visited}
                    <FormSection name="classification">
                      <Classification />
                    </FormSection>
                    <Link to="/">Link to Home</Link>
                    <input type="submit" value="Submit" disabled={submitting}/>
                </Content>
              </div>

              <div>
                <Content>
                    Character<br/>
                    {this.state.visited}
                    <FormSection name="abilities">
                      <Abilities generateAbilityScore={generateAbilityScore} />
                    </FormSection>
                    <Link to="/">Link to Home</Link>
                    <input type="submit" value="Submit" disabled={submitting}/>
                </Content>
              </div>

            </form>
          </FullScreen>
        </SplitLayout>
      </SplitLayoutContainer>
    )
  }
}

const mapStateToProps = ({player}) => {
  return {
    player,
    initialValues: fromJS({
      abilities: {
        strength: player.getIn(['mainStats','strength','score']) || 10,
        dexterity: player.getIn(['mainStats','dexterity','score']) || 10,
        constitution: player.getIn(['mainStats','constitution','score']) || 10,
        intelligence: player.getIn(['mainStats','intelligence','score']) || 10,
        wisdom: player.getIn(['mainStats','wisdom','score']) || 10,
        charisma: player.getIn(['mainStats','charisma','score']) || 10,
      },
      classification: {
        race: player.getIn(['race', 'name']) || 'human',
        category: player.getIn(['category', 'name']) || 'fighter',
      },
      identification: {
        name: 'Test',
      }
    }),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createPlayer: playerOperations.createPlayer,
  submitCharacterForm: playerOperations.submitCharacterForm,
  generateAbilityScore: playerOperations.generateAbilityScore,
}, dispatch)

const CharacterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'player'
})(Character))

export default CharacterForm