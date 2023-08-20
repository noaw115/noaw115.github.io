import React, { memo, useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Data from '../../../../GlobalComponents/Data/static';
import * as Image from '../../../../GlobalComponents/image';
import * as Svg from '../../../../GlobalComponents/Data/svgs';
import { PlayGroundContext } from '../../components/RenderPlayGround';

const Frame = styled.div`
  position: relative;
  width: 100%;
  padding: 180px 10vh 0 10vh;
  //padding-top: 200px 10vh;
  height: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  background-color: #EBEBEB;
  flex-direction: column;
  align-items: flex-end;
  color: black;
  filter: blur(${(props) => (props.blur ? '40' : '0')}px);
  transition: 1.2s all ease-out;
`;

const LargeTitle = styled.div`
  font-size: 22px;
  line-height: 42px;
  text-align: right;
`;

const LogoSpace = styled.div`
  //background-color: cadetblue;
  width: 200px;
  height: 50px;
  margin: 50px 0 70px 0;
  align-self: flex-start;
  position: relative;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  //margin-top: 150px;
  width: 500px;
  align-items: flex-start;
  //background-color: yellow;
  font-size: 18px;
  line-height: 26px;
  align-self: flex-start;
  margin-bottom: 20px;
`;

const SmallText = styled.div`
  margin-top: 20px;
  width: 500px;
  align-items: flex-start;
  //background-color: yellow;
  font-size: 16px;
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
  margin-top: 30px;
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
  //margin-top: 10px;
  line-height: 28px;
  transform: translateY(25%);
  transition: 0.5s;
  margin-right: 20px;
  &:hover{
    transform: translateY(-25%);
  }
`;

const Consumer = memo((props) => {
  console.log("props",props)
  return (
    <PlayGroundContext.Consumer>
      {(value) => <Index {...props} offset={value?.offset} firstFlag={value?.firstFlag} />}
    </PlayGroundContext.Consumer>
  );
});

const Index = memo((props) => {
  const { blur, delayTime = 3, offset, width, duration = 3, direction, firstFlag,content:_content } = props;
  const lLTRef = useRef(null);
  const lTRef = useRef(null);
  const lTRef2 = useRef(null);
  const frameRef = useRef();
  const emailRef = useRef()

  const content ={..._content}
  useEffect(() => {
    frameRef.current.style.left = width + 'px';
    lLTRef.current.innerHTML = content.largeTitle;
    lTRef.current.innerHTML = content.text;
    lTRef2.current.innerHTML = content.smallText;
  }, []);

  const reScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    frameRef.current.style.left = '0';
    setTimeout(()=>{
      document.removeEventListener('mousewheel',reScroll, { passive: false })
    },duration*1000)

  };


  useEffect(() => {
    if (offset === 0 && firstFlag.current ) {
      console.log('passage页准备好了');
      setTimeout(() => {
        console.log('开始变形');
        document.addEventListener('mousewheel', reScroll, {passive: false});
        // document.addEventListener('mousewheel',banScrollFor,{passive:false})
      }, delayTime * 1000); // 停留的秒数
    }
    if (offset < 0 && firstFlag.current) {
      console.log('恢复2');
      frameRef.current.style.left = width + 'px';
    }
  }, [offset]);


  return (
    <Frame blur={blur} ref={frameRef} duration={duration} direction={direction}>

      <LargeTitle ref={lLTRef}>Loading</LargeTitle>
      <LogoSpace>
        <LogoImage2 />
      </LogoSpace>
      <Text ref={lTRef}>Loading</Text>
      <SmallText ref={lTRef2}>Loading</SmallText>
      <LeftEmailSpace>
        <EmailAnimation ref={emailRef}>
          {content.leftEmail}
          <br />
          {content.leftEmail}
        </EmailAnimation>
        {Svg.FrontArrow}
      </LeftEmailSpace>
    </Frame>
  );
});

export default Consumer;
