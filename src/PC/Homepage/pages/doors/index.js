import React, { memo, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Svg from '../../../../global-components/Svgs';
import EachDoor from '../../../../global-components/EachDoor';

const Frame = styled.div`
  background-color: ${(props) => props.color};
  position: relative;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Circle = styled.div`
  //background-color: red;
  width: ${(props) => props.r}vw;
  height: ${(props) => props.r}vw;
  position: absolute;
  left: 60%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  border-radius: ${(props) => props.r}vw;
  border: #7d7d7d 1.5px ${(props) => (props.dashed ? 'dashed' : 'solid')};
  z-index: -1;
  pointer-events: none;
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
  transform-origin: ${(props) => props.r / 2}vw ${(props) => props.r / 2}vw;
`;

const Index = memo((props) => {
  const CircleR = [70, 50, 30];
  //console.log("【性能警告】Doors在渲染")

  const { pushElement } = props;

  const worksInnerRef1 = useRef();
  const worksInnerRef2 = useRef();
  const worksInnerRef3 = useRef();

  useEffect(() => {
    // 为了鼠标样式改变
    if (worksInnerRef1 && worksInnerRef2 && worksInnerRef3) {
      pushElement(worksInnerRef1);
      pushElement(worksInnerRef2);
      pushElement(worksInnerRef3);
    }
  }, [worksInnerRef1, worksInnerRef2, worksInnerRef3]);

  return (
    <Frame>
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

      {/*<DoorsFrame/>*/}

      {/*0号 靠左*/}
      <EachDoor
        outerStyle={{ left: 23, bottom: 13 }}
        innerStyle={{ height: '120%', left: '-370%' }}
        titleStyle={{ top: 240 }}
        delay={0}
        interval={4}
        index={0}
        chineseText={'贰'}
        text='GRAPHICS'
        {...props}
      />

      {/*1号 靠中间*/}
      <EachDoor
        outerStyle={{ left: 36, top: 7 }}
        innerStyle={{ height: '110%', left: '-20%' }}
        titleStyle={{ top: 130 }}
        delay={0}
        interval={5}
        index={1}
        chineseText={'零'}
        text='WEB&UI DESIGN'
        {...props}
      />

      {/*2号 靠右*/}
      <EachDoor
        outerStyle={{ left: 52, bottom: 27 }}
        innerStyle={{ height: '110%', left: '-400%' }}
        titleStyle={{ top: 200 }}
        delay={2}
        interval={4}
        index={2}
        chineseText={'壹'}
        text='MODELINGS'
        {...props}
      />
    </Frame>
  );
});

export default Index;
