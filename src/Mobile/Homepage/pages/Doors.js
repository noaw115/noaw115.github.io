import React from 'react';
import styled, { keyframes } from 'styled-components';
import * as Svg from '../../../global-components/Svgs';
import * as Data from '../../../apiData/static';
import * as Image from '../../../global-components/Images';
import { useNavigate, Link } from 'react-router-dom';
import EachDoor from '../../../global-components/EachDoor';
import Images from '../../../global-components/Images';

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  //background: aqua;
`;

const ShakePicture = styled.div`
  position: absolute;
  z-index: 2;
  //background-color: aqua;
  animation: ${(props) => {
      return keyframes`
            
            0%{
              transform: scale(1)  translateY(0px);
            }
            
            100%{
              transform: scale(1.05) translateY(2px);
            }
           `;
    }}
    ease-in-out ${(props) => props.interval}s infinite;
  animation-direction: alternate;
  animation-delay: ${(props) => props.delay}s;
`;

const Circle = styled.div`
  //background-color: red;
  width: ${(props) => props.r}vh;
  height: ${(props) => props.r}vh;
  position: absolute;
  left: 60%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  border-radius: ${(props) => props.r}vh;
  border: black 1px ${(props) => (props.dashed ? 'dashed' : 'solid')};
  //z-index: ;
  opacity: 0.4;
`;
const LogoPlace = styled.div`
  //position: absolute;
  top: 30px;
  left: 30px;
  width: 100px;
  position: absolute;
  z-index: 100;
  margin-bottom: 10px;
  //background-color: aqua;
  //height: 30px;
  //width: 30px;
  //z-index: 20;
`;
const Works = styled.div`
  //background-color: brown;
  //height: 450px;
  width: 200px;
  position: absolute;
  // right: ${(props) => props.right}%;
  left: ${(props) => props.left}%;
  // bottom:${(props) => props.bottom}vh;
  transform: translateX(-50%) scale(${(props) => props.scale});
  flex-grow: 0;
`;
const WorksInner = styled.div`
  position: relative;
  cursor: pointer;
  //background-color: #61dafb;
`;

const WorksTitle = styled.div`
  font-family: Floane;
  font-size: 26px;
  color: black;
  // background-color: #282c34;
  position: absolute;
  top: 270%;
  left: 10px;
`;
const LogoImage = styled.div`
  background-image: url(${(props) => props.img});
  width: 90px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
`;
const HalfFrame = styled.div`
  width: 100%;
  height: 50%;
  //background: rebeccapurple;
  display: flex;
  position: relative;
`;
const QuarterFrame = styled.div`
  width: 50%;
  height: 100%;
  //background: wheat;
  position: relative;
`;

const RotateStar = styled.div`
  position: absolute;
  animation: ${(props) => {
      return keyframes`

            0%{
              transform: rotate( ${props.startDeg}deg)  scale(${
        props.correction
      });
            }

            100%{
              transform: rotate(${
                props.dire ? props.startDeg + 2 : props.startDeg - 5
              }deg) scale(${props.correction});
            }

           `;
    }}
    4s ease-in-out infinite alternate;
  transform-origin: ${(props) => props.r / 2}vh ${(props) => props.r / 2}vh;
`;
// function SelectedPhotoScale(index){
//     console.log("进入函数",document.getElementsByName(`Door${index}`))
// }
function MobileDoors(props) {
  const CircleR = [80, 60, 40];
  // const scale =0.7
  const scale = window.screen.height / 1200;
  return (
    <>
      {/*内圈*/}
      <Circle r={CircleR[2]} dashed={true}>
        <RotateStar r={CircleR[2]} startDeg={90} dire={false} correction={0.91}>
          {Svg.Star1}
        </RotateStar>
        <RotateStar
          r={CircleR[2] + 10}
          startDeg={306}
          dire={false}
          correction={0.78}
        >
          {Svg.Star2}
        </RotateStar>
      </Circle>
      {/*中圈*/}
      <Circle r={CircleR[1]}>
        <RotateStar
          r={CircleR[1] - 5}
          startDeg={70}
          dire={true}
          correction={0.8}
        >
          {Svg.Star3}
        </RotateStar>
        <RotateStar r={CircleR[1]} startDeg={212} dire={false} correction={0.8}>
          {Svg.Star4}
        </RotateStar>
      </Circle>
      {/*外圈*/}
      <Circle r={CircleR[0]} dashed={true}>
        <RotateStar
          r={CircleR[0]}
          startDeg={100}
          dire={false}
          correction={0.78}
        >
          {Svg.Star4}
        </RotateStar>
        <RotateStar
          r={CircleR[0]}
          startDeg={170}
          dire={false}
          correction={0.78}
        >
          {Svg.Star3}
        </RotateStar>
      </Circle>

      <LogoPlace>
        <LogoImage img={Images.LogoBlack} />
      </LogoPlace>
      <Frame>
        <HalfFrame>
          <EachDoor
            outerStyle={{ left: 20, top: -10 }}
            innerStyle={{ height: '120%', left: '-370%' }}
            titleStyle={{ top: 240, left: 100 }}
            delay={0}
            interval={4}
            index={0}
            chineseText={'零'} // 中上
            text="WEB&UI DESIGN"
            scale={scale}
            isMobile
            {...props}
          />
        </HalfFrame>
        <HalfFrame>
          <QuarterFrame>
            <EachDoor
              outerStyle={{ left: 5, top: 0 }}
              innerStyle={{ height: '120%', left: '-370%' }}
              titleStyle={{ top: 240, left: 100 }}
              delay={0}
              interval={4}
              index={0}
              chineseText={'贰'} // 左下
              text="GRAPHICS"
              scale={scale}
              isMobile
              {...props}
            />
          </QuarterFrame>

          <QuarterFrame>
            <EachDoor
              outerStyle={{ left: -5, top: -50 }}
              innerStyle={{ height: '120%', left: '-370%' }}
              titleStyle={{ top: 240, left: 100 }}
              delay={0}
              interval={4}
              index={0}
              chineseText={'壹'} // 右下
              text="MODELINGS"
              scale={scale}
              isMobile
              {...props}
            />
          </QuarterFrame>
        </HalfFrame>
      </Frame>
    </>
  );
}

export default MobileDoors;
