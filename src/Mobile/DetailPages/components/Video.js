import styled, { keyframes } from 'styled-components';
import {memo, useEffect, useRef, useState} from 'react';
import BasicData from '../../../GlobalComponents/Data/movingPara';


const timeBeforeRePlay = 0.8
const timeCircleExpand = 1
const VideoButton = styled.div`
  font-family: Floane;
  line-height: 90px;
  display: flex;
  justify-content: center;
  //align-items: center;
  color: white;
  font-size: 30px;
  width: 80px;
  height: 80px;
  border-radius: 60px;
  opacity: ${props => props.show? '1' : 0};
  transition: 0.3s all;
  background-color: rgba(255,255,255,0.3);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) ${props=>props.show? 'scale(1)' : 'scale(1.2)'};
`

const Describe = styled.div`
  font-size: 16px;
  margin-bottom: 40px;
`;

const PhotoFrame = styled.div`
  position: relative;
  //background-color: saddlebrown;
  width: 100%;
  overflow: hidden;
`;



const RotatingVideo = styled.video`
  width: 100%;
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
  background-color: #e0e0e0;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%) translateY(-50%);
`
const BigBar = styled.div`
  width:260px;
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
  border-radius: 15px;
  background-color: black;
  animation: ${props=>barGoing} 50s forwards;
`


const Video = memo((props) => {
  let { blur, data, isMobile=false } = props;
  const [showButton, setButton] = useState(true);
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const handlePlay = () => {
    if (videoRef) {
      if (videoRef.current.paused) {
        setButton(false)
        videoRef.current.play();
      } else if (!videoRef.current.paused) {
        setButton(true)
        videoRef.current.pause();
      }
    }
  };


  return (
    <Frame >
      <PhotoFrame
        width={100}
        blur={blur}
        transformY={data.transformY}
        mask={isMobile ? data.mobileMask || '30' : data.mask}
        onClick={handlePlay}
      >
         <VideoButton show={showButton}> PLAY</VideoButton>
        <RotatingVideo
          // controls={isMobile}
          // width={data.imageScale ? data.imageScale * 100 : undefined}
          ref={videoRef}
          muted
          // onLoadedData={handleVideoLoaded}
          // onLoadedMetadata={handleVideoLoaded}
        >
          <source
            // src="https://download.samplelib.com/mp4/sample-20s.mp4"
            src={require(`../../../GlobalComponents/Image${data.photoId}`)}
            type="video/mp4"
          />
        </RotatingVideo>
      </PhotoFrame>
      {data.describe && <Describe>{data.describe}</Describe> }
    </Frame>
  );
});

export default Video;
