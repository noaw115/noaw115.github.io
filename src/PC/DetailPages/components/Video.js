import styled, { keyframes } from 'styled-components';
import { memo, useRef, useState } from 'react';
import BasicData from '../../../GlobalComponents/Data/movingPara';
import * as Image from '../../../GlobalComponents/image';

const Describe = styled.div`
  font-size: 16px;
  margin-bottom: 40px;
`;

const PhotoFrame = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : '100')}%;
  max-width: 700px;
  //background-color: coral;
  min-height: 200px;
  max-height: 80vh;
  margin-bottom: 30px;
  overflow: hidden;
  display: flex;
  transform: ${(props) =>
    props.transformY ? `translateY(${props.transformY})` : 'none'};
  align-items: center;
  justify-content: center;
  transition: 0.4s all ease-out;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const resetAnimation = keyframes`
  from {
    //transform: rotate(-2deg);
    opacity: 0.1;
    filter: blur(10px)
  }
  to {
    opacity: 1;
    transform: rotate(0deg);
  }
`;

const RotatingVideo = styled.video`
  animation: ${(props) => rotateAnimation} 24s linear infinite;
  transition: transform 2s ease-out;
  &:hover {
    animation: ${(props) => resetAnimation} 0.5s linear forwards;
  }
`;

const VideoPart = styled.video`
  animation: ${(props) => {
      console.log('rotate', props.rotate);
      return (
        props.rotate &&
        keyframes`
            0%{
              transform: rotate(0deg);
            }
            
            100%{
              transform: rotate(360deg);
            }
           `
      );
    }}
    linear 12s infinite;
  transition: 0.3s all;
  &:hover {
    animation: none;
  }
`;

const PhotoImg = styled.img`
  width: 100%;
`;

const Frame = styled.div`
  //background-color: #61dafb;
  filter: blur(${(props) => (props.blur ? '40' : '0')}px);
  transition:
    ${BasicData.PCBlurTime} all ease-out,
    1s clip-path ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  clip-path: ${(props) =>
    props.mask ? `circle(${props.mask}% at center)` : 'none'};
  &:hover {
    clip-path: circle(100% at center);
  }
`;

const Video = memo((props) => {
  let { blur, data } = props;
  const mask = '30';
  const [rotate, setRotate] = useState(true);
  const [deg, setDeg] = useState(0);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const handlePlay = () => {
    if (videoRef) {
      videoRef.current.play();
    }
    console.log(
      'videoRef.current.style.transform',
      videoRef.current.style.transform,
    );
    setRotate(false);
    videoRef.current.style.transform = 'rotate(0deg)';
  };

  const handlePause = () => {
    if (videoRef) {
      videoRef.current.pause();
      setTimeout(() => {
        setRotate(true);
      }, 300);
    }
  };
  const handleRotate = () => {
    if (rotate) {
      setInterval(() => {
        if (deg === 0) {
          setDeg(360);
        } else {
          setDeg(0);
        }
      }, 2000);
    }
  };
  const handleVideoLoaded = () => {
    setIsLoading(false);
  };
  return (
    <Frame blur={blur} mask={mask}>
      {isLoading && <div>ss</div>}
      <PhotoFrame
        width={data.imageScale ? data.imageScale * 100 : undefined}
        transformY={data.transformY}
      >
        <div onMouseEnter={handlePlay} onMouseLeave={handlePause}>
          <RotatingVideo
            isHovered={!rotate}
            ref={videoRef}
            muted
            style={{ width: '800px' }}
            onLoadedData={handleVideoLoaded}
          >
            <source
              src="https://download.samplelib.com/mp4/sample-20s.mp4"
              type="video/mp4"
            />
          </RotatingVideo>
        </div>
      </PhotoFrame>
      <Describe>{props.data.describe}</Describe>
    </Frame>
  );
});

export default Video;
