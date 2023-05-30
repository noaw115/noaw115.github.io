import React, {memo, lazy, Suspense} from "react";
import styled,{keyframes} from "styled-components";
import TopBar from "../../GlobalComponents/TopBar";
import TitleAndText from "./Components/TitleAndText";
import Photo from "./Components/Photo";
import BasicData from "../../GlobalComponents/Data/movingPara";
// import FirstBackground from "./Components/FirstBackground";
import LoadingFirstBackground from "./Components/LoadingFirstBackgrond";

const FirstBackground_lazy = lazy(()=>import("./Components/FirstBackground"))
const LargeFrame=styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;
  top: 0;
  left: 0;
  overflow:hidden;
`
const FixedFrame=memo(styled.div`
  //background-color: aquamarine;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  display: flex;
`)


const MoveFrame=styled.div`
 // background-image: linear-gradient(to right, red , yellow);
  background-color: green;
  position: relative;
  top: 0;
  height: 100%;
  left: 100vw;
  transform: translateX(-${props => props.offset}px);
  transition:0.4s all ease-out;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: visible;
  box-sizing: content-box;
`

const Frame=memo(styled.div`
  background-color: ${props => props.color};
  height: 100%;
  width: 800px;
  flex-shrink: 0;
  overflow: visible;
  display: flex;
  flex-direction: column;
  //margin-left: 10px;
  justify-content: center;
  padding-top: 150px;
  padding-right:  100px;
  padding-left: 100px;
  padding-bottom: 50px;
  box-sizing: border-box;
`)

const Title=styled.div`
  font-size: 40px;
  color: black;
  //width: 00px;
  //background-color: white;
  position: absolute;
  font-family: Floane;
  //font-weight: bolder;
`


class DetailPage extends React.PureComponent{
    constructor(props) {
        super(props);
        this.snapLock=false
        this.isBlur=1000
        this.currentPage=0
        this.blurControl=[]
    }
    state={
        deltaY:0,//单位px
        backgroundScale:0,//单位比例
        blurControl:[]
    }


    handleScroll=(e)=>{
        let currentDelta=e.deltaY*BasicData.moveSpeedFactor
        this.isBlur=document.getElementById(`detail${this.currentPage}`).getBoundingClientRect().right-window.screen.width*1.5
        if(this.isBlur<100){
            this.blurControl[this.currentPage]=false
            this.setState({blurControl:this.blurControl})
            if(this.currentPage<this.props.data.length-1){
                this.currentPage++
            }
        }


        if(e.deltaY>0&&this.state.deltaY>=this.props.data.length*800){
            //console.log("越界")
            this.setState({
                deltaY:this.props.data.length*800,
            })
        }else if(this.state.deltaY+currentDelta>=0&&(this.state.deltaY+currentDelta)/document.body.clientWidth<0.8){
            this.setState({
                deltaY:parseInt(this.state.deltaY+currentDelta),
                backgroundScale:(this.state.deltaY+currentDelta)/document.body.clientWidth,
            })
        }else if(this.state.deltaY+currentDelta>=0&&(this.state.deltaY+currentDelta)/document.body.clientWidth>=0.8){
            this.setState({
                deltaY:parseInt(this.state.deltaY+currentDelta),
            })
        }else if(e.deltaY<0&&this.state.deltaY+currentDelta<0){
            this.setState({
                deltaY:0,
                backgroundScale:0,
            })
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
        if(this.snapLock===false){
            if(Math.abs(this.state.deltaY-document.body.clientWidth)<400){
                //console.log("贴靠")
                this.setState({
                    deltaY:document.body.clientWidth
                })
                setTimeout(()=>{
                    //console.log("上锁，不可贴靠")
                    this.snapLock=true
                },50)
            }
        }
        //上锁状态
        if(this.snapLock===true){
            //console.log("不可贴靠状态下检查",snapDistance,minDistance)
            if(Math.abs(this.state.deltaY-document.body.clientWidth)>600){
                //console.log("解锁，可以贴靠")
                this.snapLock=false
            }
        }
    }
    componentDidMount() {
        this.props.data.map(()=>{
            this.blurControl.push(true)
        })
        this.setState({
            blurControl:this.blurControl
        })

        window.addEventListener('mousewheel', this.handleScroll)
    }


    componentWillUnmount() {
        window.removeEventListener('mousewheel',this.handleScroll)
    }

    render() {
        return(
            <LargeFrame>
                <Suspense fallback={
                    <LoadingFirstBackground>
                        <Title>
                            {this.props.params.page}
                        </Title>
                    </LoadingFirstBackground>
                }>
                    <FirstBackground_lazy
                        width={(100*(1-this.state.backgroundScale))}
                        img={require(`../../GlobalComponents/Image${this.props.cover}`)}
                        blur={this.state.backgroundScale*20}
                        height={(110*(1.5-this.state.backgroundScale*0.5))}>
                        <Title>
                            {this.props.params.page}
                        </Title>
                    </FirstBackground_lazy>
                </Suspense>

                <FixedFrame>
                    <TopBar currentPage={"detail"}/>
                </FixedFrame>
                <MoveFrame offset={this.state.deltaY} id="detailPageMoveFrame">
                    {this.props.data.map((item,key)=>{
                        //console.log("遍历",item)
                        if(item.type==="text"){
                            return(
                                <Frame  color={"#e0e0e0"} key={'frame'+key} id={`detail${key}`} >
                                    <TitleAndText data={item} key={key} blur={this.state.blurControl[key]}/>
                                </Frame>
                            )
                        }
                        if(item.type==="photo"){
                            return (
                                <Frame color={"white"} key={'frame'+key} id={`detail${key}`}>
                                    <Photo data={item} key={key} blur={this.state.blurControl[key]}/>
                                </Frame>
                            )
                        }

                    })}
                </MoveFrame>
            </LargeFrame>
        )
    }
}

export default DetailPage;