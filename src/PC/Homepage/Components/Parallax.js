import React, { memo, lazy, Suspense } from 'react';
import styled from 'styled-components';
import LoadingParallaxImage from './LoadingParallaxImage';
import ParallaxImage from "./ParallaxImage";

const ParallaxScroll = styled.div`
  height: 100%;
  position: relative;
  transition: 0.6s all ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(${(props) => -1*props.offset}px);
  filter: blur(${(props) => (props.blur ? '20' : '0')}px);
  width: 150%;
`;

const Parallax = memo(({blur = false, percent = 0, children, start = 0, pageLength = 100, percentCorrection = 0}) => {
  console.log("percent",percent)
  const _percent = percent + percentCorrection
  const offset = pageLength*(_percent)
  // console.log("offset",offset)
  return (
    <ParallaxScroll
      blur={blur}
      style={{ overflow: 'visible' }}
      offset={offset}
    >
      {children}
    </ParallaxScroll>
  );
});

export default Parallax;
