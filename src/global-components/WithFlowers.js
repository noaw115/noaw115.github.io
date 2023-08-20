import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as Image from './Images';
const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  //background-color: white;
  z-index: 1;
  overflow: visible;
`;

const Shake = styled.div`
  transition: 0.7s all ease-out;
  transform: ${(props) =>
    props.flag ? 'translateY(-10px) rotate(1.1deg) scale(1.01)' : 'none'};
`;
const RedDoorDiv = styled(Shake)`
  width: 252px;
  height: 557px;
  position: absolute;
  background-image: url(${Image.RedDoor});
  background-repeat: no-repeat;
  background-position: center;
  left: 50%;
  top: 35%;
  z-index: 10;
  transform: translateX(-50%) scale(${props=>props.scale});
`;

const LeftDiv = styled(Shake)`
  width: 540px;
  height: 82%;
  position: absolute;
  //background-color: red;
  background-image: url(${Image.LeftFlower});
  background-size: contain;
  background-repeat: no-repeat;
  top: 22%;
  left: -50px;
  z-index: 10;
  transform: scale(${props=>props.scale});
  transform-origin: left bottom;
  //z-index: 1000;
`;
const RightBottomDiv = styled(Shake)`
  width: 540px;
  height: 600px;
  position: absolute;
  //background-color: red;
  background-image: url(${Image.RightBottomFlower});
  background-size: contain;
  background-repeat: no-repeat;
  bottom: -20px;
  right: -200px;
  z-index: 10;
  transform: scale(${props=>props.scale});
  transform-origin: right bottom;
  //z-index: 1000;
`;
const RightTopDiv = styled(Shake)`
  width: 340px;
  height: 800px;
  position: absolute;
  //background-color: red;
  background-image: url(${Image.RightTopFlower});
  background-size: contain;
  background-repeat: no-repeat;
  top: 0;
  right: -100px;
  z-index: 10;
  transform: scale(${props=>props.scale});
  transform-origin: right top;
  //z-index: 1000;
`;
const TopDiv = styled(Shake)`
  width: 70%;
  position: absolute;
  height: 300px;
  //background-color: red;
  background-image: url(${Image.TopFlower});
  background-size: contain;
  background-repeat: no-repeat;
  top: -20px;
  left: -150px;
  z-index: 10;
  transform: scale(${props=>props.scale});
  transform-origin: right center;
  //z-index: 1000;
`;
const ImageWithFlower = memo((props) => {
  const { children, pushElement = () => {} , scale= 1 } = props;

  const redDoorRef = useRef();
  const [rightTopFlag, setRTFlag] = useState(false);
  const [rightBottomFlag, setRBFlag] = useState(false);
  const [topFlag, setTFlag] = useState(false);
  const [leftFlag, setLFlag] = useState(false);

  useEffect(() => {
    if (redDoorRef) {
      pushElement(redDoorRef);
    }
  }, [redDoorRef]);
  console.log("floer",topFlag)
  return (
    <Frame>
      <RightTopDiv
        onMouseEnter={() => setRTFlag(!rightTopFlag)}
        flag={rightTopFlag}
        scale={scale}
      />
      <RightBottomDiv
        onMouseEnter={() => setRBFlag(!rightBottomFlag)}
        flag={rightBottomFlag}
        scale={scale}
      />
      <TopDiv onMouseEnter={() => setTFlag(!topFlag)} flag={topFlag} scale={scale} />
      <LeftDiv onMouseEnter={() => setLFlag(!leftFlag)} flag={leftFlag}  scale={scale}  />
      <RedDoorDiv ref={redDoorRef}  scale={scale}  />
      <Frame style={{ overflow: 'hidden' }}>{children}</Frame>
    </Frame>
  );
});

export default ImageWithFlower;
