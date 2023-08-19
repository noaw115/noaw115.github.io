import React, { memo, lazy, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import TopBar from '../components/TopBar';
import TitleAndText from './components/TitleAndText';
import Photo from './components/Photo';
import BasicData from '../../GlobalComponents/Data/movingPara';
import FirstBackground from './components/FirstBackground';
import Video from "./components/Video";
const LargeFrame = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
`;
const FixedFrame = memo(styled.div`
  //background-color: aquamarine;
  width: 100vw;
  z-index: 10;
  position: absolute;
  display: flex;
`);

const MoveFrame = styled.div`
  // background-image: linear-gradient(to right, red , yellow);
  // background-color: green;
  position: relative;
  top: 0;
  height: 100%;
  left: 100vw;
  transform: translateX(-${(props) => props.offset}px);
  transition: 0.4s all ease-out;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: visible;
  box-sizing: content-box;
`;

const Frame = memo(styled.div`
  background-color: ${(props) => props.color};
  height: 100%;
  width: ${(props) => (props.width ? props.width + 'px' : '800px')};
  flex-shrink: 0;
  overflow: visible;
  display: flex;
  flex-direction: column;
  //margin-left: 10px;
  justify-content: center;
  padding-top: 50px;
  padding-right: 100px;
  padding-left: 100px;
  padding-bottom: 50px;
  box-sizing: border-box;
`);

const TitlePart = styled.div`
  font-size: 30px;
  color: black;
  //background: aqua;
  height: 90%;
  position: absolute;
  font-family: Floane;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.snapLock = false;
    this.isBlur = 1000;
    this.currentPage = 0;
    this.blurControl = [];
    this.totalLength = 0;
  }
  state = {
    deltaY: 0, //单位px
    backgroundScale: 0, //单位比例
    blurControl: [],
  };

  calTotalWidth = () => {
    let width = 0;
    this.props.data.forEach((item) => {
      console.log('width', item.width);
      if (item.width) {
        console.log(item.width);
        width += Number(item.width);
      } else {
        console.log(800);
        width += Number(800);
      }
    });
    console.log('算以下', width); //？z这里有问题
    return width;
  };
  handleScroll = (e) => {
    let currentDelta = e.deltaY * BasicData.moveSpeedFactor;
    this.isBlur =
      document
        .getElementById(`detail${this.currentPage}`)
        .getBoundingClientRect().right -
      window.innerWidth * 1.5;
    if (this.isBlur < 100) {
      this.blurControl[this.currentPage] = false;
      this.setState({ blurControl: this.blurControl });
      if (this.currentPage < this.props.data.length - 1) {
        this.currentPage++;
      }
    }

    if (e.deltaY > 0 && this.state.deltaY >= this.calTotalWidth()) {
      console.log('越界');
      this.setState({
        deltaY: this.calTotalWidth(),
      });
    } else if (
      this.state.deltaY + currentDelta >= 0 &&
      (this.state.deltaY + currentDelta) / document.body.clientWidth < 0.8
    ) {
      this.setState({
        deltaY: parseInt(this.state.deltaY + currentDelta),
        backgroundScale:
          (this.state.deltaY + currentDelta) / document.body.clientWidth,
      });
    } else if (
      this.state.deltaY + currentDelta >= 0 &&
      (this.state.deltaY + currentDelta) / document.body.clientWidth >= 0.8
    ) {
      this.setState({
        deltaY: parseInt(this.state.deltaY + currentDelta),
      });
    } else if (e.deltaY < 0 && this.state.deltaY + currentDelta < 0) {
      this.setState({
        deltaY: 0,
        backgroundScale: 0,
      });
      //console.log("错误检测")
    }

    //也需要一个贴靠
    /**
     * 逻辑：
     * 初始-未上锁：检测到deltaY距离边界+-5时，强制设定deltaY，然后上锁
     * 上锁：继续检测deltaY接近边界，但是不强制设定deltaY,否则就挪不开了
     * 解锁：检测到deltaY距离边界+-10时，恢复未上锁状态
     */

    //未上锁状态
    if (this.snapLock === false) {
      if (Math.abs(this.state.deltaY - document.body.clientWidth) < 400) {
        //console.log("贴靠")
        this.setState({
          deltaY: document.body.clientWidth,
        });
        setTimeout(() => {
          //console.log("上锁，不可贴靠")
          this.snapLock = true;
        }, 50);
      }
    }
    //上锁状态
    if (this.snapLock === true) {
      //console.log("不可贴靠状态下检查",snapDistance,minDistance)
      if (Math.abs(this.state.deltaY - document.body.clientWidth) > 600) {
        //console.log("解锁，可以贴靠")
        this.snapLock = false;
      }
    }
  };
  componentDidMount() {
    // this.totalLength = this.calTotalWidth();
    this.props.data.map(() => {
      this.blurControl.push(true);
    });
    this.setState({
      blurControl: this.blurControl,
    });

    window.addEventListener('mousewheel', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.handleScroll);
  }

  getTitleChineseText = (page) => {
    const { coverData } = this.props
    let res= ''
    coverData.forEach((item)=>{
      if (item.page === page){
        res = item.chineseText
      }
    })
    return res
  }

  getNextText = (page) => {
    const { coverData } = this.props
    let res ={
      text: coverData[0].page,
      chineseText: coverData[0].chineseText,
    }
    let target = false;
    coverData.forEach((item)=>{

      if (target) {
        console.log("next,item",item)
        res.text = item.page
        res.chineseText = item.chineseText
        target = false
      }
      if (item.page === page){
        console.log("当下一样",item.page)
        target = true
      }
    })
    return res
  }

  getLastText = (page) => {
    const { coverData } = this.props
    let lastItem
    let res= {
      text: coverData[coverData.length-1].page,
      chineseText: coverData[coverData.length-1].chineseText,
    }
    coverData.forEach((item)=>{
      if (item.page === page){
        if (lastItem){
          res.text = lastItem.page
          res.chineseText = lastItem.chineseText
        }

      } else {
        lastItem = item
      }
    })
    return res
  }
  render() {
    return (
      <LargeFrame>
        <FirstBackground
          width={100 * (1 - this.state.backgroundScale)}
          // img={require(`../../GlobalComponents/Image${this.props.cover}`)}
          // blur={this.state.backgroundScale * 20}
          height={110 * (1.5 - this.state.backgroundScale * 0.5)}
        >
          <TitlePart>
            <Title style={{fontSize: '16px'}}>
              <div style={{fontFamily:'Xiaowei', marginBottom: '20px'}}>
                {this.getLastText(this.props.params.page).chineseText}
              </div>
              <div>
                {this.getLastText(this.props.params.page).text}
              </div>
            </Title>
            <Title>
              <div style={{fontFamily:'Xiaowei', marginBottom: '20px'}}>
                {this.getTitleChineseText(this.props.params.page)}
              </div>
              <div>
                {this.props.params.page}
              </div>
            </Title>
            <Title style={{fontSize: '16px'}}>
              <div style={{fontFamily:'Xiaowei', marginBottom: '20px'}}>
                {this.getNextText(this.props.params.page).chineseText}
              </div>
              <div>
                {this.getNextText(this.props.params.page).text}
              </div>
            </Title>
          </TitlePart>
        </FirstBackground>
        <FixedFrame>
          <TopBar currentPage={'detail'} pushElement={this.props.pushElement} />
        </FixedFrame>
        <MoveFrame offset={this.state.deltaY} id="detailPageMoveFrame">
          <Frame
            color={'#e0e0e0'}
            // key={'frame' + key}
            // id={`detail${key}`}
            width={'700'}
          >
            测试video
            <Video data={this.props.data[0]}/>
          </Frame>
          {this.props.data.map((item, key) => {
            //console.log("遍历",item)
            if (item.type === 'text') {
              return (
                <Frame
                  color={'#e0e0e0'}
                  key={'frame' + key}
                  id={`detail${key}`}
                  width={item.width}
                >
                  <TitleAndText
                    data={item}
                    key={key}
                    blur={this.state.blurControl[key]}
                  />
                </Frame>
              );
            }
            if (item.type === 'photo') {
              return (
                <Frame
                  style={{ paddingLeft: '50px', paddingRight: '50px' }}
                  color={'white'}
                  key={'frame' + key}
                  id={`detail${key}`}
                  width={item.width}
                >
                  <Photo
                    data={item}
                    key={key}
                    blur={this.state.blurControl[key]}
                  />
                </Frame>
              );
            }
          })}
        </MoveFrame>
      </LargeFrame>
    );
  }
}

export default Main;
