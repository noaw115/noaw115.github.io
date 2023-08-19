import styled from 'styled-components';
import React, {useEffect, useMemo, useRef, useState} from "react";

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// const CursorDiv = styled.div`
//   width: 70px;
//   height: 70px;
//   position: absolute;
//   background: black;
//   opacity: 0.1;
//   border-radius: 70px;
//   filter: blur(6px);
//   z-index: 20;
//   //transition:0.1s all linear;
// `;


const Text = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  font-family: Floane;
  font-size: 20px;
  transition: 0.3s ease-out;
  
`
const Circle = styled(Text)`
  border-radius: 50px;
  background: black;
`
const CursorDiv = styled.div`
  position: absolute;
  z-index: 1000;
  display: flex;
  pointer-events: none;
`
export const CursorContext = React.createContext();

export default function (props) {
  const { children } = props;
  const cursorRef = useRef(null)
  const circleRef = useRef(null)
  const textRef = useRef(null)


  const elementList = useMemo(()=> [],[])
  const debounce = () => {
    let f;
    return function (e) {
      cancelAnimationFrame(f);
      f = requestAnimationFrame(() => {
        if (cursorRef) {
          // console.log("elementList",elementList)
          if (isMouseOverElements(e,elementList)){
            cursorChangeToClick()
          } else {
            cursorChangeToDefault()
          }
          const selfWidth = cursorRef.current.offsetWidth
          // console.log("鼠标位置",e.clientX,e.clientY,selfWidth)
          cursorRef.current.style.left = (e.clientX-selfWidth/2)+'px'
          cursorRef.current.style.top = (e.clientY-selfWidth/2)+'px'

        }
      })
    };
  };
  const runDebounce =debounce();



  useEffect(()=>{
    window.addEventListener('mousemove', runDebounce);
    return ()=>{
      window.removeEventListener('mousemove', runDebounce);
    }
  },[])

  const cursorChangeToDefault = () => {
    circleRef.current.style.filter = 'blur(0)'
    circleRef.current.style.width = '10px'
    circleRef.current.style.height = '10px'
    circleRef.current.style.opacity = '0.4'
    textRef.current.innerHTML = ''
  }

  const cursorChangeToClick = () => {
    circleRef.current.style.filter = 'blur(6px)'
    circleRef.current.style.width = '70px'
    circleRef.current.style.height = '70px'
    circleRef.current.style.opacity = '0.1'
    textRef.current.innerHTML = 'CLICK'
  }

  const isMouseOverElements = (event, elementList) => {
    let res = false;
    // console.log("elementList",elementList)
    if (elementList && elementList.length>0){
      elementList.forEach((element)=>{
        if (isMouseOverElement(event,element)) {
          // console.log("isMouseOverElement")
          res = true;
        }
      })
    }
    return res
  }

  const isMouseOverElement = (event, element) => {
    if (element && element.current) {
      const {left,top,right,bottom} = element.current.getBoundingClientRect()
      return ( event.clientX >= left &&
        event.clientX <= right &&
        event.clientY >= top &&
        event.clientY <= bottom )
    }
    return false
  }

  const pushElement = (element) => {
    elementList.push(element)
  }

  return (

    <Frame>
      <CursorDiv style={{position:'absolute', zIndex:'20', borderRadius:'70px'}} ref={cursorRef}>
        <div style={{position:"relative"}}>
          <Circle ref={circleRef}/>
          <Text ref={textRef}/>
        </div>

      </CursorDiv>
      <CursorContext.Provider value={pushElement}>
        {children}
      </CursorContext.Provider>
    </Frame>
  );
}
