import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Data from '../../../GlobalComponents/Data/static';
import BasicData from '../../../GlobalComponents/Data/movingPara';
import StyledComponents from "../../../global-components/StyledComponents";

const {MontserratFont,MontserratLightFont} = StyledComponents

const Frame = styled.div`
  background-color: #ebebeb;
  position: relative;
  padding-top: 7vh;
  padding-left: 5vw;
  padding-right: 5vw;
  width: 100vw;
  box-sizing: border-box;
  flex-shrink: 0;
  color: black;
  filter: blur(${(props) => (props.blur ? '40' : '0')}px);
  transition: ${BasicData.mobileBlurTime} all ease-out;
`;
const Title = styled(MontserratFont)`
  font-size: 22px;
  //background-color: aqua;
`;

const PassageFrame = styled.div`
  //background-color: #61dafb;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  //background-color: aquamarine;
`;

const LeftPassage = styled(MontserratLightFont)`
  //background-color: red;
  width: 100%;
  flex-shrink: 0;
  margin-right: 132px;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 60px;
`;

const RightPassage = styled(MontserratLightFont)`
  //background-color: blue;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  line-height: 26px;
`;

function MobilePassage(props) {
  let { blur, content: _content } = props;
  const titleRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const content = { ..._content };
  useEffect(() => {
    titleRef.current.innerHTML = content.largeTitle;
    text1Ref.current.innerHTML = content.text;
    text2Ref.current.innerHTML = content.smallText;
  }, []);

  return (
    <Frame blur={blur}>
      <Title ref={titleRef}>Loading...</Title>
      <PassageFrame>
        <LeftPassage ref={text1Ref}>Loading...</LeftPassage>
        <LeftPassage ref={text2Ref}>Loading...</LeftPassage>
      </PassageFrame>
    </Frame>
  );
}

export default MobilePassage;
