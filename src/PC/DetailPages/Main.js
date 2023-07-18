import React, { memo } from 'react';
import DetailPage from './DetailPage';
import { useParams } from 'react-router-dom';
import * as Data from '../../GlobalComponents/Data/static';
import styled, { keyframes } from 'styled-components';

import BasicData from '../../GlobalComponents/Data/movingPara';

const BlurFrame = memo(styled.div`
  animation: ${(props) => {
      return keyframes`
            
            0%{
              opacity: 0;
              transform:translateX(-20%);
              filter: blur(20px)
            }
            
            100%{
              opacity: 1;
              transform:translateY(0);
              filter: blur(0);
            }
            
           `;
    }}
    ease-out ${BasicData.PCBlurTime} forwards;
`);
const MainDetailPage = memo(() => {
  const params = useParams();
  let DetailDate = null;
  let coverId = '';
  if (params.page === 'GRAPHICS') {
    DetailDate = Data.GraphicsData;
    coverId = Data.CoverData[0].cover;
  } else if (params.page === 'WEB&UI DESIGN') {
    DetailDate = Data.WebUIDesignDate;
    coverId = Data.CoverData[1].cover;
  } else if (params.page === 'MODELINGS') {
    DetailDate = Data.ModelingsDate;
    coverId = Data.CoverData[2].cover;
  }
  // console.log("main",params)
  return (
    <BlurFrame>
      <DetailPage params={params} data={DetailDate} cover={coverId} />
    </BlurFrame>
  );
});

export default MainDetailPage;
