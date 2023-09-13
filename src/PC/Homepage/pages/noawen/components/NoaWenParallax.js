import React, { memo, lazy, Suspense, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { PlayGroundContext } from '../../../components/RenderPlayGround';
import { observer } from 'mobx-react';

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

const Consumer = observer((props) => {
  return (
    <PlayGroundContext.Consumer>
      {(value) => <NoaWenParallaxInner {...props} offset={value?.offset} firstFlag={value?.firstFlag} />}
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
    firstFlag,
    store,
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
    if (firstFlag.current && offset === 0) { //direction表示必须是正向移动
      // console.log("到位了？",store.deltaX)
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
        firstFlag.current = false
        store.firstShowPlayground = false
      }, delayTime * 1000); // noawen停留的秒数
    }
    if (offset < 0 && firstFlag.current) {
      parallaxRef.current.style.width = '100vw';
    }
  }, [offset]);
  // console.log('offset', offset);

  return (
    <ParallaxScroll
      ref={parallaxRef}
      blur={blur}
      style={{ overflow: 'visible' }}
      offset={offset}
      duration={duration}
    >
      {children}
    </ParallaxScroll>
  );
});

export default Consumer;
