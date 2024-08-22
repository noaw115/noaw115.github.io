import styled from 'styled-components';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  //background-color: red;
  overflow: hidden;
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
`;
const Circle = styled(Text)`
  border-radius: 50px;
  background: black;
  //mix-blend-mode: difference; // 或者 'screen'
  //transition: 0.3s ease-out;
`;
const CursorDiv = styled.div`
  position: absolute;
  z-index: 1000;
  display: flex;
  pointer-events: none;
  //mix-blend-mode: difference; // 或者 'screen'
`;
export const CursorContext = React.createContext();

export default function (props) {
  const { children } = props;
  const cursorRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  const elementList = useMemo(() => [], []);
  const debounce = () => {
    let f;
    return function (e) {
      cancelAnimationFrame(f);
      f = requestAnimationFrame(() => {
        if (cursorRef) {
          // console.log("elementList",elementList)
          if (!isMouseOverElements(e, elementList)) {
            cursorChangeToDefault();
          }
          const selfWidth = cursorRef.current.offsetWidth;
          // console.log("鼠标位置",e.clientX,e.clientY,selfWidth)
          cursorRef.current.style.left = e.clientX - selfWidth / 2 + 'px';
          cursorRef.current.style.top = e.clientY - selfWidth / 2 + 'px';
        }
      });
    };
  };
  const runDebounce = debounce();

  useEffect(() => {
    window.addEventListener('mousemove', runDebounce);
    return () => {
      window.removeEventListener('mousemove', runDebounce);
    };
  }, []);

  const cursorChangeToDefault = () => {
    circleRef.current.style.filter = 'blur(0)';
    circleRef.current.style.width = '10px';
    circleRef.current.style.height = '10px';
    circleRef.current.style.opacity = '0.4';
    textRef.current.innerHTML = '';
    textRef.current.style.color = 'black';
    circleRef.current.style.backgroundColor = 'black';
  };

  const cursorChangeToClick = (color) => {
    if (color === 'white') {
      circleRef.current.style.backgroundColor = color;
      circleRef.current.style.opacity = '0.5';
      textRef.current.style.color = color;
      textRef.current.innerHTML = 'EMAIL';
    } else if (color === 'no-text') {
      textRef.current.innerHTML = '';
      circleRef.current.style.opacity = '0.1';
      circleRef.current.style.backgroundColor = 'black';
    } else {
      textRef.current.innerHTML = 'CLICK';
      circleRef.current.style.opacity = '0.1';
      circleRef.current.style.backgroundColor = 'black';
    }
    circleRef.current.style.filter = 'blur(6px)';
    circleRef.current.style.width = '70px';
    circleRef.current.style.height = '70px';
  };

  const isMouseOverElements = (event, elementList) => {
    let res = false;
    // console.log("elementList",elementList)
    if (elementList && elementList.length > 0) {
      elementList.forEach(({ element, color }) => {
        if (isMouseOverElement(event, element, color)) {
          // console.log("isMouseOverElement")
          res = true;
        }
      });
    }
    return res;
  };

  const isMouseOverElement = (event, element, color) => {
    if (element && element.current) {
      const { left, top, right, bottom } =
        element.current.getBoundingClientRect();

      if (
        event.clientX >= left &&
        event.clientX <= right &&
        event.clientY >= top &&
        event.clientY <= bottom
      ) {
        // console.log("此时color",color)
        cursorChangeToClick(color);
        return true;
      }
    }
    return false;
  };

  const pushElement = (element, color) => {
    elementList.push({ element, color });
  };

  return (
    <Frame>
      <CursorDiv
        style={{ position: 'absolute', zIndex: '20', borderRadius: '70px' }}
        ref={cursorRef}
      >
        <div style={{ position: 'relative' }}>
          <Circle ref={circleRef} />
          <Text ref={textRef} />
        </div>
      </CursorDiv>
      <CursorContext.Provider value={pushElement}>
        {children}
      </CursorContext.Provider>
    </Frame>
  );
}
