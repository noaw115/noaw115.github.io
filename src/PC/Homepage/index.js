import React, { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Passage2 from './pages/Passage2';
import Doors from './pages/Doors';
import TopBar from '../../GlobalComponents/TopBar';
import BasicData from '../../GlobalComponents/Data/movingPara';
import NoaWen from './pages/NoaWen';
import Parallax from './components/Parallax';
import StaticImage from './pages/StaticImage';
import NoaWenParallax from './components/noawen/NoaWenParallax';
import RenderPlayGround from './components/RenderPlayGround';
import WithFlowers from "./components/WithFlowers";

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
  //border: ${(props) => props.color} 1px solid;
  height: 100%;
  width: ${(props) => props.width}vw;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: transparent;
`);

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
          animationDuration:2, //再花这段时间走动画
        },
      },
      {
        descri: '详细介绍页',
        length: 40,
        blur: true,
        custom: {
          delayTime: 2, //先等这段时间
          animationDuration:2, //再花这段时间走动画
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
  return (
    <LargeFrame>
      <FixedFrame>
        <TopBar/>
      </FixedFrame>
      <MovePart {...props} />
    </LargeFrame>
  )
}

const MovePart = (props) => {
  const snapLock = useRef();
  //👆false：允许贴靠（远离边界时）
  //true：不允许贴靠（靠近边界时）

  const snapPage = useRef();
  const blurPage = useRef();

  const [deltaX, setDeltaX] = useState(0);
  const deltaDirection = useRef();
  const [blurControl, _setBlurControl] = useState(); //true表示模糊，false表示不模糊

  const setBlurControl = (index, state = false) => {
    // 把第index页设清晰，state传false，否则传true
    if (blurControl) {
      const _blurControl = blurControl;
      _blurControl[index] = state;
      _setBlurControl(_blurControl);
    }
  };

  useEffect(() => {
    // 处理初始化逻辑
    snapLock.current = false;
    snapPage.current = 0;
    blurPage.current = 0;
    let _blurControl = [];

    pages.lengthMap.forEach(() => {
      _blurControl.push(true); //初始都是模糊的
    });
    _blurControl[0] = false;
    _setBlurControl(_blurControl);

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
        snapPage.current = limitNumber(
          snapPage.current + 1,
          pages.lengthMap.length - 1,
          0
        );
        setDeltaX(snapArray[snapPage.current]);
      }
    } else if (!snapLock.current && deltaDirection.current < 0) {
      if (Math.abs(snapArray[snapPage.current - 1] - deltaX) < 150) {
        // console.log('倒允许吸附，现在的delta是', deltaX, '距离第', snapPage.current - 1, '页即', snapArray[snapPage.current - 1], '的距离是', snapArray[snapPage.current - 1] - deltaX);

        snapLock.current = true;
        snapPage.current = limitNumber(
          snapPage.current - 1,
          pages.lengthMap.length - 1,
          0
        );
        setDeltaX(snapArray[snapPage.current]);
      }
    }
  }, [deltaX]);

  useEffect(() => {
    //处理高斯模糊相关的逻辑
    if (blurControl) {
      // console.log('现在的delta是', deltaX, '是否小于第', blurPage.current, '页即',blurArray[blurPage.current] ,"?", deltaX>blurArray[blurPage.current] );
      if (deltaDirection.current > 0 && deltaX > blurArray[blurPage.current]) {
        blurPage.current = limitNumber(
          blurPage.current + 1,
          pages.lengthMap.length - 1,
          0
        );
        setBlurControl(blurPage.current);
      }
      // if (deltaDirection.current < 0 && deltaX < blurArray[blurPage.current-1]){
      //   blurPage.current = limitNumber(blurPage.current-1, pages.lengthMap.length-1, 0)
      //   setBlurControl(blurPage.current, true)
      // }
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

  const handleParaScreenPercent = (descri, upper = 0.5, lower = -0.5) => {
    // 针对视差滚动的函数,返回值是视差滚动的offset

    const rangeLength = upper - lower;
    let _percent =
      (deltaX +
        document.body.clientWidth -
        pages.calStartToPageVw(descri) * widthFactor) /
      (pages.getPageField(descri, 'length') * widthFactor +
        document.body.clientWidth);
    // 分子：该页目前滚过的距离（不是从起点算，仅该页） 要加clientWidth的原因：deltaX是从左边缘开始计算的，但是我们算滚过的距离得从右侧算。有点复杂，多画图
    // 分母：该页从出现到完全消失的长度
    // _percent: 该页被经过的比例，0-1之间

    _percent = _percent * rangeLength; // 将_percent范围按要求放大或缩小
    // console.log("_percent",_percent)
    return limitNumber(_percent - rangeLength / 2, upper, lower);
  };

  const handleBlur = (descri) => {
    if (blurControl) {
      return blurControl[pages.getPageField(descri, 'index')];
    }
    return false;
  };

  return (
      <MoveFrame id="moveFrame" offset={deltaX} width={pages.calTotalVw()}>
        <Frame width={pages.getPageField('门的页面', 'length')} color={'red'}>
          <Doors />
        </Frame>

        <RenderPlayGround
          percent={handleParaScreenPercent('视差滚动NOA', 0.2, -0.2)}
          pageLength={pages.getPageField('视差滚动NOA', 'length') * widthFactor}
          percentCorrection={-0.05} // 百分比修正，为的是让内容停在居中位置
        >
          <Frame
            style={{ display: 'block' , overflow: 'visible'}}
            width={pages.getPageField('视差滚动NOA', 'length')}
          >
            <NoaWenParallax
              blur={handleBlur('视差滚动NOA')}
              delayTime={pages.getPageField('视差滚动NOA', 'custom').delayTime}
              duration={pages.getPageField('视差滚动NOA', 'custom').animationDuration}
              direction={deltaDirection.current > 0}
            >
              <NoaWen deltaY={deltaX} />
            </NoaWenParallax>
          </Frame>
          <Frame
            width={pages.getPageField('详细介绍页', 'length')}
            style={{ display: 'block' , overflow: 'visible'}}
          >
            <Passage2
              width={pages.getPageField('详细介绍页', 'length')*widthFactor}
              blur={handleBlur('详细介绍页')}
              delayTime={pages.getPageField('详细介绍页', 'custom').delayTime}
              duration={pages.getPageField('详细介绍页', 'custom').animationDuration}
              direction={deltaDirection.current > 0}
            />
          </Frame>
        </RenderPlayGround>
        

        <Frame
          style={{ display: 'block', overflow: 'visible' }}
          width={pages.getPageField('山中之门页', 'length')}
        >
          <WithFlowers>
            <Parallax
              blur={handleBlur('山中之门页')}
              percent={handleParaScreenPercent('山中之门页',0.1,-0.1)}
              pageLength={pages.getPageField('山中之门页','length')*widthFactor}
            >
              <StaticImage />
            </Parallax>
          </WithFlowers>
        </Frame>
        <Frame width={pages.getPageField('联系信息', 'length')}>
          {/*<Passage2 />*/}
        </Frame>
      </MoveFrame>
  );
};

export default Main;
