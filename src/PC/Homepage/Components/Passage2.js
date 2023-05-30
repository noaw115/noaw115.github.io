import React,{memo,useState,useEffect,useRef} from "react";
import styled,{keyframes} from "styled-components";
import * as Data from '../../../GlobalComponents/Data/static'
import passage, {SplitParagraph} from "./Passage";
import * as Image from "../../../GlobalComponents/image";
import * as Svg from '../../../GlobalComponents/Data/svgs'

const Frame=styled.div`
  //background-color: #61dafb;
  position: relative;
  margin-top: 30vh;
  margin-left: 10vw;
  width: 78vw;
  flex-shrink: 0;
  display: flex;
  color: white;
  filter: blur(${props=>props.blur?'40':'0'}px);
  transition:1.2s all ease-out;
`
const LeftPassage=styled.div`
  //background-color: red;
  height: 100%;
  width: 400px;
  flex-shrink: 0;
  margin-right: 200px;
`

const RightPassage=styled.div`
  //background-color: blue;
  height: 100%;
  width: 100%;
  font-size: 14px;
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
  width: 300px;
  height: 80px;
  margin-bottom: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftText=styled.div`
  font-size: 14px;
  line-height: 20px;
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
  margin-top: 16vh;
`
const RightLargeTitle=styled(LargeTitle)`
  margin-top: 8vh;
  margin-bottom: 40px;
`

const TextArea=styled.div`
    width: 100%;
  //background-color: darkgoldenrod;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  font-size: 12px;
  line-height: 20px;
  height: 20vh;
  
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
  transform: translateY(25%);
  transition: 0.5s;
  &:hover{
    transform: translateY(-25%);
  }
  margin-right: 20px;
`

function FitText(lLTRef,lSTRef,lTRef,rT_1Ref,rT_2Ref){
    lLTRef.current.innerHTML=Data.HomepageData[4].content.leftLargeTitle
    lSTRef.current.innerHTML=Data.HomepageData[4].content.leftSmallTitle
    lTRef.current.innerHTML=Data.HomepageData[4].content.leftText

    let linesAccommodated=parseInt(rT_1Ref.current.offsetHeight/20+1)
    let textSliced=SplitParagraph(Data.HomepageData[4].content.rightText,linesAccommodated,24)

    rT_1Ref.current.innerHTML=textSliced[0]
    rT_2Ref.current.innerHTML=textSliced[1]
}

const Passage2=memo((props)=>{

    let {blur}=props
    const lLTRef=useRef(null)
    const lSTRef=useRef(null)
    const lTRef=useRef(null)
    const rT_1Ref=useRef(null)
    const rT_2Ref=useRef(null)

    useEffect(()=>{
       FitText(lLTRef,lSTRef,lTRef,rT_1Ref,rT_2Ref)
    },[])

    document.addEventListener('resize',()=>{
        //console.log("检测到屏幕变化")
        FitText(lLTRef,lSTRef,lTRef,rT_1Ref,rT_2Ref)
    })

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
                        <br/>
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
                <TextArea>
                    <OnePassage ref={rT_1Ref}>
                        Loading
                    </OnePassage>
                    <OnePassage ref={rT_2Ref}>
                        Loading
                    </OnePassage>
                </TextArea>
            </RightPassage>
        </Frame>
    )
})

export default Passage2;