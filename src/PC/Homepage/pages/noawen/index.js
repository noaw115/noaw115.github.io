import styled, { keyframes } from 'styled-components';
import * as Images from '../../../../global-components/Images';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import Letter from './components/Letter';
import qe from 'styled-components';
import { clear } from '@testing-library/user-event/dist/clear';

const LargeFrame = styled.div`
  width: 100%;
  height: 100%;
  //background-color: brown;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HalfFrame = styled.div`
  display: flex;
  align-items: center;
  //background-color: coral;
`;

const BetweenSpan = styled.div`
  width: 20px;
  height: 20px;
  transition: all 0.5s ease-out;
  //background-color: red;
`;

const Index = memo(() => {
  const between1 = useRef(null);
  const between2 = useRef(null);
  const between3 = useRef(null);
  const between4 = useRef(null);
  const betweenCenter = useRef(null);
  
  const debounce = () => {
    let f;
    return function (e) {
      cancelAnimationFrame(f);
      f = requestAnimationFrame(() => {
        changeBetweenWidth(e, between1, -1);
        changeBetweenWidth(e, between2, 1);
        changeBetweenWidth(e, between3, -1);
        changeBetweenWidth(e, between4, 1,'width',true);
        changeBetweenWidth(e, betweenCenter, 1, 'height');
      })
    };
  };
  
  const runDebounce =debounce();
  
 
  const changeBetweenWidth = (e, ref, direction = -1, change = 'width',average=false) => {//-1代表左边那个Letter 1代表 右边那个Letter
    if (ref.current ) {
      let dist = ref.current.getBoundingClientRect();
      const horizontal = Math.abs(e.clientX - dist.left + direction * -60);
      const vertical = Math.abs(e.clientY - dist.top - 10);
      const distance = Math.sqrt(horizontal * horizontal + vertical * vertical);
      const inverDistance = 3 - Math.log10(3 * distance + 1);
      ref.current.style[change] = Math.abs(inverDistance * 40).toFixed(2) + 'px';
    }
  };

 
  useEffect(() => {
    window.addEventListener('mousemove', runDebounce);
    return () => {
      console.log('remove了');
      window.removeEventListener('mousemove', runDebounce);
    };
  }, []);
  
  return (
    <LargeFrame id={'noawen.large.frame'}>
      <HalfFrame>
        <Letter
          endXY={{ x: 0, y: 40 }}
          endScale={1.3}
          content={'N'}
          id={'letter.N'}
          center={betweenCenter}
        >
          {Images.N}
        </Letter>
        <BetweenSpan ref={between1} id="between.1" />
        <Letter
          endXY={{ x: 0, y: 0 }}
          startXY={{ x: 100, y: -200 }}
          endScale={1.2}
          content={'O'}
          id={'letter.O'}
          center={betweenCenter}
        >
          {Images.O}
        </Letter>
        <BetweenSpan ref={between2} />
        <Letter
          endXY={{ x: 0, y: 20 }}
          startXY={{ x: 300, y: -200 }}
          endScale={1.3}
          content={'A'}
          id={'letter.A'}
          center={betweenCenter}
        >
          {Images.A}
        </Letter>
      </HalfFrame>
      <HalfFrame>
        <BetweenSpan ref={betweenCenter} />
      </HalfFrame>
      <HalfFrame>
        <Letter
          endXY={{ x: 10, y: 0 }}
          startXY={{ x: -300, y: 200 }}
          endScale={1.3}
          content={'W'}
          id={'letter.W'}
          center={betweenCenter}
        >
          {Images.W}
        </Letter>
        <BetweenSpan ref={between3} />
        <Letter
          endXY={{ x: 20, y: 10 }}
          startXY={{ x: 200, y: 0 }}
          endScale={1.3}
          content={'E'}
          id={'letter.E'}
          center={betweenCenter}
        >
          {Images.E}
        </Letter>
        <BetweenSpan ref={between4} />
        <Letter
          endXY={{ x: 20, y: -20 }}
          startXY={{ x: 310, y: 200 }}
          endScale={1.1}
          content={'N2'}
          id={'letter.N2'}
          center={betweenCenter}
        >
          {Images.N2}
        </Letter>
      </HalfFrame>
    </LargeFrame>
  );
});

export default Index;
