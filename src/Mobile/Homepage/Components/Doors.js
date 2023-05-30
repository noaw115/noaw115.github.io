import React from "react";
import styled,{keyframes} from "styled-components";
import * as Svg from '../../../GlobalComponents/Data/svgs'
import * as Data from '../../../GlobalComponents/Data/static'
import * as Image from '../../../GlobalComponents/image'
import SvgMask from "../../../GlobalComponents/SVGmask";
import {useNavigate,Link} from "react-router-dom";

const Frame=styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
`

const Frame_Column=styled.div`
  //background-color:red ;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 50%;
`
const ShakePicture=styled.div`
  position: absolute;
  z-index: 2;
  //background-color: aqua;
  animation: ${props => {
    return (
        keyframes`
            
            0%{
              transform: scale(1)  translateY(0px);
            }
            
            100%{
              transform: scale(1.05) translateY(2px);
            }
           `
    )
}} ease-in-out ${props=>props.interval}s infinite;
  animation-direction:alternate;
  animation-delay: ${props => props.delay}s;
`

const Circle=styled.div`
  //background-color: red;
  width: ${props => props.r}vh;
  height: ${props => props.r}vh;
  position: absolute;
  left: 60%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  border-radius: ${props => props.r}vh;
  border: black 1px ${props => props.dashed?"dashed":"solid"};
  //z-index: ;
  opacity: 0.4;
`
const LogoPlace=styled.div`
  //position: absolute;
  //top: 10px;
  left: 40px;
  width: 100px;
  position: relative;
  margin-bottom: 10px;
  //background-color: aqua;
  //height: 30px;
  //width: 30px;
  //z-index: 20;
`
const Works=styled.div`
  //background-color: brown;
  //height: 450px;
  width: 200px;
  position: absolute;
  // right: ${props => props.right}%;
   left: ${props => props.left}%;
  // bottom:${props => props.bottom}vh;
  transform:translateX(-50%) scale(${props=>props.scale});
  flex-grow: 0;
`
const WorksInner=styled.div`
  position: relative;
  cursor: pointer;
  //background-color: #61dafb;
`

const WorksTitle=styled.div`
  font-family: Floane;
  font-size: 26px;
  color: black;
  // background-color: #282c34;
  position: absolute;
  top: 270%;
  left: 10px;
`
const  LogoImage=styled.div`
  background-image: url(${props => props.img}) ;
  width: 90px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
`

const RotateStar=styled.div`
    position: absolute;
   animation: ${props => {
    return (
        keyframes`

            0%{
              transform: rotate( ${props.startDeg}deg)  scale(${props.correction});
            }

            100%{
              transform: rotate(${props.dire?props.startDeg+2:props.startDeg-5}deg) scale(${props.correction});
            }

           `
    )
}} 4s ease-in-out infinite alternate;
  transform-origin:   ${props => props.r/2}vh  ${props => props.r/2}vh;
`
// function SelectedPhotoScale(index){
//     console.log("进入函数",document.getElementsByName(`Door${index}`))
// }
function MobileDoors(props){
    const CircleR=[80,60,40]
    let scale=window.screen.height/950
    return(
        <>

            {/*内圈*/}
            <Circle r={CircleR[2]} dashed={true}>
                <RotateStar r={CircleR[2]} startDeg={90} dire={false} correction={0.91}>
                    {Svg.Star1}
                </RotateStar>
                <RotateStar r={CircleR[2]+10} startDeg={306} dire={false} correction={0.78}>
                    {Svg.Star2}
                </RotateStar>
            </Circle>
            {/*中圈*/}
            <Circle r={CircleR[1]}>
                <RotateStar r={CircleR[1]-5} startDeg={70} dire={true} correction={0.8}>
                    {Svg.Star3}
                </RotateStar>
                <RotateStar r={CircleR[1]} startDeg={212} dire={false} correction={0.8}>
                    {Svg.Star4}
                </RotateStar>
            </Circle>
            {/*外圈*/}
            <Circle r={CircleR[0]} dashed={true}>
                <RotateStar r={CircleR[0]} startDeg={100} dire={false} correction={0.78}>
                    {Svg.Star4}
                </RotateStar>
                <RotateStar r={CircleR[0]} startDeg={170} dire={false} correction={0.78}>
                    {Svg.Star3}
                </RotateStar>
            </Circle>

            <Frame_Column>
                <LogoPlace>
                    <LogoImage img={require("../../../GlobalComponents/Image/icon_black.png")}/>
                </LogoPlace>
                <Frame>

                    {/*0号 靠左上*/}
                    <Works left={55} top={-3} scale={scale}>
                        {/*{window.screen.height/900}*/}
                        <Link to={`/${Data.HomepageData[0].contend.Door0.text}`}>
                            <WorksInner >
                                <ShakePicture delay={0} interval={4} >
                                    <SvgMask  image={require(`../../../GlobalComponents/Image${Data.CoverData[0].miniCover}`)} index={0} />
                                    <WorksTitle>
                                        {Data.HomepageData[0].contend.Door0.text}
                                    </WorksTitle>
                                </ShakePicture>
                            </WorksInner>
                        </Link>
                    </Works>
                </Frame>
                <Frame>
                    {/*2号 靠左下*/}
                    <Works left={60} bottom={10} scale={scale}>
                        {/*18*/}
                        <Link to={`/${Data.HomepageData[0].contend.Door2.text}`}>
                            <WorksInner >
                                <ShakePicture delay={2} interval={4}>
                                    <SvgMask  image={require(`../../../GlobalComponents/Image${Data.CoverData[2].miniCover}`)} index={2}/>
                                    <WorksTitle top={200}>
                                        {Data.HomepageData[0].contend.Door2.text}
                                    </WorksTitle>
                                </ShakePicture>
                            </WorksInner>
                        </Link>

                    </Works>
                </Frame>
            </Frame_Column>
            <Frame style={{width:"50%"}}>
                {/*1号 靠右*/}
                <Works left={50} scale={scale} style={{top:"20%"}}>
                    <Link to={`/${Data.HomepageData[0].contend.Door1.text}`}>
                        <WorksInner>
                            <ShakePicture delay={0} interval={5}>
                                <SvgMask image={require(`../../../GlobalComponents/Image${Data.CoverData[1].miniCover}`)} index={1}/>
                                <WorksTitle>
                                    {Data.HomepageData[0].contend.Door1.text}
                                </WorksTitle>
                            </ShakePicture>
                        </WorksInner>
                    </Link>
                </Works>
            </Frame>

        </>
    )
}

export default MobileDoors