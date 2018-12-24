
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as playerOperations from '../state/operations/player';
import * as mobOperations from '../state/operations/mob';
import { SplitLayout, FullScreen, Content } from './App';
import { bindActionCreators } from 'redux';


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


class Summary extends Component {
  componentDidMount() {
    this.props.fetchMob()
  }
  render() {
    const {player} = this.props;
    return (
      <SplitLayout>
      <FullScreen>
        <Content>
          Character Summary <br />
          Add a link that leads to combat<br />
          {player.get('name')}
          <Link to="/about">Link to Page 2, make a choice</Link>
        </Content>
      </FullScreen>
  </SplitLayout>
    )
  }
}


const mapStateToProps = ({player}) => {
  return {
    player,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMob: mobOperations.fetchRandomMob,
}, dispatch)

const CharacterSummary = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Summary)

export default CharacterSummary