import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, FormSection } from 'redux-form/immutable';
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
    top: 33%;
  }
  :nth-of-type(3) {
    background-color: #ECF0F1;
    top: 66%;
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
                    <Classification />
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
        name: player.get('name') || '',
      }
    }),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setPlayer: playerOperations.setPlayer,
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