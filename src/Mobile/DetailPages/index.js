import React from 'react';
import MobileDetailPage from './DetailPage';
import { useParams } from 'react-router-dom';
import * as Data from '../../apiData/static';
import styled, { keyframes } from 'styled-components';
import BasicData from '../../apiData/movingPara';

const BlurFrame = styled.div`
  animation: ${(props) => {
      return keyframes`
            
            0%{
              opacity: 0;
              transform:translateY(-20%);
              filter: blur(20px)
            }
            
            100%{
              opacity: 1;
              transform:translateY(0);
              filter: blur(0);
            }
            
           `;
    }}
    ease-out ${BasicData.mobileBlurTime} forwards;
`;
function MobileMainDetailPage() {
  const params = useParams();
  // console.log('params', params);
  let detailDate = [];
  let coverId = '';
  let coverData = {};

  if (params.page === 'GRAPHICS') {
    detailDate = Data.GraphicsData;
    coverId = Data.CoverData[0].cover;
  } else if (params.page === 'WEB&UI DESIGN') {
    detailDate = Data.WebUIDesignDate;
    coverId = Data.CoverData[1].cover;
  } else if (params.page === 'MODELINGS') {
    detailDate = Data.ModelingsDate;
    coverId = Data.CoverData[2].cover;
  }

  // console.log("main",params)
  return (
    <BlurFrame>
      <MobileDetailPage params={params} data={detailDate} cover={coverId} />
    </BlurFrame>
  );
}

export default MobileMainDetailPage;
