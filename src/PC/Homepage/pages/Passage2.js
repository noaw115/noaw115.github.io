import React, { memo, useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Data from '../../../GlobalComponents/Data/static';
import * as Image from '../../../GlobalComponents/image';
import * as Svg from '../../../GlobalComponents/Data/svgs';
import { PlayGroundContext } from '../components/RenderPlayGround';

const Frame = styled.div`
  position: relative;
  width: 100%;
  padding: 10vh;
  height: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  background-color: #EBEBEB;
  flex-direction: column;
  align-items: flex-end;
  color: black;
  filter: blur(${(props) => (props.blur ? '40' : '0')}px);
  transition: 1.2s all ease-out,
    ${(props) => {
        if (props.direction) {
          return props.duration + 's';
        } else {
          return '1.2s';
        }
      }}
      left ease-out;
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

const Consumer = memo((props) => {
  return (
    <PlayGroundContext.Consumer>
      {(value) => <Passage2 {...props} offset={value} />}
    </PlayGroundContext.Consumer>
  );
});

const Passage2 = memo((props) => {
  const { blur, delayTime = 3, offset, width, duration = 3, direction } = props;
  const lLTRef = useRef(null);
  const lTRef = useRef(null);
  const lTRef2 = useRef(null);
  const frameRef = useRef();
  useEffect(() => {
    frameRef.current.style.left = width + 'px';
    lLTRef.current.innerHTML = Data.HomepageData[2].content.largeTitle;
    lTRef.current.innerHTML = Data.HomepageData[2].content.text;
    lTRef2.current.innerHTML = Data.HomepageData[2].content.smallText;
  }, []);

  const reScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    frameRef.current.style.left = '0';
    setTimeout(()=>{
      document.removeEventListener('mousewheel',reScroll, { passive: false })
    },duration*1000)

  };

  // const banScrollFor = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setTimeout(()=>{
  //     document.removeEventListener('mousewheel',banScrollFor, { passive: false })
  //   },duration*1000)
  // }
  // console.log("offset是啥",offset)

  useEffect(() => {
    if (offset === 0) {
      console.log('passage页准备好了');
      setTimeout(() => {
        console.log('开始变形');
        document.addEventListener('mousewheel', reScroll, {passive: false});
        // document.addEventListener('mousewheel',banScrollFor,{passive:false})
      }, delayTime * 1000); // 停留的秒数
    }
    if (offset < 0) {
      console.log('恢复');
      frameRef.current.style.left = width + 'px';
    }
  }, [offset]);

  return (
    <Frame blur={blur} ref={frameRef} duration={duration} direction={direction}>
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

export default Consumer;
