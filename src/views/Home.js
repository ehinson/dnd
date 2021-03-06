import React from 'react';
import { Link } from 'react-router-dom';
import {SplitLayoutContainer, SplitLayout, FullScreen, Content} from './App';


const Home = () => (
  <SplitLayout>
    <FullScreen>
      <Content>
        First Page<br/>
        <Link to="/about">Link to Page 2, make a choice</Link>
      </Content>
    </FullScreen>
  </SplitLayout>
)

export default Home