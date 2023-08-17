import { Link } from 'react-router-dom';
import * as Data from '../../../../../GlobalComponents/Data/static';
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Image from '../../../../../GlobalComponents/image';

const Works = styled.div`
  //background-color: red;
  height: 400px;
  width: 600px;
  position: absolute;
  right: ${(props) => props.right}vw;
  left: ${(props) => props.left}vw;
  top: ${(props) => props.top}vh;
  bottom: ${(props) => props.bottom}vh;
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
  border: 1px #D6D6D6 solid;
  transition: 0.3s all;
`;
const MaskShadow = styled.div`
  height: 370px;
  width: 170px;
  overflow: hidden;
  top: 40px;
  left: 40px;
  border-radius: 170px 170px 0 0;
  background-color: #f0f0f0;
  position: absolute;
  transition: 0.5s all;
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
  // background-color: #282c34;
  position: absolute;
  top: ${(props) => props.top}px;
  left: 230px;
`;
export default function (props) {
  const { pushElement, innerStyle, outerStyle, titleStyle, delay, interval,index } = props;
  const workRef = useRef();
  const shadowRef= useRef();
  const imgRef= useRef();
  useEffect(() => {
    if (workRef) {
      pushElement(workRef);
    }
  }, [workRef]);

  return (
    <Works left={outerStyle.left} bottom={outerStyle.bottom} top={outerStyle.top} right={outerStyle.right}>
      <Link to={`/${Data.HomepageData[0].contend[`Door${index}`].text}`}>
        <WorksInner>
          <ShakePicture delay={delay} interval={interval}>
            <MaskShadow ref={shadowRef}/>
            <Mask ref={workRef} onMouseEnter={()=>{
              shadowRef.current.style.backgroundColor = '#FAFAFA'
              imgRef.current.style.transform = 'scale(1.1)'
              setTimeout(()=>{
                shadowRef.current.style.backgroundColor = '#f0f0f0'
                imgRef.current.style.transform = 'scale(1)'
              },1000)
            }}>
              <DoorImg
                ref={imgRef}
                style={{ height: innerStyle.height, left: innerStyle.left }}
                src={Image.DoorImage}
              />
            </Mask>

            <WorksTitle top={titleStyle.top}>
              {Data.HomepageData[0].contend[`Door${index}`].text}
            </WorksTitle>
          </ShakePicture>
        </WorksInner>
      </Link>
    </Works>
  );
}
