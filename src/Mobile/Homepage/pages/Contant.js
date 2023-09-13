import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Data from '../../../GlobalComponents/Data/static';
import BasicData from '../../../GlobalComponents/Data/movingPara';
import StyledComponents from "../../../global-components/StyledComponents";
import * as Image from "../../../global-components/Images";
import {useNavigate} from "react-router-dom";

const {MontserratFont,MontserratLightFont} = StyledComponents

const Frame = styled.div`
  //background-color: #ebebeb;
  //background-color: yellow;
  position: relative;
  padding-top: 50vh;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-bottom: 5vh;
  width: 100vw;
  box-sizing: border-box;
  flex-shrink: 0;
  font-family: Floane;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  filter: blur(${(props) => (props.blur ? '40' : '0')}px);
  transition: ${BasicData.mobileBlurTime} all ease-out;
`;

const Title = styled(MontserratFont)`
  font-size: 22px;
  //background-color: aqua;
`;

const PassageFrame = styled.div`
  //background-color: #61dafb;
  display: flex;
  flex-direction: column;
  
  justify-content: space-between;
  //background-color: aquamarine;
`;
const PassageFrame2 = styled.div`
  //background-color: red;
  display: flex;
  height: 120px;
  align-items: center;
  margin-top: 80px;
  font-size: 20px;
  justify-content: space-between;
  position: relative;
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
const LogoImage2 = styled.div`
  width: 180px;
  height: 70px;
  //background-color: yellow;
  background-image: url(${Image.LogoBlack});
  background-size: contain;
  background-repeat: no-repeat;
  transition: 0.5s all;
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
  const navigate = useNavigate();
  const handleLinkTo = (text) => {
    console.log("跳",`/${text}`)
    navigate(`${window.__route__}/${text}`)
  }
  return (
    <Frame>
      <PassageFrame style={{height:'100px'}}>
        <div onClick={()=>handleLinkTo('WEB&UI DESIGN')}>WEB & UI DESIGN</div>
        <div onClick={()=>handleLinkTo('MODELING')}>MODELING</div>
        <div onClick={()=>handleLinkTo('GRAPHICS')}>GRAPHICS</div>
      </PassageFrame>
      <PassageFrame2>
        <PassageFrame  style={{height:'100%'}}>
          <div>Inquiries</div>
          <div>Behance</div>
          <div>Instagram</div>
          <div>Twitter</div>
        </PassageFrame>
        <LogoImage2/>
      </PassageFrame2>
      <MontserratFont>©️Noaw all rights reserved.</MontserratFont>
    </Frame>
  );
}

export default MobilePassage;
