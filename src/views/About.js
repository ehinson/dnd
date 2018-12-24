import React from 'react';
import { Link } from 'react-router-dom';
import {SplitLayoutContainer, SplitLayout, LeftSide, RightSide, PageRight, PageLeft, Content, Overlay} from './App';


export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      right: {
        open: false,
      },
      left: {
        open: false,
      }
    };
  }
  handleLeftClick = () => {
    this.setState({
      left: {
        open: !this.state.left.open,
      }
    })
  }
  handleRightClick = () => {
    this.setState({
      right: {
        open: !this.state.right.open,
      }
    })
  }
  render(){
    return (
      <SplitLayoutContainer>
        <SplitLayout leftOpen={this.state.left.open} rightOpen={this.state.right.open}>
          <div className="intro">
          <LeftSide leftOpen={this.state.left.open} rightOpen={this.state.right.open} onClick={this.handleLeftClick}>
            <Content>Choose A<br/>
            <Link to="/">Home</Link>
            </Content>
            <Overlay leftOpen={this.state.left.open} rightOpen={this.state.right.open}/>
          </LeftSide>
          <RightSide rightOpen={this.state.right.open} leftOpen={this.state.left.open} onClick={this.handleRightClick}>
            <Content>Choose B<br/>
              <Link to="/">Home</Link>
            </Content>
            <Overlay rightOpen={this.state.right.open} leftOpen={this.state.left.open} />
          </RightSide>
          </div>
          <PageRight rightOpen={this.state.right.open} leftOpen={this.state.left.open}>
            You chose B
            <Link to="/character">Character</Link>
          </PageRight>
          <PageLeft rightOpen={this.state.right.open} leftOpen={this.state.left.open}>
            You chose A
            <Link to="/ring">Ring</Link>
          </PageLeft>
        </SplitLayout>
      </SplitLayoutContainer>
    )
  }
}