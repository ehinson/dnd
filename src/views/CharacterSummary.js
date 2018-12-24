import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';

import * as playerOperations from '../state/operations/player';
import { SplitLayoutContainer, SplitLayout, FullScreen, Content } from './App';
import { bindActionCreators } from 'redux';


const Summary = () => (
  <SplitLayout>
    <FullScreen>
      <Content>
        First Page<br/>
        <Link to="/about">Link to Page 2, make a choice</Link>
      </Content>
    </FullScreen>
  </SplitLayout>
)

const mapStateToProps = ({player}) => {
  return {
    player,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createPlayer: playerOperations.createPlayer,
  submitCharacterForm: playerOperations.submitCharacterForm,
  generateAbilityScore: playerOperations.generateAbilityScore,
}, dispatch)

const CharacterSummary = connect(
  mapStateToProps,
  {}
)(Summary)

export default CharacterSummary