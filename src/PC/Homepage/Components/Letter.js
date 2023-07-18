import * as Images from '../../../GlobalComponents/image';
import React, { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getElementError } from '@testing-library/react';



const LetterShadow = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  //background-color: coral;
  display: flex;
  justify-content: center;
  align-items: center;
  //transition: all 3s;
  //opacity: ${(props) => props.opacity};
  filter: blur(10px);
  // transform: scale(${(props) => props.scale});
  transition: 0.5s all ease-out;
  left: 0;
  top: 0;
  //transform: translate(50px,50px);
  //top: ;
`;
const LetterSelf = styled.div`
  width: 100%;
  height: 100%;
  //left:10px;
  transform: scale(${(props) => props.scale}) translate(${(props) => props.left}px,${(props) => props.top}px);
  // top: ${(props) => props.top}px;
  //background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LetterDiv = styled.div`
  width: 120px;
  height: 150px;
  //background-color: #0c0c0c;
  opacity: 0.7;
  margin: 1px;
  position: relative;
  transform-origin: left top;
`;
const Image = styled.img`
  width: 100px;
  position: absolute;
`;

const Letter = (props) => {
  const { content, children, center, endXY, endScale } = props;
  const shadowRef = useRef(null);
  const shadowRef2=useRef(null)
  const debounce = (func) => {
    let f;
    return function () {
      const context = this;
      const args = arguments;
      cancelAnimationFrame(f);
      f = requestAnimationFrame(function () {
        func.apply(context, args);
      });
    };
  };
  useEffect(() => {
    // if (content === 'N') {
    window.addEventListener(
      'mousemove',
      debounce((e) => {
        if (center.current){
          let distToCenter = center.current.getBoundingClientRect();
          const horizontalCenter = (e.clientX - distToCenter.left).toFixed(2);
          const verticalCenter = (e.clientY - distToCenter.top).toFixed(2);
          const distanceCenter = Math.sqrt(
            horizontalCenter * horizontalCenter + verticalCenter * verticalCenter
          );
          const calDis = Math.log10(10 * distanceCenter + 1) / 2.6;
          const thisLetter = document.getElementById(`letter.${props.content}`);
  
          let dist = thisLetter.getBoundingClientRect();
          const horizontal = (e.clientX - dist.left).toFixed(2)+endXY.x;
          const vertical = (e.clientY - dist.top).toFixed(2)+endXY.y;
  
          const calHor =
            horizontal > 0
              ? 10 * Math.log10(10 * horizontal + 1)
              : -10 * Math.log10(-10 * horizontal + 1);
          const calVer =
            horizontal > 0
              ? 10 * Math.log10(10 * vertical + 1)
              : -10 * Math.log10(-10 * vertical + 1);
          
          shadowRef.current.style.left = `${-1 * calHor}px`;
          shadowRef.current.style.top = `${-1 * calVer}px`;
          shadowRef.current.style.transform = `scale(${calDis})`;
  
          shadowRef2.current.style.left = `${-5 * calHor}px`;
          shadowRef2.current.style.top = `${-5 * calVer}px`;
          shadowRef2.current.style.transform = `scale(3)`;
        }
      })
    );
    // }
  }, []);
  console.log("检测",-1 * endXY.y)
  return (
    <LetterDiv id={props.id}>
      <LetterShadow ref={shadowRef}>
        <Image src={children} rotate={props.rotate} />
      </LetterShadow>
      <LetterShadow ref={shadowRef2} style={{opacity:'0.3', filter:'blur(20px);'}}>
        <Image src={children} rotate={props.rotate} />
      </LetterShadow>
      <LetterSelf left={endXY.x} top={-1 * endXY.y} scale={endScale}>
        <Image src={children} />
      </LetterSelf>
    </LetterDiv>
  );
};

export default Letter;
