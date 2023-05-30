import React, {memo, lazy, Suspense} from "react";
import styled from "styled-components";
import LoadingParallaxImage from "./LoadingParallaxImage";

const ParallaxImage_lazy=lazy(()=>import("./ParallaxImage"))
const ParallaxScroll=memo(styled.div`
  height: 100%;
  width: 100%;
  background-color: aliceblue;
  transition:0.6s all ease-out;
  transform: translateX(-${props=>props.offset}px);
  filter: blur(${props=>props.blur?'20':'0'}px);
`)



const Parallax=memo((props)=>{
    return(
        <ParallaxScroll blur={props.blur} style={{overflow:"visible"}} offset={props.offset}>
            <Suspense fallback={<LoadingParallaxImage/>}>
                <ParallaxImage_lazy/>
            </Suspense>
        </ParallaxScroll>
    )
})

export default Parallax