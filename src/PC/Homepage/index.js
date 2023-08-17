import React, { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import TopBar from '../../GlobalComponents/TopBar';
import BasicData from '../../GlobalComponents/Data/movingPara';
import Cursor from '../components/Cursor';
import * as Image from '../../GlobalComponents/image';
import { CursorContext } from '../components/Cursor';
import MovePart from './Main'

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
  height: 100vh;
  z-index: 10;
  position: absolute;
  pointer-events: none;
`;

const widthFactor = document.body.clientWidth / 100;
class PageData {
  constructor() {
    this.lengthMap = [
      { descri: '门的页面', length: 100, blur: false },
      {
        descri: '视差滚动NOA',
        length: 60,
        blur: true,
        custom: {
          delayTime: 2, //先等这段时间
          animationDuration: 2, //再花这段时间走动画
        },
      },
      {
        descri: '详细介绍页',
        length: 40,
        blur: true,
        custom: {
          delayTime: 2, //先等这段时间
          animationDuration: 2, //再花这段时间走动画
        },
      },
      { descri: '山中之门页', length: 50, blur: true },
      { descri: '联系信息', length: 50, blur: true },
    ];
  }

  calTotalVw = () => {
    // 计算总长度
    let res = 0;
    this.lengthMap.forEach((item) => {
      res += item.length;
    });
    return res;
  };

  getPageField = (descri, field) => {
    // 找到某一页的属性，第二项代表属性名，不传则是所有属性，传index则是返回index
    let res;
    this.lengthMap.forEach((item, index) => {
      if (item.descri === descri) {
        if (!field) {
          res = item;
        } else if (field === 'index') {
          res = index;
        } else {
          res = item[field];
        }
      }
    });
    return res;
  };

  calStartToPageVw = (descri) => {
    // 找到某一页的起点长度（vw长度）
    let res = 0;
    let addFlag = true;
    this.lengthMap.forEach((item) => {
      if (item.descri === descri) {
        addFlag = false;
      }
      if (addFlag) res += item.length;
    });
    return res;
  };

  calSnapArray = () => {
    // 计算吸附列表 是一个[0,width1,width1+width2,...]这样的列表（实际长度）
    let array = [];
    this.lengthMap.forEach((item) => {
      array.push(this.calStartToPageVw(item.descri) * widthFactor);
    });
    console.log('snapArray', array);
    return array;
  };

  calBlurArray = (offset = 0) => {
    // 计算高斯模糊列表，是一个[width1-100,width1+width2-100,width1+width2+width3-100,...]这样的列表（实际长度）
    let array = [];
    this.lengthMap.forEach((item) => {
      array.push(
        (this.calStartToPageVw(item.descri) +
          this.getPageField(item.descri, 'length') -
          100) *
          widthFactor +
          offset,
      );
    });
    console.log('calBlurArray', array);
    return array;
  };
}

const pages = new PageData();

export default function (props){
  return (
    <LargeFrame>
      <Cursor>
        <FixedFrame>
          <TopBar />
        </FixedFrame>
        <CursorContext.Consumer>
          {(value) =>  <MovePart {...props} pushElement={value} pages={pages} />}
        </CursorContext.Consumer>
      </Cursor>
    </LargeFrame>
  );
};


