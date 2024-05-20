import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Data from '../apiData/static';
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Image from './Images';

const Works = styled.div`
  //background-color: red;
  height: 400px;
  width: 600px;
  position: absolute;
  right: ${(props) => props.right}%;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  bottom: ${(props) => props.bottom}%;
  transform: scale(${(props) => props.scale});
  transform-origin: left center;
`;
const WorksInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  //background-color: #61dafb;
`;
const ShakePicture = styled.div`
  position: absolute;
  left: 10px;
  top: 20px;
  z-index: 2;
  animation: ${(props) => {
      return keyframes`
            
            0%{
              transform: scale(1)  translateY(0px);
            }
            
            100%{
              transform: scale(1.05) translateY(2px);
            }
            
           `;
    }}
    ease-in-out ${(props) => props.interval}s infinite;
  animation-direction: alternate;
  animation-delay: ${(props) => props.delay}s;
`;
const Mask = styled.div`
  height: 370px;
  width: 170px;
  overflow: hidden;
  border-radius: 170px 170px 0 0;
  background-color: #f0f0f0;
  position: relative;
  border: 1px #d6d6d6 solid;
  transition: 0.3s all;
`;
const MaskShadow = styled.div`
  height: 320px;
  width: 170px;
  overflow: hidden;
  top: 80px;
  left: 20px;
  border-radius: 170px 170px 0 0;
  background-color: #f0f0f0;
  position: absolute;
  transition: 0.3s all;
`;
const DoorImg = styled.img`
  z-index: 1;
  top: -10%;
  position: absolute;
  transform-origin: center center;
  transition: 0.5s all ease-out;
`;
const WorksTitle = styled.div`
  font-family: Floane;
  font-size: 26px;
  color: black;
  //background-color: aqua;
  width: 200px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left || '60'}px;
`;
export default function (props) {
  const {
    pushElement = () => {},
    innerStyle,
    outerStyle,
    titleStyle,
    delay,
    interval,
    index,
    chineseText,
    scale = 1,
    text,
    isMobile = false,
  } = props;

  const navigate = useNavigate();

  const handleLinkTo = (text) => {
    // console.log('跳', `/${text}`);
    navigate(`${window.__route__}/${text}`);
  };

  const workRef = useRef();
  const shadowRef = useRef();
  const imgRef = useRef();
  useEffect(() => {
    if (workRef) {
      pushElement(workRef);
    }
  }, [workRef]);

  const handleShadowAnimation = () => {
    if (!isMobile && shadowRef && imgRef) {
      shadowRef.current.style.backgroundColor = '#FAFAFA';
      shadowRef.current.style.transform = 'translateY(10px)';
      imgRef.current.style.transform = 'scale(1.1)';
      setTimeout(() => {
        shadowRef.current.style.backgroundColor = '#f0f0f0';
        shadowRef.current.style.transform = 'translateY(0)';
        imgRef.current.style.transform = 'scale(1)';
      }, 1000);
    }
  };
  return (
    <Works
      left={outerStyle.left}
      bottom={outerStyle.bottom}
      top={outerStyle.top}
      right={outerStyle.right}
      scale={scale}
    >
      <WorksInner onClick={() => handleLinkTo(text)}>
        <ShakePicture delay={delay} interval={interval}>
          <MaskShadow ref={shadowRef} />
          <Mask ref={workRef} onMouseEnter={handleShadowAnimation}>
            <DoorImg
              ref={imgRef}
              style={{ height: innerStyle.height, left: innerStyle.left }}
              src={Image.DoorImage}
            />
          </Mask>

          <WorksTitle top={titleStyle.top} left={titleStyle.left}>
            <div style={{ marginBottom: '10px', fontFamily: 'XiaoWei' }}>
              {chineseText}
            </div>
            <div>{text}</div>
          </WorksTitle>
        </ShakePicture>
      </WorksInner>
    </Works>
  );
}
