import React, { memo, lazy, Suspense } from 'react';
import styled from 'styled-components';
import LoadingParallaxImage from './LoadingParallaxImage';
import ParallaxImage from "./ParallaxImage";

const ParallaxScroll = styled.div`
  height: 100%;
  position: relative;
  transition: 0.6s all ease-out;
  transform: translateX(-${(props) => props.offset}px);
  filter: blur(${(props) => (props.blur ? '20' : '0')}px);
  width: 100%;
`;

const Parallax = memo(({blur = false, offset = () => {}, children}) => {
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
