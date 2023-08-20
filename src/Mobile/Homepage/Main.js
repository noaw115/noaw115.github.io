import React from 'react';
import styled, { keyframes } from 'styled-components';
import MobileDoors from './components/Doors';
import * as Data from '../../GlobalComponents/Data/static';
import * as Image from '../../global-components/Images';
import MobilePassage from './components/Passage';
import MobilePassage2 from './components/Passage2';
import BasicData from '../../GlobalComponents/Data/movingPara';
import {PageData} from "../../global-components/utils";
import WithFlowers from "../../global-components/WithFlowers";

const ShowImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.source});
  background-size: cover;
`;

const Frame = styled.div`
  background-color: ${(props) => props.color ? props.color : 'white'};
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
  return(
    <LargeFrame>
      <Frame
        id={'mobileFrame0'}
        height={pages.getPageField('门的页面', 'mobileLength') }
      >
        <MobileDoors />
      </Frame>
      {/*<Frame*/}
      {/*  id={'mobileFrame2'}*/}
      {/*  height={pages.getPageField('视差滚动NOA', 'mobileLength') }*/}
      {/*>*/}
      {/*  <MobilePassage content={pages.getPageField('详细介绍页', 'custom').content}/>*/}
      {/*</Frame>*/}
      <Frame
        id={'mobileFrame3'}
        height={pages.getPageField('详细介绍页', 'mobileLength') }
      >
        <MobilePassage content={pages.getPageField('详细介绍页', 'custom').content}/>
      </Frame>
      <Frame
        id={'mobileFrame4'}
        height={pages.getPageField('山中之门页', 'mobileLength') }
      >
        <WithFlowers scale={0.7}>
          <ShowImage source={Image.GreenBack} />
        </WithFlowers>

      </Frame>
      <Frame
        id={"mobileFrame5"}
        height={pages.getPageField('联系信息', 'mobileLength') }
      >
          {/*<MobilePassage2/>*/}
      </Frame>
    </LargeFrame>
  )
}

export default newMain;
