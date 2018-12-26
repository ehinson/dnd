import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, FormSection, formValueSelector } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import styled from 'styled-components';

import * as playerOperations from '../state/operations/player';
import { SplitLayoutContainer, SplitLayout, FullScreen, Content } from './App';
import { Abilities, Classification, Identification } from "./Abilities";
import { bindActionCreators } from 'redux';

// will need to export for tests?
const FormStep = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 1em;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${p => {
    if (p.page === 1) return '#7B7D7D'
    if (p.page === 2) return '#B3B6B7'
    if (p.page === 3) return '#ECF0F1'
    if (p.page === 4) return 'red'
  }};
`;

const ButtonTab = styled.button`
  outline: none;
  border: none;
  position: absolute;
  width: 10px;
  height: 33%;
  left: 0;
  z-index: 2;
  cursor: pointer;
  :nth-of-type(1) {
    background-color: #7B7D7D;
    top: 0;
  }
  :nth-of-type(2) {
    background-color: #B3B6B7;
    top: 25%;
  }
  :nth-of-type(3) {
    background-color: #ECF0F1;
    top: 50%;
  }
  :nth-of-type(4) {
    background-color: red;
    top: 75%;
  }
`;
class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visited: false,
      page: 1,
    };
  }

  componentDidMount(){
    this.props.fetchFeatureChoices();
    this.props.fetchProficiencyChoices();
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 })
  }

  handleBack = () => {
    this.setState({ page: this.state.page - 1 })
  }

  setActiveTab = (page) => {
    this.setState({ page })
  }

  render(){
    const {
      handleSubmit,
      submitting,
      submitCharacterForm,
      generateAbilityScore
    } = this.props;

    return (
      <SplitLayout>
        <FullScreen>
          <div>
            <ButtonTab onClick={()=> this.setActiveTab(1)} />
            <ButtonTab onClick={()=> this.setActiveTab(2)} />
            <ButtonTab onClick={()=> this.setActiveTab(3)} />
            <ButtonTab onClick={()=> this.setActiveTab(4)} />
          </div>

          <form onSubmit={handleSubmit(submitCharacterForm)}>
            {this.state.page === 1 &&
              <FormStep page={this.state.page}>
                <Content>
                  Character<br/>
                  <FormSection name="identification">
                    <Identification />
                  </FormSection>
                  <button type="button" onClick={this.handleNext}>
                    Next
                  </button>
                </Content>
              </FormStep>
            }

            {this.state.page === 2 &&
              <FormStep page={this.state.page}>
                <Content>
                  Character<br/>
                  <FormSection name="abilities">
                    <Abilities generateAbilityScore={generateAbilityScore} />
                  </FormSection>
                  <button type="button" onClick={this.handleBack}>
                    Back
                  </button>
                  <button type="button" onClick={this.handleNext}>
                    Next
                  </button>
                </Content>
              </FormStep>
            }

            {this.state.page === 3 &&
              <FormStep page={this.state.page}>
                <Content>
                  Character<br/>
                  <FormSection name="classification">
                    <Classification
                      player={this.props.player}
                      featureChoices={this.props.featureChoices}
                      hasFeatureChoice={this.props.hasFeatureChoice}
                      proficiencyChoices={this.props.proficiencyChoices}
                     />
                  </FormSection>
                  <button type="button" onClick={this.handleBack}>
                    Back
                  </button>

                  <input type="submit" value="Create Player!" disabled={submitting}/>
                </Content>
              </FormStep>
            }
        {/* Equipment choices */}
        {this.state.page === 4 &&
              <FormStep page={this.state.page}>
                <Content>
                  Character<br/>
                  <FormSection name="classification">
                    <Classification
                      player={this.props.player}
                      featureChoices={this.props.featureChoices}
                      hasFeatureChoice={this.props.hasFeatureChoice}
                      proficiencyChoices={this.props.proficiencyChoices}
                     />
                  </FormSection>
                  <button type="button" onClick={this.handleBack}>
                    Back
                  </button>

                  <input type="submit" value="Create Player!" disabled={submitting}/>
                </Content>
              </FormStep>
            }
          </form>
        </FullScreen>
      </SplitLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player,
    featureChoices: state.player.getIn(['choices', 'level_1', 'featureChoices']),
    proficiencyChoices: state.player.getIn(['choices', 'level_1', 'proficiencyChoices']),
    hasFeatureChoice: formValueSelector('player')(state, 'classification.features'),
    initialValues: fromJS({
      abilities: {
        strength: state.player.getIn(['mainStats','strength','score']) || 10,
        dexterity: state.player.getIn(['mainStats','dexterity','score']) || 10,
        constitution: state.player.getIn(['mainStats','constitution','score']) || 10,
        intelligence: state.player.getIn(['mainStats','intelligence','score']) || 10,
        wisdom: state.player.getIn(['mainStats','wisdom','score']) || 10,
        charisma: state.player.getIn(['mainStats','charisma','score']) || 10,
      },
      classification: {
        race: state.player.getIn(['race', 'name']) || 'human',
        category: state.player.getIn(['category', 'name']) || 'fighter',
      },
      identification: {
        name: state.player.get('name') || '',
      }
    }),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setPlayer: playerOperations.setPlayer,
  submitCharacterForm: playerOperations.submitCharacterForm,
  generateAbilityScore: playerOperations.generateAbilityScore,
  fetchFeatureChoices: playerOperations.fetchFeatureChoices,
  fetchProficiencyChoices: playerOperations.fetchProficiencyChoices,
}, dispatch)

const CharacterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'player'
})(Character))

export default CharacterForm