import React,{memo,useState,useEffect,useRef} from "react";
import styled,{keyframes} from "styled-components";
import * as Data from '../../../GlobalComponents/Data/static'

const Frame=styled.div`
  //background-color: #61dafb;
  position: relative;
  margin-top: 30vh;
  margin-left: 14vw;
  width: 78vw;
  flex-shrink: 0;
  filter: blur(${props=>props.blur?'40':'0'}px);
  transition:1.2s all ease-out;
`
const Title=styled.div`
  font-size: 30px;
  color: white;
  font-family: Floane;
`

const PassageFrame=styled.div`
  //background-color: #61dafb;
  margin-top: 60px;
  height: 36vh;
  display: flex;
  flex-direction: row;
  color: white;
  
`

const LeftPassage=styled.div`
  //background-color: red;
  height: 100%;
  width: 240px;
  flex-shrink: 0;
  margin-right: 132px;
  font-size: 17px;
  line-height: 28px;
`

const RightPassage=styled.div`
  //background-color: blue;
  height: 100%;
  flex-grow: 1;
  display: flex;
  justify-content:space-between;
  font-size: 14px;
  line-height: 26px;
`
const OnePassage=styled.div`
   // background-color: cadetblue;
  width: 46%;
  height: 100%;
`

export function SplitParagraph(targetText,lines,num){
    if(num===undefined){
        num=27
    }
    let lineNum=0;
    let eachCharCount=0;
    for(let i=0;i<targetText.length;i++){
        //console.log("char测试",targetText[i])
        if(lineNum===lines){
            return([targetText.slice(0,i),targetText.slice(i,targetText.length+1)])
        }
        if(targetText===" "||targetText[i]===""){
            //console.log("遇到空字符")
            continue;
        }
        eachCharCount++;
        if(targetText[i]==='<'&&targetText[i+1]==='b'&&targetText[i+2]==='r'){
            i=i+4;
            lineNum++;
            eachCharCount=0;
            //console.log("硬换行")
            continue;
        }
        if(eachCharCount===num){//如果满27个字，行数+1，字符计数清零
            //console.log("软换行")
            lineNum++;
            eachCharCount=0;
        }

    }
    //console.log("总行数",lineNum)
}

function FitText(titleRef,text1Ref,text2_1Ref,text2_2Ref){
    titleRef.current.innerHTML=Data.HomepageData[2].content.title
    text1Ref.current.innerHTML=Data.HomepageData[2].content.text1

    let linesAccommodated=parseInt(text2_1Ref.current.offsetHeight/26+1)
    let textSliced=SplitParagraph(Data.HomepageData[2].content.text2,linesAccommodated,27)
    text2_1Ref.current.innerHTML=textSliced[0]
    text2_2Ref.current.innerHTML=textSliced[1]
    //text2_1Ref.current.innerHTML=Data.HomepageData[2].content.text2
}

const Passage=memo((props)=>{
    let {blur}=props
    const titleRef=useRef(null)
    const text1Ref=useRef(null)
    const text2_1Ref=useRef(null)
    const text2_2Ref=useRef(null)
    useEffect(()=>{
        FitText(titleRef,text1Ref,text2_1Ref,text2_2Ref)
    },[])

    //console.log("【性能警告】Passage在渲染")
    document.addEventListener('resize',()=>{
        //console.log("检测到屏幕变化")
        FitText(titleRef,text1Ref,text2_1Ref,text2_2Ref)
    })
    return(
        <Frame blur={blur}>
            <Title ref={titleRef}>
                Loading...
            </Title>
            <PassageFrame>
                <LeftPassage ref={text1Ref}>
                    Loading...
                </LeftPassage>
                <RightPassage>
                    <OnePassage ref={text2_1Ref}>
                        Loading...
                    </OnePassage>
                    <OnePassage ref={text2_2Ref}>
                        Loading...
                    </OnePassage>
                </RightPassage>
            </PassageFrame>
        </Frame>
    )
})

export default Passage;