import styled from 'styled-components';
import BasicData from '../../../GlobalComponents/Data/movingPara';

import { useEffect, useRef } from 'react';
const Frame = styled.div`
  //background-color: #61dafb;
  filter: blur(${(props) => (props.blur ? '40' : '0')}px);
  transition: ${BasicData.mobileBlurTime} all ease-out;
`;
const Describe = styled.div`
  font-size: 16px;
  //background-color: coral;
`;

const PhotoFrame = styled.div`
  width: 100%;
  //background-color: coral;
  margin-bottom: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoImg = styled.img`
  width: 100%;
`;

function MobilePhoto(props) {
  let { blur, data } = props;
  return (
    <Frame blur={blur}>
      <PhotoFrame>
        <PhotoImg
          src={require(`../../../GlobalComponents/Image${data.photoId}`)}
        />
      </PhotoFrame>
      {data.describe && <Describe>{data.describe}</Describe>}
    </Frame>
  );
}

export default MobilePhoto;
