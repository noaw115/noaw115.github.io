import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import * as Data from '../../GlobalComponents/Data/static';
import * as Image from '../../GlobalComponents/image';
import Passage from './Components/Passage';
import Passage2 from './Components/Passage2';
import Doors from './Components/Doors';
import TopBar from '../../GlobalComponents/TopBar';
import BasicData from '../../GlobalComponents/Data/movingPara';
import NoaWen from '../Homepage/Components/NoaWen';
import Parallax from './Components/Parallax';
import StaticContent from './Components/StaticContent';

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
  width: 40vw;
  height: 100vh;
  background-color: red;
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

function CalculateAppearArray(PageDate, factor) {
  let beginToAppearArray = [];
  let hasAppearedArray = [0];
  let lengthTemp = 0;
  for (let i = 0; i < PageDate.length; i++) {
    lengthTemp += PageDate[i].length;
    console.log('第几页', i);
    console.log('多长', PageDate[i].length);
    beginToAppearArray.push(parseInt(lengthTemp - 100));
    //Begin这个用于判定高斯模糊
    hasAppearedArray.push(parseInt(lengthTemp) * factor);
    //Has这个用于判定贴靠
  }
  return {
    beginToAppear: beginToAppearArray,
    hasAppeared: hasAppearedArray,
  };
}

function CalculateTotalLength(PageData) {
  let lenArray = [0];
  let parallaxScrollTemp = [];
  for (let i = 0; i < PageData.length; i++) {
    //针对有设置视差滚动的页面，计算其初始值和结束值
    if (PageData[i].ParallaxScroll === true) {
      //筛选出拥有视差滚动效果的板块
      parallaxScrollTemp.push(parseInt(lenArray[0]) - 100);
      //到该板块为止（不包含该板块）的总长度值-100，即该板块首次出现在视野时的位移，单位vw
      parallaxScrollTemp.push(parseInt(PageData[i].length));
      //该板块的长度，单位vw

      lenArray.push(parallaxScrollTemp);
      parallaxScrollTemp = [];
    }
    lenArray[0] += PageData[i].length;
  }
  //console.log("看看算出来啥了",lenArray)
  return lenArray;
  //单位:vw
  //输出：[总长度,[第一个视差滚动的起点,第一个视差滚动的长度],[第二个视差滚动的起点,第二个视差滚动的长度],...]
}

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.HomepageData = Data.HomepageData;
    this.widthFactor = document.body.clientWidth / 100;
    //意义👆给我一个vw的数如70vw，70*withFactor得到真实的像素数
    this.len = null;
    //👆 [总长度,[第一个视差滚动的起点,第一个视差滚动的长度],[第二个视差滚动的起点,第二个视差滚动的长度],...]
    this.totalLength = null;

    this.appearArray = null;

    this.snapLock = false;
    //👆false：未上锁，允许贴靠（远离边界时）
    //true：上锁，不允许贴靠（靠近边界时）

    this.blurControl = [];
    // this.currentPage=0
    this.moveLimit = null;

    this.currentPageBeginToAppear = 0;
    //👆高斯模糊
    this.currentPageHasAppeared = -1;
    //👆识别页数，logo颜色

    this.paraScr1 = -1;
    this.paraScr2 = -1;
    this.tempDelta = 0;
    this.isSnap = 0;
  }
  state = {
    deltaY: 0, //单位px
    nowShow: 0,
    paraScr1: 0,
    paraScr2: 0,
    resize: false,
  };
  handleWheel = (e) => {
    console.log("Main一直在监听")
    /**在范围内把滚轮产生的deltaY累加起来**/
    if (
      this.state.deltaY + e.deltaY * BasicData.moveSpeedFactor >= 0 &&
      this.state.deltaY + e.deltaY * BasicData.moveSpeedFactor <= this.moveLimit
    ) {
      this.setState({
        deltaY: parseInt(
          this.state.deltaY + e.deltaY * BasicData.moveSpeedFactor
        ),
      });
    }

    /**针对视差滚动**/
    this.paraScr1 = (this.state.deltaY - this.len[1][0] * this.widthFactor) / ((this.len[1][1] + 100) * this.widthFactor);
    this.paraScr2 =
      (this.state.deltaY - this.len[2][0] * this.widthFactor) /
      ((this.len[2][1] + 100) * this.widthFactor);
    //针对第一个视差滚动页面
    if (this.paraScr1 >= -0.1 && this.paraScr1 <= 1.1) {
      this.setState({
        paraScr1: this.paraScr1,
      });
    }
    //针对第二个视差滚动界面
    if (this.paraScr2 >= -0.1 && this.paraScr2 <= 1.1) {
      this.setState({
        paraScr2: this.paraScr2,
      });
    }

    /**判定当前页数，原理和判定吸附相同，但是要提前一点因为要预备变色**/
    //针对页面判断用到的是this.appearArray.hasAppeared
    if (
      e.deltaY > 0 &&
      this.appearArray.hasAppeared[this.currentPageHasAppeared + 1] - this.state.deltaY - 400 < 200
    ) {
      this.currentPageHasAppeared++;
    } else if (
      e.deltaY < 0 &&
      this.state.deltaY + 400 - this.appearArray.hasAppeared[this.currentPageHasAppeared] < 200 &&
      this.currentPageHasAppeared > 0
    ) {
      this.currentPageHasAppeared--;
    }
    // console.log("i",this.currentPageHasAppeared)

    /**
     * 逻辑：
     * 初始-未上锁：检测到deltaY距离边界+-5时，强制设定deltaY，然后上锁
     * 上锁：继续检测deltaY接近边界，但是不强制设定deltaY,否则就挪不开了
     * 解锁：检测到deltaY距离边界+-10时，恢复未上锁状态
     */
    /**判定吸附**/
    //针对贴靠用到的是this.appearArray.hasAppeared
    //👇上锁过程
    if (this.snapLock === false) {
      //👈允许吸附
      if (
        e.deltaY > 0 &&
        Math.abs(
          this.appearArray.hasAppeared[this.isSnap + 1] - this.state.deltaY
        ) < 500
      ) {
        // console.log("判定吸附-前滚到",this.isSnap+1,"位置是",this.appearArray.hasAppeared[this.isSnap + 1])
        this.setState({
          deltaY: this.appearArray.hasAppeared[this.isSnap + 1],
        });

        // console.log("吸附，并上锁，不可再贴靠,isSnap",this.isSnap)
        this.snapLock = true;
        this.isSnap++;
      } else if (
        e.deltaY < 0 &&
        Math.abs(
          this.state.deltaY - this.appearArray.hasAppeared[this.isSnap - 1]
        ) < 600 &&
        this.isSnap > 0
      ) {
        // console.log("判定吸附-后滚到",isSnap-1)
        this.setState({
          deltaY: this.appearArray.hasAppeared[this.isSnap - 1],
        });

        // console.log("吸附，并上锁，不可再贴靠,isSnap",isSnap)
        this.snapLock = true;
        this.isSnap--;
      }
    }
    //👇解锁过程
    if (this.snapLock === true) {
      this.tempDelta += Math.abs(e.deltaY);
      if (Math.abs(this.tempDelta) > 40) {
        // console.log("解锁，可以贴靠,isSnap=",isSnap)
        this.snapLock = false;
        this.tempDelta = 0;
      }
    }

    /**
         *
         * 假如第N页的宽度为WN

         * ②页面左边缘靠到屏幕右边缘上开始算--高斯模糊
         *      第1页 一直触发
         *      第2页 W1-100触发
         *      第3页 W1+W2-100触发
         *      第4页 W1+W2+W3-100触发
         *      ...
         *      形式:一个数组,初始为 [false,true,true,true...]
         *      触发第i页,将第i个数字设为false即可
         *  也就是说,只要维护一个 [W1-100,W1+W2-100,W1+W2+W3-100...]的数组,也就是this.snapArray数组,
         *  然后考察目前deltaY
         *  就可以触发① ②
         *
         */
    /**高斯模糊**/

    if (
      e.deltaY > 0 &&
      this.state.deltaY >
        this.appearArray.beginToAppear[this.currentPageBeginToAppear] *
          this.widthFactor
    ) {
      console.log('blurControl[', this.currentPageBeginToAppear + 1, ']=false');
      this.blurControl[this.currentPageBeginToAppear + 1] = false;
      console.log('currentpage增加了');
      this.currentPageBeginToAppear++;
    } else if (
      e.deltaY < 0 &&
      this.state.deltaY <
        this.appearArray.beginToAppear[this.currentPageBeginToAppear] *
          this.widthFactor
    ) {
      this.blurControl[this.currentPageBeginToAppear + 1] = true;
      // console.log("currentpage减少了")
      this.currentPageBeginToAppear--;
    }
  };

  initialAction = () => {
    this.widthFactor = document.body.clientWidth / 100;
    //意义👆给我一个vw的数如70vw，70*withFactor得到真实的像素数
    this.len = CalculateTotalLength(this.HomepageData);
    //👆 [总长度,[第一个视差滚动的起点,第一个视差滚动的长度],[第二个视差滚动的起点,第二个视差滚动的长度],...]
    this.totalLength = this.len[0]; //总长度
    this.blurControl = [];
    this.appearArray = CalculateAppearArray(
      this.HomepageData,
      this.widthFactor
    );
    console.log('初始化', this.len, this.appearArray);

    this.snapLock = false;
    //👆false：未上锁，允许贴靠（远离边界时）
    //true：上锁，不允许贴靠（靠近边界时）

    // this.currentPage=0
    this.moveLimit =
      ((this.totalLength - 100) / 100) * document.body.clientWidth;

    this.currentPageBeginToAppear = 0;
    //👆高斯模糊
    this.currentPageHasAppeared = -1;
    //👆识别页数，logo颜色

    this.tempDelta = 0;
    this.isSnap = 0;
    this.setState({ deltaY: 0 });
  };

  componentDidMount() {
    this.initialAction();

    this.HomepageData.map((item) => {
      this.blurControl.push(true); //初始全都是模糊态
    });
    this.blurControl[0] = false;

    window.addEventListener('resize', this.initialAction);
    window.addEventListener('mousewheel', this.handleWheel);
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.handleWheel);
    window.removeEventListener('resize', this.initialAction);
  }

  
  render() {
    // console.log("到底哪里有问题",this.appearArray)
    console.log('deltaY', this.state.deltaY);
    // console.log("blurContorl",this.blurControl)
    return (
      <LargeFrame>
        <FixedFrame>
          <TopBar currentPage={this.currentPageHasAppeared} />
          {/*{this.state.deltaY}*/}
        </FixedFrame>
        <MoveFrame offset={this.state.deltaY} width={this.totalLength}>
          {/*1首页有门的*/}
          <Frame
            style={{ backgroundImage: this.HomepageData[0].backgroundColor }}
            width={this.HomepageData[0].length}
          >
            <Doors />
          </Frame>
          
          <Frame
            color={this.HomepageData[1].backgroundColor}
            width={this.HomepageData[1].length}
          >
            <Parallax
              blur={this.blurControl[1]}
              offset={this.state.paraScr1 * 500}
            />
          </Frame>
          
          {/*<Frame*/}
          {/*  color={this.HomepageData[1].backgroundColor}*/}
          {/*  width={this.HomepageData[1].length}*/}
          {/*>*/}
          {/*  <NoaWen deltaY={this.state.deltaY}/>*/}
          {/*</Frame>*/}
          <Frame
            color={this.HomepageData[2].backgroundColor}
            width={this.HomepageData[2].length}
          >
            <Passage2 blur={this.blurControl[2]} />
          </Frame>
          <Frame
            color={this.HomepageData[3].backgroundColor}
            width={this.HomepageData[3].length}
            style={{ overflowX: 'visible', zIndex: '3' }}
          >
            <StaticContent />
            <Parallax
              blur={this.blurControl[3]}
              offset={this.state.paraScr2 * 500}
            />
          </Frame>
        </MoveFrame>
      </LargeFrame>
    );
  }
}

export default Main;
