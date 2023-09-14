import React, {memo, useEffect} from 'react';
import Main from './Main';
import { useParams } from 'react-router-dom';
import * as Data from '../../apiData/static';
import styled, { keyframes } from 'styled-components';
import CursorProvider from '../components/Cursor';
import { CursorContext } from '../components/Cursor';
import BasicData from '../../apiData/movingPara';
import Images from "../../global-components/Images";

const BlurFrame = memo(styled.div`
  cursor: url(${Images.Cursor}), auto;
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



const DetailPage = memo(() => {
  const params = useParams();
  // console.log("params",params)
  let detailDate =[] ;
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



  // console.log("detailDate",detailDate)
  return (
    <CursorProvider>
      <CursorContext.Consumer>
        {(value) => (
          <BlurFrame>
            <Main
              params={params}
              data={detailDate}
              cover={coverId}
              pushElement={value}
              coverData={Data.CoverData}
            />
          </BlurFrame>
        )}
      </CursorContext.Consumer>
    </CursorProvider>
  );
});

export default DetailPage;
