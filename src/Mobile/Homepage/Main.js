import React from 'react';
import styled, { keyframes } from 'styled-components';
import MobileDoors from './pages/Doors';
import * as Data from '../../apiData/static';
import * as Image from '../../global-components/Images';
import MobilePassage from './pages/Passage';
import Contact from './pages/Contant';
import BasicData from '../../apiData/movingPara';
import { PageData } from '../../global-components/utils';
import WithFlowers from '../../global-components/WithFlowers';
import StaticImage from './pages/StaticImage';

const Frame = styled.div`
  background-color: ${(props) => (props.color ? props.color : 'white')};
  width: 100vw;
  height: ${(props) => props.height}vh;
  position: relative;
  display: flex;
  overflow: hidden;
`;
const LargeFrame = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: white;
  animation: ${(props) => {
      return keyframes`
            
            0%{
              opacity: 0;
              transform:translateY(-20%);
              filter: blur(20px)
            }
            
            100%{
              opacity: 1;
              transform:translateY(0);
              filter: blur(0);
            }
            
           `;
    }}
    ease-out ${BasicData.mobileBlurTime} forwards;
`;

const pages = new PageData();

const newMain = (props) => {
  return (
    <LargeFrame>
      <Frame
        id={'mobileFrame0'}
        height={pages.getPageField('门的页面', 'mobileLength')}
      >
        <MobileDoors />
      </Frame>
      <Frame
        id={'mobileFrame3'}
        // height={pages.getPageField('详细介绍页', 'mobileLength') }
      >
        <MobilePassage
          content={pages.getPageField('详细介绍页', 'custom').content}
        />
      </Frame>
      <Frame
        id={'mobileFrame4'}
        height={pages.getPageField('山中之门页', 'mobileLength')}
      >
        <StaticImage />
      </Frame>
      <Frame
        id={'mobileFrame5'}
        height={pages.getPageField('联系信息', 'mobileLength')}
      >
        <Contact />
      </Frame>
    </LargeFrame>
  );
};

export default newMain;
