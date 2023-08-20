import React, { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TopBar from '../components/TopBar';
import BasicData from '../../GlobalComponents/Data/movingPara';
import CursorProvider from '../components/Cursor';
import * as Image from '../../GlobalComponents/image';
import { CursorContext } from '../components/Cursor';
import MovePart from './Main';
import {PageData} from '../../utils'

const LargeFrame = memo(styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
  cursor: url(${Image.Cursor}), auto;
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

const FixedFrame = styled.div`
  //background-color: aquamarine;
  width: 100vw;
  display: flex;
  z-index: 10;
  position: absolute;
  pointer-events: none;
`;

const widthFactor = document.body.clientWidth / 100;


const pages = new PageData();

export default function (props) {
  return (
    <LargeFrame>
      <CursorProvider>
        <CursorContext.Consumer>
          {(value) => (
            <>
              <FixedFrame>
                <TopBar {...props} pushElement={value} />
              </FixedFrame>
              <MovePart {...props} pushElement={value} pages={pages} />
            </>
          )}
        </CursorContext.Consumer>
      </CursorProvider>
    </LargeFrame>
  );
}
