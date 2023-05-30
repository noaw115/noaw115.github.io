import React, {memo} from "react";
import styled from "styled-components";
import * as Image from "../../../GlobalComponents/image";
const ParallaxImg=styled.img`
  width: 180%;
`

const ParallaxImage=memo((props)=>{
    return(
        <ParallaxImg src={Image.TestImage} />
    )
})
export default ParallaxImage