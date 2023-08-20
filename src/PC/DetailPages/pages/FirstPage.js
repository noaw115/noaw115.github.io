import FirstBackground from "../components/FirstBackground";
import React, {useEffect, useMemo, useState, memo, useRef} from "react";
import styled from "styled-components";
import {useNavigate, useParams} from 'react-router-dom';


const TitlePart = styled.div`
  font-size: 30px;
  color: black;
  //background: aqua;
  height: 90%;
  //position: absolute;
  font-family: Floane;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  pointer-events: auto;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
`
const Back = styled.div`
  width: ${(props) => props.width}vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  justify-content: center;
  transition: 0.4s all ease-out;
  align-items: center;
`
const FirstPage = (props) =>{
  const {backgroundScale,page,coverData,pushElement} = props;
  // console.log("coverData",coverData)
  const navigate = useNavigate();
  const param = useParams()
  const handleLinkTo = (text) => {
    // console.log("跳")
    navigate(`/${text}`)
  }
  const [showText,setShowText] = useState()
  const nextRef= useRef()
  const lastRef =useRef()
  useEffect(()=>{
    const allText = {
      current: {},
      next:{},
      last:{},
    }
    allText.current.text = page
    allText.current.chineseText = getTitleChineseText(page)
    allText.next=getNextText(page)
    allText.last=getLastText(page)
    // console.log("all",allText)
    setShowText(allText)
  },[param])


  useEffect(()=>{
    if(nextRef && lastRef){
      pushElement(nextRef)
      pushElement(lastRef)
    }
  },[nextRef,lastRef])
  const getTitleChineseText = (page) => {
    let res= ''
    coverData.forEach((item)=>{
      if (item.page === page){
        res = item.chineseText
      }
    })
    return res
  }
  
  const getNextText = (page) => {
    let res ={
      text: coverData[0].page,
      chineseText: coverData[0].chineseText,
    }
    let target = false;
    coverData.forEach((item)=>{
      
      if (target) {
        // console.log("next,item",item)
        res.text = item.page
        res.chineseText = item.chineseText
        target = false
      }
      if (item.page === page){
        // console.log("当下一样",item.page)
        target = true
      }
    })
    return res
  }
  
  const getLastText = (page) => {
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
  
  return(
    <Back
      width={100 * (1 - backgroundScale)}
      // img={require(`../../GlobalComponents/Image${this.props.cover}`)}
      // blur={this.state.backgroundScale * 20}
      // height={110 * (1.5 - backgroundScale * 0.5)}

    >
      <TitlePart onClick={()=>console.log("sds")}  >
        <Title  ref={lastRef} style={{fontSize: '16px'}} onClick={()=>handleLinkTo(showText.last.text)} >
          <div style={{fontFamily:'Xiaowei', marginBottom: '20px'}}>
            {showText && showText.last.chineseText}
          </div>
          <div>
            {showText && showText.last.text }
          </div>
        </Title>
        <Title>
          <div style={{fontFamily:'Xiaowei', marginBottom: '20px'}}>
            {showText && showText.current.chineseText}
          </div>
          <div>
            {page}
          </div>
        </Title>
        <Title style={{fontSize: '16px'}} ref={nextRef} onClick={()=>handleLinkTo(showText.next.text)}>
          <div style={{fontFamily:'Xiaowei', marginBottom: '20px'}}>
            {showText && showText.next.chineseText}
          </div>
          <div>
            {showText && showText.next.text}
          </div>
        </Title>
      </TitlePart>
    </Back>
  )
}

export default FirstPage
