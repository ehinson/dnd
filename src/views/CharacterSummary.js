
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as playerOperations from '../state/operations/player';
import * as mobOperations from '../state/operations/mob';
import * as combatOperations from '../state/operations/combat';
import { SplitLayout, FullScreen, Content } from './App';
import { bindActionCreators } from 'redux';

// uncomment if you move the mobs to another component
// const Summary = ({player}) => (
//   <SplitLayout>
//       <FullScreen>
//         <Content>
//           Character Summary <br />
//           Add a link that leads to combat<br />
//           {player.get('name')}
//           <Link to="/about">Link to Page 2, make a choice</Link>
//         </Content>
//       </FullScreen>
//   </SplitLayout>
// )

const SummaryPanel = styled.div`
  max-width: 960px;
  width: 100%;
  min-height: 100px;
  overflow: scroll;
  max-height: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px 25px;
  position: relative;
  z-index: 10;
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.08), 0px 20px 31px 3px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02);
`;

const Features = styled.div`
  font-weight: 600;
  letter-spacing: 1px;
  border-top: 1px solid #e1f1ff;
  font-size: 12px;
  line-height: 1.5;
  padding: 15px 0;
`;

class Summary extends Component {
  componentDidMount() {
    this.props.createCombat();
  }
  render() {
    const {player, combat, mob} = this.props;
    return (
      <SplitLayout>
      <FullScreen>
        <Content>
          <SummaryPanel>
            Character Summary <br />
            Insert Image/Icon here
            <Features>{player.get('name')|| 'Test'}</Features>
            {combat.get('log').map(log => (
              <Features key={log}>{log}</Features>
            ))}
          </SummaryPanel>
          Add a button that leads to combat here<br />
          {/* disable button if dead or won show link to next */}
          <button onClick={()=> this.props.fight()}>FIGHT</button>
          <Link to="/about">Link to Page 2, make a choice</Link>
        </Content>
      </FullScreen>
  </SplitLayout>
    )
  }
}


const mapStateToProps = ({player, combat, mob}) => {
  return {
    player,
    combat,
    mob,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMob: mobOperations.fetchRandomMob,
  createCombat: combatOperations.createCombat,
  fight: combatOperations.fight,
}, dispatch)

const CharacterSummary = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Summary)

export default CharacterSummary