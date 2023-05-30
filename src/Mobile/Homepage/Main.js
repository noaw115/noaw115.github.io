import React from "react";
import styled, {keyframes} from "styled-components";
import MobileDoors from "./Components/Doors";
import * as Data from "../../GlobalComponents/Data/static"
import * as Image from "../../GlobalComponents/image"
import MobilePassage from "./Components/Passage";
import MobilePassage2 from "./Components/Passage2";
import BasicData from "../../GlobalComponents/Data/movingPara";

const ShowImage=styled.div`
    width: 100%;
  height: 100%;
  background-image: url(${props => props.source});
  
`


const Frame=styled.div`
    background-color: ${props => props.color};
  width: 100vw;
  height: ${props => props.height}vh;
  position: relative;
  display: flex;
  overflow: hidden;
`
const LargeFrame=styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: white;
  animation: ${props => {
    return (
        keyframes`
            
            0%{
              opacity: 0;
              transform:translateY(-20%);
              filter: blur(20px);
            }
            
            100%{
              opacity: 1;
              transform:translateY(0);
              filter: blur(0);
            }
            
           `
    )
}} ease-out ${BasicData.mobileBlurTime} forwards;
`

class MobileMain extends React.Component{
    constructor() {
        super();
        this.blurControl=[]
        this.isBlur=1000
        this.currentPage=1
    }

    state={
        blurControl:[]
    }


    handleScroll=(e)=>{
        /**设置模糊**/
        if(document.getElementById(`mobileFrame${this.currentPage}`)){
            this.isBlur=document.getElementById(`mobileFrame${this.currentPage}`).getBoundingClientRect().top-window.screen.height
        }


        if(this.isBlur<100){
            this.blurControl[this.currentPage]=false
            this.setState({blurControl:this.blurControl})
            //console.log("置false",i)
            if(this.currentPage<Data.HomepageData.length-1){
                this.currentPage++
            }
        }
        if(Math.abs(document.getElementById(`mobileFrame0`).getBoundingClientRect().top)<100){
            this.currentPage=1
            for(let i=1;i<this.blurControl.length;i++){
                this.blurControl[i]=true
            }
            this.setState({blurControl:this.blurControl})
        }
    }

    componentDidMount() {
        Data.HomepageData.map((item)=>{
            this.blurControl.push(true)//初始全都是模糊态
        })
        this.blurControl[0]=false

        this.setState({
            blurControl:this.blurControl
        })

        // window.addEventListener('wheel',this.handleWheel)
        window.addEventListener('touchstart',this.handleScroll)
        window.addEventListener('wheel',this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('touchstart',this.handleScroll)
        window.removeEventListener('wheel',this.handleScroll)
    }


    render() {
        return(
            <LargeFrame>

                <Frame id={"mobileFrame0"} height={Data.HomepageData[0].mobileLength} style={{backgroundImage:Data.HomepageData[0].backgroundColor}}>
                    <MobileDoors/>
                </Frame>
                <Frame id={"mobileFrame1"} height={Data.HomepageData[1].mobileLength} color={Data.HomepageData[1].backgroundColor}>
                    <ShowImage source={Image.TestImage}/>
                </Frame>
                <Frame id={"mobileFrame2"}  color={Data.HomepageData[2].backgroundColor}>
                    <MobilePassage blur={this.state.blurControl[2]}/>
                </Frame>
                <Frame id={"mobileFrame3"} height={Data.HomepageData[3].mobileLength} color={Data.HomepageData[3].backgroundColor}>
                    <ShowImage source={Image.TestImage}/>
                </Frame>
                <Frame id={"mobileFrame4"} color={Data.HomepageData[4].backgroundColor}>
                    <MobilePassage2 blur={this.state.blurControl[4]}/>
                </Frame>
                {/*<Frame id={"mobileFrame5"} height={Data.HomepageData[5].mobileLength} color={Data.HomepageData[5].backgroundColor}>*/}
                {/*    <MobilePassage2/>*/}
                {/*</Frame>*/}
            </LargeFrame>
        )
    }
}

export default MobileMain