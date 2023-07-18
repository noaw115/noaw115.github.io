import React, {memo, useEffect, useRef} from "react";
import styled,{keyframes} from "styled-components";
import * as Image from "../../../GlobalComponents/image";
const ParallaxImg=styled.img`
  width: 100%;
    transform: translateY(-170px) translateX(20px) ;
`

const ParallaxImage=memo((props)=>{
    const imgRef = useRef(null)
  
  const debounce = (func) => {
    let f;
    return function () {
      const context = this;
      const args = arguments;
      cancelAnimationFrame(f);
      f = requestAnimationFrame(function () {
        func.apply(context, args);
      });
    };
  };
    
    const calBlur = (e) => {
      const dist = imgRef.current.getBoundingClientRect()
      // console.log(dist)
      const horizontal = (e.clientX - dist.left-dist.width/2).toFixed(2)
      const vertical = (e.clientY - dist.top-dist.height/2).toFixed(2)
      const distance = Math.sqrt(horizontal*horizontal+vertical*vertical)
      let calDistance = Math.log10(distance+1)-1
      if(calDistance<1){
        calDistance = 1
      }else {
        calDistance=calDistance.toFixed(2)
      }
      imgRef.current.style.filter = `blur(${2*calDistance-2}px)`
      // imgRef.current.style.transform = `scale(${calDistance/2})`
      console.log("a",calDistance)
    }
  useEffect(()=>{
    window.addEventListener('mousemove',debounce((e)=>{
      calBlur(e)
    }))
  },[])
    return(
        <ParallaxImg src={Image.GreenBack} ref={imgRef}/>
    )
})
export default ParallaxImage
