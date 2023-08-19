import styled from 'styled-components';
import { memo } from 'react';
import BasicData from '../../../GlobalComponents/Data/movingPara';

const Describe = styled.div`
  font-size: 16px;
  margin-bottom: 40px;
`;

const PhotoFrame = styled.div`
  width: ${(props) => (props.width ? props.width : '100')}%;
  //background-color: coral;
  min-height: 200px;
  max-height: 80vh;
  margin-bottom: 30px;
  overflow: hidden;
  display: flex;
  transform: ${props=>props.transformY ? `translateY(${props.transformY})`:'none'};
  align-items: center;
  justify-content: center;
  transition: 0.4s all ease-out;
 
`;

const PhotoImg = styled.img`
  width: 100%;
`;

const Frame = styled.div`
  //background-color: #61dafb;
  filter: blur(${(props) => (props.blur ? '40' : '0')}px);
  transition: ${BasicData.PCBlurTime} all ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  clip-path: ${(props) =>
          props.mask ? `circle(${props.mask}% at center)` : 'none'};
  &:hover{
    clip-path: circle(100% at center);
  }
`;

const Photo = memo((props) => {
  let { blur, data } = props;
  console.log("props",data.mask)
  return (
    <Frame blur={blur} mask={data.mask}>
      <PhotoFrame width={data.imageScale ? data.imageScale * 100 : undefined} transformY={data.transformY} >
        <PhotoImg
          src={require(`../../../GlobalComponents/Image${props.data.photoId}`)}
        />
      </PhotoFrame>
      <Describe>{props.data.describe}</Describe>
    </Frame>
  );
});

export default Photo;
