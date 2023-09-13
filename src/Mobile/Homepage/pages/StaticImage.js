import * as Image from '../../../global-components/Images';
import WithFlowers from '../../../global-components/WithFlowers';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ShowImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.source});
  background-size: cover;
`;

const StaticImage = () => {
  const flowerRef = useRef();
  const [size, setSize] = useState();
  // console.log('size', size);
  const handleScroll = () => {
    // console.log("监听")
    if (flowerRef && flowerRef.current) {
      const { y } = flowerRef.current.getBoundingClientRect();
      if (y < 0) {
        // console.log("y",0.6+(-1)*y/window.innerHeight)
        setSize((size) => 0.6 + (-1 * y * 0.2) / window.innerHeight);
      } else {
        setSize(0.6);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('touchmove', handleScroll);
    return () => {
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);
  return (
    <WithFlowers scale={size}>
      <ShowImage ref={flowerRef} source={Image.GreenBack} />
    </WithFlowers>
  );
};

export default StaticImage;
