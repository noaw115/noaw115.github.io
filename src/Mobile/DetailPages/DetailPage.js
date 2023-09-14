import React from 'react';
import styled, { keyframes } from 'styled-components';
import MobileTitleAndText from './components/TitleAndText';
import MobilePhoto from './components/Photo';
import * as SVG from '../../global-components/Svgs';
import { Link } from 'react-router-dom';
import Video from "./components/Video";

const LargeFrame = styled.div`
  width: 100vw;
  //height: 100vh;
  //background-color: white;
  position: relative;
  top: 0;
  left: 0;
  //overflow:hidden;
`;
const FixedFrame = styled.div`
  //background-color: aquamarine;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  display: flex;
`;

const BackgroundFrame = styled.div`
  height: 50vh;
  width: 100vw;
  position: relative;
  left: 0;
  top: 0;
  //display: flex;
  justify-content: center;
  transition: 0.4s all ease-out;
  align-items: center;
  //box-sizing: border-box;
  //background-color: darkgoldenrod;
`;
const MoveFrame = styled.div`
  // background-image: linear-gradient(to right, red , yellow);
  // background-color: green;
  position: relative;
  top: 100%;
  height: 100vh;
  left: 0;
  //transform: translateY(-${(props) => props.offset}px);
  transition: 0.4s all ease-out;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: visible;
  box-sizing: content-box;
`;

const BackgroundImage2 = styled.div`
  position: absolute;
  //z-index: -1;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  height: 50vh;
  width: 100%;
  transition: 0.4s all ease-out;
  transform: scale(${(props) => props.scale});
  transform-origin: center center;
`;
const Frame = styled.div`
  background-color: ${(props) => props.color};
  //height: 80vh;
  //background-color: aqua;
  //margin-bottom: 10px;
  width: 100vw;
  flex-shrink: 0;
  overflow: visible;
  display: flex;
  flex-direction: column;
  //margin-left: 10px;
  justify-content: center;
  padding: 5vh 5vw 5vh 5vw;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 40px;
  color: black;
  width: 300px;
  //background-color: saddlebrown;
  position: absolute;
  left: 50%;
  //right: 0;
  top: 50%;
  text-align: center;
  //bottom:0;
  //margin: auto;
  transform: translateX(-50%) translateY(-50%);

  //transform:;
  font-family: Floane;
  //font-weight: bolder;
`;
const CloseIconPlace = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.8);
  //background-color: aqua;
`;

const newMain = (props) => {
  const {
    params: { page },
    data,
  } = props;
  return (
    <LargeFrame>
      <BackgroundFrame id="mobileDetailCover">
        <Title>{page}</Title>
        <CloseIconPlace>
          <Link to={`${window.__route__}/`}>{SVG.close_icon_black}</Link>
        </CloseIconPlace>
      </BackgroundFrame>

      <MoveFrame id="detailPageMoveFrame">
        {data.map((item, key) => {
          //console.log("遍历",item)
          if (item.type === 'text') {
            return (
              <Frame
                color={'#e0e0e0'}
                key={'frame' + key}
                id={`mobileDetail${key}`}
              >
                <MobileTitleAndText
                  data={item}
                  key={key}
                  // blur={this.state.blurControl[key]}
                />
              </Frame>
            );
          }
          if (item.type === 'photo') {
            return (
              <Frame
                color={'white'}
                key={'frame' + key}
                id={`mobileDetail${key}`}
              >
                <MobilePhoto
                  data={item}
                  key={key}
                  // blur={this.state.blurControl[key]}
                />
              </Frame>
            );
          }
          if (item.type === 'video') {
            return (
              <Frame
                color={'white'}
                key={'frame' + key}
                id={`mobileDetail${key}`}
              >
                <Video
                  data={item}
                  key={key}
                  isMobile
                  // blur={this.state.blurControl[key]}
                />
              </Frame>
            );
          }
        })}
      </MoveFrame>
    </LargeFrame>
  );
};

class MobileDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.snapLock = false;
    this.isBlur = 1000;
    this.currentPage = 0;
    this.blurControl = [];
  }
  state = {
    blurControl: [],
  };

  handleScroll = () => {
    this.isBlur =
      document
        .getElementById(`mobileDetail${this.currentPage}`)
        .getBoundingClientRect().top - window.screen.height;

    if (this.isBlur < 100) {
      this.blurControl[this.currentPage] = false;
      this.setState({ blurControl: this.blurControl });
      if (this.currentPage < this.props.data.length - 1) {
        this.currentPage++;
      }
    }
  };

  componentDidMount() {
    this.props.data.map(() => {
      this.blurControl.push(false);
    });
    // this.blurControl[0]=false
    this.setState({
      blurControl: this.blurControl,
    });

    // window.addEventListener('touchstart',this.handleScroll)
  }
  componentWillUnmount() {
    // window.removeEventListener("touchstart",this.handleScroll)
  }

  render() {
    return (
      <LargeFrame>
        <BackgroundFrame id="mobileDetailCover">
          {/*<BackgroundImage2 img={require(`../../asserts/Image${this.props.cover}`)}  />*/}
          <Title>{this.props.params.page}</Title>
          <CloseIconPlace>
            <Link to={'/'}>{SVG.close_icon_black}</Link>
          </CloseIconPlace>
        </BackgroundFrame>

        <MoveFrame id="detailPageMoveFrame">
          {this.props.data.map((item, key) => {
            //console.log("遍历",item)
            if (item.type === 'text') {
              return (
                <Frame
                  color={'#e0e0e0'}
                  key={'frame' + key}
                  id={`mobileDetail${key}`}
                >
                  <MobileTitleAndText
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
                  color={'white'}
                  key={'frame' + key}
                  id={`mobileDetail${key}`}
                >
                  <MobilePhoto
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

export default newMain;
