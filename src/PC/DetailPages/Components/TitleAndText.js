import styled from 'styled-components'
import {useEffect, useRef,memo} from "react";
import BasicData from "../../../GlobalComponents/Data/movingPara";


const Frame=styled.div`
  //background-color: #61dafb;
  filter: blur(${props=>props.blur?'40':'0'}px);
  transition:${BasicData.PCBlurTime} all ease-out;
`
const Title=styled.div`
    font-weight: bolder;
  font-size: 22px;
  margin-bottom: 40px;
`
const Text=styled.div`
    font-size: 16px;
  line-height: 26px;
  //background-color: darkgoldenrod;
  
`
const TitleAndText=memo( (props)=>{
    let {blur }=props


    const textRef=useRef(null)
    useEffect(()=>{
        textRef.current.innerHTML=props.data.text
    },[])
    return(
        <Frame blur={blur}>
            <Title>
                {props.data.title}
            </Title>
            <Text ref={textRef}>
                Loading
            </Text>
        </Frame>
    )
})

export default TitleAndText