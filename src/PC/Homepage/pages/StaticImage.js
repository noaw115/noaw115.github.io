import React, {memo, useEffect, useRef, useState} from 'react';
import styled, { keyframes } from 'styled-components';
import * as Image from '../../../global-components/Images';

const ParallaxImg = styled.img`
  width: 100%;
  transform: translateY(0px) translateX(-80px);
`;



const StaticImage = memo((props) => {
  const imgRef = useRef(null);

  const debounce = () => {
    let f;
    return function (e) {
      cancelAnimationFrame(f);
      f = requestAnimationFrame((e) => {
        calBlur(e);
      });
    };
  };
  const runDebounce = debounce();
  const calBlur = (e) => {
    if (imgRef.current) {
      const dist = imgRef.current.getBoundingClientRect();
      // console.log(dist)
      const horizontal = (e.clientX - dist.left - dist.width / 2).toFixed(2);
      const vertical = (e.clientY - dist.top - dist.height / 2).toFixed(2);
      const distance = Math.sqrt(horizontal * horizontal + vertical * vertical);
      let calDistance = Math.log10(distance + 1) - 1;
      if (calDistance < 1) {
        calDistance = 1;
      } else {
        calDistance = calDistance.toFixed(2);
      }
      imgRef.current.style.filter = `blur(${2 * calDistance - 2}px)`;
    }
  };
  useEffect(() => {
    window.addEventListener('mousemove', runDebounce);
    return () => {
      window.removeEventListener('mousemove', runDebounce);
    };
  }, []);



  return (
      <ParallaxImg src={Image.GreenBack} ref={imgRef} />
  );
});
export default StaticImage;
