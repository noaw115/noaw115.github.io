import React, { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Passage2 from './Components/Passage2';
import Doors from './Components/Doors';
import TopBar from '../../GlobalComponents/TopBar';
import BasicData from '../../GlobalComponents/Data/movingPara';
import NoaWen from '../Homepage/Components/NoaWen';
import Parallax from './Components/Parallax';
import ParallaxImage from './Components/ParallaxImage';

// const {LargeFrame}=MovingFrame
const LargeFrame = memo(styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
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
const BlurFrame = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 40vw;
  height: 100vh;
  //background-color: red;
  backdrop-filter: blur(20px);
  filter: blur(20px);
`;
const FixedFrame = styled.div`
  //background-color: aquamarine;
  width: 100vw;
  display: flex;
  height: 100vh;
  z-index: 10;
  position: absolute;
  pointer-events: none;
`;
const MoveFrame = styled.div`
  //background-image: linear-gradient(to right, red , yellow);
  position: relative;
  top: 0;
  height: 100vh;
  transform: translateX(-${(props) => props.offset}px);
  transition: ${BasicData.inertiaTime} all ease-out;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-y: visible;
  overflow-x: hidden;
  width: ${(props) => props.width}vw;
`;

const Frame = memo(styled.div`
  background-color: ${(props) => props.color};
  height: 100%;
  width: ${(props) => props.width}vw;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  display: flex;
`);

class PageData {
  constructor() {
    this.lengthMap = [
      { descri: '门的页面', length: 100, blur: false },
      { descri: '视差滚动NOA', length: 46, blur: true },
      { descri: '详细介绍页', length: 45, blur: true },
      { descri: '山中之门页', length: 80, blur: true },
      { descri: '联系信息', length: 40, blur: true },
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
  
  findPageFieldVw = (descri) => {
    // 找到某一页的长度（vw长度）
    let res = 0;
    this.lengthMap.forEach((item) => {
      if (item.descri === descri) {
        res = item.length;
      }
    });
    return res;
  };
  
  findPageField = (descri, field) => {
    // 找到某一页的属性，第二项代表属性名，不传则是所有属性，传index则是返回index
    let res;
    this.lengthMap.forEach((item,index) => {
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
  
  findStartToPageVw = (descri) => {
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
      array.push(this.findStartToPageVw(item.descri) * widthFactor);
    });
    console.log('snapArray', array);
    return array;
  };
  
  calBlurArray = (offset = 0) => {
    // 计算高斯模糊列表，是一个[width1-100,width1+width2-100,width1+width2+width3-100,...]这样的列表（实际长度）
    let array = [];
    this.lengthMap.forEach((item) => {
      array.push(
        (this.findStartToPageVw(item.descri) + this.findPageFieldVw(item.descri) - 100) *
        widthFactor +
        offset
      );
    });
    console.log('calBlurArray', array);
    return array;
  };
  
  
}

const limitNumber = (number, upper, lower) => {
  if (number < upper && number > lower) {
    return number;
  } else if (number >= upper) {
    return upper;
  } else if (number <= lower) {
    return lower;
  }
};

const widthFactor = document.body.clientWidth / 100;
//意义👆给我一个vw的数如70vw，70*withFactor得到真实的像素数
const pages = new PageData();
const moveLimit = (pages.calTotalVw() - 100) * widthFactor;
const snapArray = pages.calSnapArray();
const blurArray = pages.calBlurArray(100);
const Main = (props) => {
  const snapLock = useRef();
  //👆false：允许贴靠（远离边界时）
  //true：不允许贴靠（靠近边界时）

  const snapPage = useRef();
  const blurPage = useRef();

  const [deltaX, setDeltaX] = useState(0);
  const deltaDirection = useRef();
  const [blurControl, _setBlurControl] = useState() //true表示模糊，false表示不模糊
  
  const setBlurControl = (index, state = false) => {
    // 把第index页设清晰，state传false，否则传true
    if (blurControl) {
      const _blurControl = blurControl;
      _blurControl[index] = state;
      _setBlurControl(_blurControl)
    }
  }
  
  useEffect(() => {
    // 处理初始化逻辑
    snapLock.current = false;
    snapPage.current = 0;
    blurPage.current = 0;
    let _blurControl = [];
    
    pages.lengthMap.forEach(()=>{
      _blurControl.push(true) //初始都是模糊的
    })
    _blurControl[0] = false;
    _setBlurControl(_blurControl)
    
    window.addEventListener('mousewheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('mousewheel', handleWheel, { passive: false });
    };
  }, []);

  useEffect(() => {
    // 处理吸附相关的逻辑
    if (!snapLock.current && deltaDirection.current > 0) {
      if (Math.abs(snapArray[snapPage.current + 1] - deltaX) < 150) {
        // console.log('正允许吸附，现在的delta是', deltaX, '距离第', snapPage.current + 1, '页即', snapArray[snapPage.current + 1], '的距离是', snapArray[snapPage.current + 1] - deltaX);
        
        snapLock.current = true;
        snapPage.current = limitNumber(snapPage.current+1, pages.lengthMap.length-1, 0)
        setDeltaX(snapArray[snapPage.current]);
      }
    } else if (!snapLock.current && deltaDirection.current < 0) {
      if (Math.abs(snapArray[snapPage.current - 1] - deltaX) < 150) {
        // console.log('倒允许吸附，现在的delta是', deltaX, '距离第', snapPage.current - 1, '页即', snapArray[snapPage.current - 1], '的距离是', snapArray[snapPage.current - 1] - deltaX);
        
        snapLock.current = true;
        snapPage.current = limitNumber(snapPage.current-1, pages.lengthMap.length-1, 0)
        setDeltaX(snapArray[snapPage.current]);
      }
    }
  }, [deltaX]);

  useEffect(() => {
    //处理高斯模糊相关的逻辑
    if (blurControl) {
      if (deltaDirection.current > 0 && deltaX > blurArray[blurPage.current]) {
        blurPage.current = limitNumber(blurPage.current+1, pages.lengthMap.length-1, 0)
        setBlurControl(blurPage.current)
      }
      // console.log('现在的delta是', deltaX, '是否小于第', blurPage.current, '页即',blurArray[blurPage.current] ,"?", deltaX>blurArray[blurPage.current] );
      if (deltaDirection.current < 0 && deltaX < blurArray[blurPage.current-1]){
        blurPage.current = limitNumber(blurPage.current-1, pages.lengthMap.length-1, 0)
        setBlurControl(blurPage.current, true)
      }
    }
  }, [deltaX]);
  
  const handleWheel = (e) => {
    // 在范围内把滚轮产生的deltaX累加起来，更新deltaX值
    e.stopPropagation();
    e.preventDefault();
    snapLock.current = false;
    if (e.deltaY > 0) {
      deltaDirection.current = 1;
    } else {
      deltaDirection.current = -1;
    }
    setDeltaX((deltaX) => {
      const noLimitedDeltaX = deltaX + e.deltaY * BasicData.moveSpeedFactor;
      return limitNumber(noLimitedDeltaX, moveLimit, 0);
    });
  };

  const handleParaScr = (descri, factor) => {
    // 针对视差滚动的函数,返回值是视差滚动的offset
    const _subDeltaX =
      (deltaX - pages.findStartToPageVw(descri) * widthFactor) /
      ((pages.findPageFieldVw(descri) + 100) * widthFactor);
    return limitNumber(_subDeltaX + 0.5, 1, 0) * factor;
  };
  
  const handleBlur = (descri) => {
    if (blurControl) {
      return blurControl[pages.findPageField(descri,'index')]
    }
    return false
  }

  return (
    <LargeFrame>
      <FixedFrame>deltaX={deltaX}</FixedFrame>
      <MoveFrame id="moveFrame" offset={deltaX} width={pages.calTotalVw()}>
        <Frame width={pages.findPageFieldVw('门的页面')}>
          <Doors />
        </Frame>

        <Frame width={pages.findPageFieldVw('视差滚动NOA')}>
          <Parallax
            blur={handleBlur('视差滚动NOA')}
            offset={handleParaScr('视差滚动NOA', 500)}
          >
            <NoaWen deltaY={deltaX} />
          </Parallax>
        </Frame>

        <Frame width={pages.findPageFieldVw('详细介绍页')}>
          <Passage2 blur={handleBlur('详细介绍页')}/>
        </Frame>

        <Frame width={pages.findPageFieldVw('山中之门页')}>
          <Parallax
            blur={handleBlur('山中之门页')}
            offset={handleParaScr('山中之门页', 500)}
          >
            <ParallaxImage />
          </Parallax>
        </Frame>
        <Frame width={pages.findPageFieldVw('联系信息')}>{/*<Passage2 />*/}</Frame>
      </MoveFrame>
    </LargeFrame>
  );
};

export default Main;
