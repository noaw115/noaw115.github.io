import styled from 'styled-components'
import {memo} from "react";
import BasicData from "../../../GlobalComponents/Data/movingPara";

const Describe=styled.div`
  font-size: 16px;
  margin-bottom: 40px;
`


const PhotoFrame=styled.div`
  width: 100%;
  background-color: coral;
  min-height: 200px;
  max-height: 65vh;
  margin-bottom: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PhotoImg=styled.img`
    width: 100%;
`

const Frame=styled.div`
  //background-color: #61dafb;
  filter: blur(${props=>props.blur?'40':'0'}px);
  transition:${BasicData.PCBlurTime} all ease-out;
`

const Photo=memo((props)=>{
    let {blur }=props
    return(
        <Frame blur={blur}>
            <PhotoFrame >
                <PhotoImg src={require(`../../../GlobalComponents/Image${props.data.photoId}`)}/>
            </PhotoFrame>
            <Describe>
                {props.data.describe}
            </Describe>
        </Frame>
    )
})

export default Photo