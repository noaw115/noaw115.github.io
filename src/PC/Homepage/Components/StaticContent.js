import {memo, useState} from "react";
import styled from "styled-components";
import * as Image from "../../../GlobalComponents/image";

const Frame = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  //background-color: white;
  z-index: 1;
  overflow: hidden;
 
`

const Shake = styled.div`
  transition: 0.7s all ease-out;
  transform: ${props => props.flag? 'translateY(-10px) rotate(1.1deg) scale(1.01)': 'none'};
  
`
const RedDoorDiv=styled(Shake)`
  width: 252px;
  height: 557px;
  position: absolute;
  background-image: url(${Image.RedDoor});
  background-repeat: no-repeat;
  background-position: center;
  left: 30%;
  top: 50%;
`

const LeftDiv=styled(Shake)`
  width: 540px;
  height: 80%;
  position: absolute;
  //background-color: red;
   background-image: url(${Image.LeftFlower});
  background-size: contain;
  background-repeat: no-repeat;
  top: 30%;
  left: -30px;
  //z-index: 1000;

`
const RightBottomDiv=styled(Shake)`
  width: 540px;
  height: 600px;
  position: absolute;
  //background-color: red;
   background-image: url(${Image.RightBottomFlower});
  background-size: contain;
  background-repeat: no-repeat;
  bottom: -50px;
  right: 20px;
  //z-index: 1000;

`
const RightTopDiv=styled(Shake)`
  width: 340px;
  height: 700px;
  position: absolute;
  //background-color: red;
   background-image: url(${Image.RightTopFlower});
  background-size: contain;
  background-repeat: no-repeat;
  top: 0;
  right: 150px;
  //z-index: 1000;

`
const TopDiv=styled(Shake)`
  width: 60%;
  position: absolute;
  height: 300px;
  //background-color: red;
  background-image: url(${Image.TopFlower});
  background-size: contain;
  background-repeat: no-repeat;
  top: -20px;
  left: -30px;
  //z-index: 1000;
`


const StaticContent = memo(() => {
  
  const [rightTopFlag,setRTFlag]=useState(false)
  const [rightBottomFlag,setRBFlag]=useState(false)
  const [topFlag,setTFlag]=useState(false)
  const [leftFlag,setLFlag] = useState(false)
  return(
    <Frame>
      <RightTopDiv onMouseEnter={()=>setRTFlag(!rightTopFlag)} flag={rightTopFlag}/>
      <RightBottomDiv onMouseEnter={()=>setRBFlag(!rightBottomFlag)} flag={rightBottomFlag}/>
      <TopDiv onMouseEnter={()=>setTFlag(!topFlag)} flag={topFlag}/>
      <LeftDiv onMouseEnter={()=>setLFlag(!leftFlag)} flag={leftFlag}/>
      <RedDoorDiv/>
    </Frame>
  )
})

export default StaticContent
