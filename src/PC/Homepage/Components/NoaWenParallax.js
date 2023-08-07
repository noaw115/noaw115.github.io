import React, { memo, lazy, Suspense, useEffect, useRef } from 'react';
import styled from 'styled-components';
import LoadingParallaxImage from './LoadingParallaxImage';
import ParallaxImage from './ParallaxImage';
import { PlayGroundContext } from './RenderPlayGround';

const ParallaxScroll = styled.div`
  height: 100%;
  position: relative;
  transition: 0.6s all ease-out,
  ${(props) => {
    if (props.direction){
      return props.duration + 's'
    }else {
      return '0.6s'
    }
  }} width ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(${(props) => -1 * props.offset}px);
  filter: blur(${(props) => (props.blur ? '20' : '0')}px);
  width: 100vw;
`;

const Consumer = memo((props) => {
  return (
    <PlayGroundContext.Consumer>
      {(value) => <NoaWenParallaxInner {...props} offset={value} />}
    </PlayGroundContext.Consumer>
  );
});

const NoaWenParallaxInner = memo((props) => {
  const {
    offset,
    children,
    delayTime = 3,
    blur,
    duration = 3,
    direction = true,
  } = props;
  const parallaxRef = useRef();
  // console.log("value-",value)
  const cannotScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const reScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    parallaxRef.current.style.width = '100%';
    document.removeEventListener('mousewheel', reScroll,{
      passive: false,
    })
  }
  useEffect(() => {
    if (direction && offset === 0) { //direction表示必须是正向移动
      document.addEventListener('mousewheel', cannotScroll, {
        passive: false,
      });
      setTimeout(() => {
        // console.log('开始变形');
        document.removeEventListener('mousewheel', cannotScroll, {
          passive: false,
        });
        document.addEventListener('mousewheel', reScroll,{
          passive: false,
        })
      }, delayTime * 1000); // noawen停留的秒数
    }
    if (offset < 0) {
      // console.log('恢复');
      parallaxRef.current.style.width = '100vw';
    }
  }, [offset]);
  console.log('offset', offset);

  return (
    <ParallaxScroll
      ref={parallaxRef}
      blur={blur}
      style={{ overflow: 'visible' }}
      offset={offset}
      duration={duration}
      direction={direction}
    >
      {children}
    </ParallaxScroll>
  );
});

export default Consumer;
