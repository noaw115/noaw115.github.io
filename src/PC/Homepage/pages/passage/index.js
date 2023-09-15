import React, { memo, useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import StyledComponents from '../../../../global-components/StyledComponents';
import {handleEmail} from "../../../../global-components/utils";
const { MontserratFont } = StyledComponents;

const Frame = styled.div`
  //background-color: #61dafb;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 90px;
  padding-bottom: 30px;
  padding-right: 50px;
  box-sizing: border-box;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 18px;
  flex-shrink: 0;
  //filter: blur(${(props) => (props.blur ? '40' : '0')}px);
  transition: 1.2s all ease-out;
`;
const Title = styled.div`
  font-size: 20px;
  color: black;
  font-family: Floane;
`;



const OnePassage = styled(MontserratFont)`
  // background-color: cadetblue;
`;

const Index = memo((props) => {
  let { blur, pushElement } = props;
  const clickRef = useRef();
  useEffect(() => {
    if (clickRef) {
      pushElement(clickRef,'no-text');
    }
  }, [clickRef]);
  return (
    <Frame blur={blur}>
      <div />
      <Title ref={clickRef}>
        <div onClick={handleEmail}>Inquiries</div>
        <div>Behance</div>
        <div>Instagram</div>
        <div>Twitter</div>
      </Title>
      <OnePassage>©️Noaw all rights reserved.</OnePassage>
    </Frame>
  );
});

export default Index;
