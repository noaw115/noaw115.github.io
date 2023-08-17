import React, { memo, lazy, Suspense } from 'react';
import styled from 'styled-components';


const ParallaxScroll = styled.div`
  height: 100%;
  position: relative;
  transition: 0.6s all ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(${(props) => -1*props.offset}px);
  filter: blur(${(props) => (props.blur ? '20' : '0')}px);
  width: 110%;
`;

export const calOffset = (percent, percentCorrection, pageLength) => {
  // console.log("percentCorrection应该=",-1*(percent + percentCorrection).toFixed(2))
  return pageLength * (percent + percentCorrection).toFixed(2);
};

const Parallax = memo(({blur = false, percent = 0, children, start = 0, pageLength = 100, percentCorrection = 0}) => {
  const offset = calOffset(percent, percentCorrection, pageLength)
  
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
