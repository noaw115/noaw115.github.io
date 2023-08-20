import Video from "../../../global-components/Video";
import TitleAndText from "../components/TitleAndText";
import Photo from "../components/Photo";
import React, {memo} from "react";
import styled from "styled-components";

const MoveFrame = styled.div`
  // background-image: linear-gradient(to right, red , yellow);
  // background-color: green;
  position: relative;
  top: 0;
  height: 100%;
  left: 100vw;
  transform: translateX(-${(props) => props.offset}px);
  transition: 0.4s all ease-out;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: visible;
  box-sizing: content-box;
`;

const Frame = memo(styled.div`
  background-color: ${(props) => props.color};
  height: 100%;
  width: ${(props) => (props.width ? props.width + 'px' : '800px')};
  flex-shrink: 0;
  overflow: visible;
  display: flex;
  flex-direction: column;
  //margin-left: 10px;
  justify-content: center;
  padding-top: 50px;
  padding-right: 100px;
  padding-left: 100px;
  padding-bottom: 50px;
  box-sizing: border-box;
`);

const List = memo((props) => {
  const {offset,data,blurControl} = props
  
  // console.log("data是啥",data)
  return(
    <MoveFrame offset={offset} id="detailPageMoveFrame">
      {data.map((item, key) => {
        //console.log("遍历",item)
        if (item.type === 'text') {
          return (
            <Frame
              color={'#e0e0e0'}
              key={'frame' + key}
              id={`detail${key}`}
              width={item.width}
            >
              <TitleAndText
                data={item}
                key={key}
                blur={blurControl[key]}
              />
            </Frame>
          );
        }
        if (item.type === 'photo') {
          return (
            <Frame
              style={{ paddingLeft: '50px', paddingRight: '50px' }}
              color={'white'}
              key={'frame' + key}
              id={`detail${key}`}
              width={item.width}
            >
              <Photo
                data={item}
                key={key}
                blur={blurControl[key]}
              />
            </Frame>
          );
        }
        if (item.type === 'video') {
          return (
            <Frame
              style={{ paddingLeft: '50px', paddingRight: '50px' }}
              color={'white'}
              key={'frame' + key}
              id={`detail${key}`}
              width={item.width}
            >
              <Video
                data={item}
                key={key}
                blur={blurControl[key]}
              />
            </Frame>
          );
        }
      })}
    </MoveFrame>
  )
})

export default List
