import React, { memo } from 'react';
import styled from 'styled-components';
const BackgroundFrame = styled.div`
  width: ${(props) => props.width}vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  justify-content: center;
  transition: 0.4s all ease-out;
  align-items: center;
`;
const BackgroundImage2 = styled.div`
  position: absolute;
  //z-index: -1;
  background-image: linear-gradient(
    to right,
    #fafafa 70%,
    rgba(12, 129, 208, 0.1) 100%
  );
  //opacity: 0.2;
  background-size: cover;
  background-repeat: no-repeat;
  height: ${(props) => props.height}vh;
  width: 100%;
  transition: 0.4s all ease-out;
  transform: scale(${(props) => props.scale});
  transform-origin: center center;
  //filter: blur(${(props) => props.blur}px);
`;

const FirstBackground = memo((props) => {
  return (
    <BackgroundFrame width={props.width}>
      <BackgroundImage2 height={props.height} />
      {props.children}
    </BackgroundFrame>
  );
});

export default FirstBackground;
