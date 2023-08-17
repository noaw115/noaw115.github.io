import React, {memo, useEffect, useRef, useState} from "react";
import BasicData from "../../GlobalComponents/Data/movingPara";
import Doors from "./pages/doors";
import RenderPlayGround from "./components/RenderPlayGround";
import NoaWenParallax from "./pages/noawen/components/NoaWenParallax";
import NoaWen from "./pages/noawen";
import Passage2 from "./pages/passage2";
import WithFlowers from "./components/WithFlowers";
import Parallax from "./pages/passage2/components/Parallax";
import StaticImage from "./pages/StaticImage";
import styled, {keyframes} from "styled-components";
import * as Image from "../../GlobalComponents/image";


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

const MovePart = (props) => {

  const {pages} = props;
  const moveLimit = (pages.calTotalVw() - 100) * widthFactor;
  const snapArray = pages.calSnapArray();
  const blurArray = pages.calBlurArray(100);

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
          0,
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
          0,
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
          0,
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
        <Doors {...props} />
      </Frame>

      <RenderPlayGround
        percent={handleParaScreenPercent('视差滚动NOA', 0.2, -0.2)}
        pageLength={pages.getPageField('视差滚动NOA', 'length') * widthFactor}
        percentCorrection={-0.05} // 百分比修正，为的是让内容停在居中位置
      >
        <Frame
          style={{ display: 'block', overflow: 'visible' }}
          width={pages.getPageField('视差滚动NOA', 'length')}
        >
          <NoaWenParallax
            blur={handleBlur('视差滚动NOA')}
            delayTime={pages.getPageField('视差滚动NOA', 'custom').delayTime}
            duration={
              pages.getPageField('视差滚动NOA', 'custom').animationDuration
            }
            direction={deltaDirection.current > 0}
          >
            <NoaWen deltaY={deltaX} />
          </NoaWenParallax>
        </Frame>
        <Frame
          width={pages.getPageField('详细介绍页', 'length')}
          style={{ display: 'block', overflow: 'visible' }}
        >
          <Passage2
            width={pages.getPageField('详细介绍页', 'length') * widthFactor}
            blur={handleBlur('详细介绍页')}
            delayTime={pages.getPageField('详细介绍页', 'custom').delayTime}
            duration={
              pages.getPageField('详细介绍页', 'custom').animationDuration
            }
            direction={deltaDirection.current > 0}
          />
        </Frame>
      </RenderPlayGround>

      <Frame
        style={{ display: 'block', overflow: 'visible' }}
        width={pages.getPageField('山中之门页', 'length')}
      >
        <WithFlowers {...props}>
          <Parallax
            blur={handleBlur('山中之门页')}
            percent={handleParaScreenPercent('山中之门页', 0.1, -0.1)}
            pageLength={
              pages.getPageField('山中之门页', 'length') * widthFactor
            }
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

export default MovePart;