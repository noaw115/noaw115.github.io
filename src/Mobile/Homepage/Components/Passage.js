import React,{useState,useEffect,useRef} from "react";
import styled,{keyframes} from "styled-components";
import * as Data from '../../../GlobalComponents/Data/static'
import BasicData from "../../../GlobalComponents/Data/movingPara";

const Frame=styled.div`
  //background-color: #61dafb;
  position: relative;
  padding-top: 10vh;
  padding-left: 10vw;
  padding-right: 10vw;
  padding-bottom: 10vh;
  width: 100vw;
  box-sizing: border-box;
  flex-shrink: 0;
  filter: blur(${props=>props.blur?'40':'0'}px);
  transition:${BasicData.mobileBlurTime} all ease-out;
`
const Title=styled.div`
  font-size: 30px;
  color: white;
  font-family: Floane;
  //background-color: aqua;
`

const PassageFrame=styled.div`
  //background-color: #61dafb;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  color: white;
  //background-color: aquamarine;
`

const LeftPassage=styled.div`
  //background-color: red;
  width: 100%;
  flex-shrink: 0;
  margin-right: 132px;
  font-size: 17px;
  line-height: 28px;
  margin-bottom: 60px;
`

const RightPassage=styled.div`
  //background-color: blue;
  flex-grow: 1;
  display: flex;
  justify-content:space-between;
  font-size: 14px;
  line-height: 26px;
`


function MobilePassage(props){
    let {blur}=props
    const titleRef=useRef(null)
    const text1Ref=useRef(null)
    const text2Ref=useRef(null)

    useEffect(()=>{
        titleRef.current.innerHTML=Data.HomepageData[2].content.title
        text1Ref.current.innerHTML=Data.HomepageData[2].content.text1
        text2Ref.current.innerHTML=Data.HomepageData[2].content.text2
    },[])


    return(
        <Frame blur={blur}>
            <Title ref={titleRef}>
                Loading...
            </Title>
            <PassageFrame>
                <LeftPassage ref={text1Ref}>
                    Loading...
                </LeftPassage>
                <RightPassage ref={text2Ref}>
                    Loading...
                </RightPassage>
            </PassageFrame>
        </Frame>
    )
}

export default MobilePassage;