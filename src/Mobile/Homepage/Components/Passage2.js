import React,{useState,useEffect,useRef} from "react";
import styled,{keyframes} from "styled-components";
import * as Data from '../../../GlobalComponents/Data/static'
import * as Image from "../../../GlobalComponents/image";
import * as Svg from '../../../GlobalComponents/Data/svgs'
import BasicData from "../../../GlobalComponents/Data/movingPara";

const Frame=styled.div`
  //background-color: #61dafb;
  box-sizing: border-box;
  padding:10vh 10vw 10vh 10vw;
  position: relative;
  display: flex;
  flex-direction: column;
  color: white;
  filter: blur(${props=>props.blur?'40':'0'}px);
  transition:${BasicData.mobileBlurTime} all ease-out;
`
const LeftPassage=styled.div`
  //background-color: red;
  flex-shrink: 0;
  margin-bottom: 30px;
`

const RightPassage=styled.div`
  //background-color: blue;
  font-size: 16px;
  flex-shrink: 1;
  line-height: 26px;
`

const LargeTitle=styled.div`
  font-size: 34px;
  line-height: 42px;
  
`
const LeftLargeTitle=styled(LargeTitle)`
  //background-color: cadetblue;
  margin-bottom: 20px;
`

const LeftSmallTitle=styled.div`
  //background-color: red;
    font-size: 18px;
  line-height: 24px;
`
const LogoSpace=styled.div`
  margin-top: 60px;
  //background-color: cadetblue;
  width: 200px;
  height: 80px;
  margin-bottom: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftText=styled.div`
  font-size: 14px;
  line-height: 26px;
  margin-bottom: 20px;
`

const LeftEmailSpace=styled.div`
  //background-color: aquamarine;
  position: relative;
  height: 28px;
  
  overflow: hidden;
  display: flex;
  align-items: center;
  
`

const RightSmallTitle=styled.div`
  //background-color: red;
  font-size: 14px;
  font-weight: bolder;
  line-height: 24px;
`
const RightLargeTitle=styled(LargeTitle)`
  margin-top: 40px;
  margin-bottom: 40px;
`

const TextArea=styled.div`
  //background-color: darkgoldenrod;
  display: flex;
  font-size: 14px;
  line-height: 26px;
  
`

const OnePassage=styled.div`
  //background-color: aqua;
  width: 47%
  
  //height: 100%;
`
const LogoImage2=styled.div`
    width: 100%;
  height: 100%;
  background-image: url(${Image.LogoWhite}) ;
  background-size: contain;
  background-repeat: no-repeat;
  transition: 0.5s all;
`

const EmailAnimation=styled.div`
  //position: absolute;
  //background-color: coral;
  font-size: 20px;
  line-height: 28px;
  transition: 0.5s;
  margin-right: 20px;
`



function MobilePassage2(props){

    let {blur}=props
    const lLTRef=useRef(null)
    const lSTRef=useRef(null)
    const lTRef=useRef(null)
    const rTRef=useRef(null)

    useEffect(()=>{
        lLTRef.current.innerHTML=Data.HomepageData[4].content.leftLargeTitle
        lSTRef.current.innerHTML=Data.HomepageData[4].content.leftSmallTitle
        lTRef.current.innerHTML=Data.HomepageData[4].content.leftText
        rTRef.current.innerHTML=Data.HomepageData[4].content.rightText
    },[])


    return(
        <Frame blur={blur}>
            <LeftPassage>
                <LeftLargeTitle ref={lLTRef}>
                    Loading
                </LeftLargeTitle>
                <LeftSmallTitle ref={lSTRef}>
                    Loading
                </LeftSmallTitle>
                <LogoSpace>
                    <LogoImage2/>
                </LogoSpace>
                <LeftText ref={lTRef}>
                    Loading
                </LeftText>
                <LeftEmailSpace>
                    <EmailAnimation>
                        {Data.HomepageData[4].content.leftEmail}
                    </EmailAnimation>
                    {Svg.FrontArrow}
                </LeftEmailSpace>

            </LeftPassage>
            <RightPassage>
                <RightSmallTitle>
                    {Data.HomepageData[4].content.rightSmallTitle}
                </RightSmallTitle>
                <RightLargeTitle>
                    {Data.HomepageData[4].content.rightLargeTitle}
                </RightLargeTitle>
                <TextArea ref={rTRef}>
                        Loading
                </TextArea>
            </RightPassage>
        </Frame>
    )
}
export default MobilePassage2;