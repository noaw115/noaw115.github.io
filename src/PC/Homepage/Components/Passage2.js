import React, { memo, useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Data from '../../../GlobalComponents/Data/static';
import * as Image from '../../../GlobalComponents/image';
import * as Svg from '../../../GlobalComponents/Data/svgs';

const Frame = styled.div`
  position: relative;
  width: 100%;
  padding: 10vh;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: black;
  filter: blur(${(props) => (props.blur ? '40' : '0')}px);
  transition: 1.2s all ease-out;
`;

const LargeTitle = styled.div`
  margin-top: 100px;
  font-size: 24px;
  line-height: 42px;
  align-self: flex-end;
  text-align: right;
`;

const LogoSpace = styled.div`
  //background-color: cadetblue;
  width: 200px;
  height: 80px;
  margin-bottom: 40px;
  align-self: flex-end;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  margin-top: 150px;
  width: 50%;
  align-items: flex-start;
  //background-color: yellow;
  font-size: 16px;
  line-height: 20px;
  align-self: flex-start;
  margin-bottom: 20px;
`;

const SmallText = styled.div`
  margin-top: 20px;
  width: 50%;
  align-items: flex-start;
  //background-color: yellow;
  font-size: 14px;
  line-height: 20px;
  align-self: flex-start;
  margin-bottom: 20px;
`;

const LeftEmailSpace = styled.div`
  //background-color: aquamarine;
  position: relative;
  height: 28px;
  overflow: hidden;
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-top: 10px;
`;

const LogoImage2 = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${Image.LogoBlack});
  background-size: contain;
  background-repeat: no-repeat;
  transition: 0.5s all;
`;

const EmailAnimation = styled.div`
  //position: absolute;
  //background-color: coral;
  font-size: 20px;

  line-height: 28px;
  transform: translateY(25%);
  transition: 0.5s;
  &:hover {
    transform: translateY(-25%);
  }
  margin-right: 20px;
`;

function FitText(lLTRef, lTRef) {
  lLTRef.current.innerHTML = Data.HomepageData[2].content.largeTitle;
  lTRef.current.innerHTML = Data.HomepageData[2].content.text;
}

const Passage2 = memo((props) => {
  let { blur } = props;
  const lLTRef = useRef(null);
  const lTRef = useRef(null);
  const lTRef2 = useRef(null);
  useEffect(() => {
    lLTRef.current.innerHTML = Data.HomepageData[2].content.largeTitle;
    lTRef.current.innerHTML = Data.HomepageData[2].content.text;
    lTRef2.current.innerHTML = Data.HomepageData[2].content.smallText;
  }, []);

  return (
    <Frame blur={blur}>
      <LogoSpace>
        <LogoImage2 />
      </LogoSpace>
      <LargeTitle ref={lLTRef}>Loading</LargeTitle>

      <Text ref={lTRef}>Loading</Text>
      <SmallText ref={lTRef2}>Loading</SmallText>
      <LeftEmailSpace>
        <EmailAnimation>
          {Data.HomepageData[2].content.leftEmail}
          <br />
          {Data.HomepageData[2].content.leftEmail}
        </EmailAnimation>
        {Svg.FrontArrow}
      </LeftEmailSpace>
    </Frame>
  );
});

export default Passage2;
