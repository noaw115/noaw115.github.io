import styled, { keyframes } from 'styled-components';
import { memo, useRef, useState } from 'react';
import BasicData from '../../../apiData/movingPara';


const timeBeforeRePlay = 0.8
const timeCircleExpand = 1

const Describe = styled.div`
  font-size: 16px;
  margin-bottom: 40px;
`;

const PhotoFrame = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : '100')}%;
  filter: blur(${(props) => (props.blur ? '40' : '0')}px) grayscale(70%);
  overflow: hidden;
  transform: ${(props) =>
    props.transformY ? `translateY(${props.transformY})` : 'none'};
  transition: ${props=>timeCircleExpand+'s'} all ease-out;
  clip-path: ${(props) =>
          props.mask ? `circle(${props.mask}% at center)` : 'none'};
  &:hover {
    clip-path: circle(100% at center);
    filter: blur(0) grayscale(0%);
  }
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
    filter: blur(10px) grayscale(70%);
  }
  to {
    opacity: 1;
    transform: rotate(0deg);
    filter: blur(0px) grayscale(0%);
  }
`; //这个动画需要0.8s

const RotatingVideo = styled.video`
  width: 100%;
  animation: ${(props) => rotateAnimation} 48s linear infinite;
  transition: transform 2s ease-out;
  &:hover {
    animation: ${(props) => resetAnimation} ${props=>timeBeforeRePlay}s linear forwards;
  }
`;


const Frame = styled.div`
  //background-color: #61dafb;
  
  transition:
    ${BasicData.PCBlurTime} all ease-out,
    0.3s clip-path ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const Loading = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 400px;
  background-color: rgba(0,0,0,0.05);
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%) translateY(-50%);
`
const BigBar = styled.div`
  width:200px;
  position: relative;
  height: 8px;
  border-radius: 15px;
  background-color: #e0e0e0;
`

const barGoing = keyframes`
  0% {
    width: 5px;
  }
  10%{
    width: 50%;
  }
  50% {
    width: 80%;
  }
  70% {
    width: 90%;
  }
  90% {
    width: 95%;
  }
  100%{
    width: 100%;
  }
`;
const SmallBar = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 15px;
  background-color: black;
  animation: ${props=>barGoing} 50s forwards;
`
const SmallBarBack = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 15px;
  border: 1px black solid;
  width: 100%;
  background-color: white;
  box-sizing: border-box;
  //background-color: red;
  // animation: ${props=>barGoing} 50s forwards;
`

const Video = memo((props) => {
  let { blur, data, isMobile=false } = props;
  const [rotate, setRotate] = useState(true);
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const handlePlay = () => {
    setRotate(false);
    setTimeout(()=>{
      if (videoRef) {
        videoRef.current.play();
      }
      videoRef.current.style.transform = 'rotate(0deg)';
    },(timeBeforeRePlay/2)*1000)
    
  };

  const handlePause = () => {
    if (videoRef) {
      videoRef.current.pause();
      setTimeout(() => {
        setRotate(true);
      }, 300);
    }
  };

  const handleVideoLoaded = () => {
    // console.log("加载好了")
    setLoaded(true)
  };
  return (
    <Frame >
      {!loaded && <Loading>
        <BigBar>
          <SmallBarBack/>
          <SmallBar/>
        </BigBar>
      </Loading>}
      <PhotoFrame
        width={data.imageScale ? data.imageScale * 100 : undefined}
        blur={blur}
        transformY={data.transformY}
        mask={isMobile ? data.mobileMask || '30' : data.mask}
        onMouseEnter={handlePlay} onMouseLeave={handlePause}
      >
        
        <RotatingVideo
          controls={isMobile}
          // width={data.imageScale ? data.imageScale * 100 : undefined}
          isHovered={!rotate}
          ref={videoRef}
          muted
          onLoadedData={handleVideoLoaded}
          onLoadedMetadata={handleVideoLoaded}
        >
          <source
            // src="https://download.samplelib.com/mp4/sample-20s.mp4"
            src={require(`../../../asserts/Image${data.photoId}`)}
            type="video/mp4"
          />
        </RotatingVideo>
      </PhotoFrame>
      {data.describe && <Describe>{data.describe}</Describe> }
    </Frame>
  );
});

export default Video;
