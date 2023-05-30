import React,{memo} from "react";
import styled from "styled-components";
const BackgroundFrame=styled.div`
  width: ${props => props.width}vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: brown;
  transition: 0.4s all ease-out;;

`



const LoadingFirstBackground=memo((props)=>{
    return(
        <BackgroundFrame width={props.width}>
            {props.children}
        </BackgroundFrame>
    )
})

export default LoadingFirstBackground