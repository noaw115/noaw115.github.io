import styled from 'styled-components';
import React from 'react';
import * as Data from '../../../GlobalComponents/Data/static';

const Frame = styled.div`
  background-color: rgba(0, 208, 211, 0.2);
  width: 1100px;
  height: 900px;
  position: absolute;
  top: 90px;
  left: 21vw;
  display: flex;
  flex-direction: column;
  z-index: 30;
  transition: 0.5s all;
`;
const Line = styled.div`
  display: flex;
  flex-wrap: nowrap;
  transition: 0.5s all;
`;
const BigBlock = styled.div`
  width: 275px;
  height: 400px;
  background-color: rgba(103, 193, 220, 0.4);
  margin: 1px;
  transition: 0.5s all;
  display: flex;
  position: relative;
`;
const SmallBlock = styled.div`
  width: 1100px;
  height: 100px;
  background-color: rgba(2, 192, 23, 0.2);
  margin: 1px;
  transition: 0.5s all;
`;
const Mask = styled.div`
  height: 370px;
  width: 170px;
  overflow: hidden;
  border-radius: 170px 170px 0 0;
  background-color: #f0f0f0;
  position: absolute;
  border: 1px #dedede solid;
`;
const DoorImg = styled.img`
  z-index: 1;
  top: -10%;
  position: absolute;
`;
const WorksTitle = styled.div`
  width: 100px;
  font-family: Floane;
  font-size: 26px;
  color: black;
  // background-color: #282c34;
  position: absolute;
`;
const ChineseTitle = styled.div`
  width: 100px;
  font-family: XiaoWei;
  font-size: 26px;
  color: black;
  // background-color: #282c34;
  position: absolute;
`;
const DoorsFrame = () => {
  return (
    <Frame>
      <Line>
        <BigBlock height={1.2} width={1.4} />
        <BigBlock>
          {/*上方*/}
          <Mask style={{ top: '10px', left: '30px' }}>
            <DoorImg
              src={require(`../../../GlobalComponents/Image/DoorImage.png`)}
              style={{ height: '110%', left: '-20%' }}
            />
          </Mask>
        </BigBlock>
        <BigBlock>
          <WorksTitle style={{ top: '140px', left: '20px' }}>
            {Data.HomepageData[0].contend.Door1.text}
          </WorksTitle>
          <ChineseTitle style={{ top: '95px', left: '30px' }}>
            {Data.HomepageData[0].contend.Door1.chinese_text}
          </ChineseTitle>
        </BigBlock>
        <BigBlock />
      </Line>
      <Line>
        <SmallBlock height={0.8} />
      </Line>
      <Line>
        <BigBlock>
          {/*左边*/}
          <Mask style={{ top: '-35px', left: '50px' }}>
            <DoorImg
              style={{ height: '120%', left: '-370%' }}
              src={require(`../../../GlobalComponents/Image/DoorImage.png`)}
            />
          </Mask>
        </BigBlock>
        <BigBlock>
          <ChineseTitle style={{ bottom: '120px', left: '50px' }}>
            {Data.HomepageData[0].contend.Door0.chinese_text}
          </ChineseTitle>
          <WorksTitle style={{ bottom: '70px', left: '10px' }}>
            {Data.HomepageData[0].contend.Door0.text}
          </WorksTitle>
        </BigBlock>
        <BigBlock>
          {/*右边*/}
          <Mask style={{ top: '-180px', left: '40px' }}>
            <DoorImg
              src={require(`../../../GlobalComponents/Image/DoorImage.png`)}
              style={{ height: '110%', left: '-400%' }}
            />
          </Mask>
        </BigBlock>
        <BigBlock>
          {/*左边*/}
          <ChineseTitle style={{ top: '0px', left: '90px' }}>
            {Data.HomepageData[0].contend.Door2.chinese_text}
          </ChineseTitle>
          <WorksTitle style={{ top: '40px', left: '70px' }}>
            {Data.HomepageData[0].contend.Door2.text}
          </WorksTitle>
        </BigBlock>
      </Line>
    </Frame>
  );
};
export default DoorsFrame;
