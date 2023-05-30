import React, {memo} from "react";
import styled from "styled-components";
const ParallaxImg=styled.div`
  background-color: aqua;
`

const LoadingParallaxImage=memo((props)=>{
    return(
        <ParallaxImg/>
    )
})
export default LoadingParallaxImage