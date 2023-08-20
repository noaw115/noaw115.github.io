import React, {memo, lazy, Suspense, useMemo, useEffect, useState, useRef} from 'react';
import styled, { keyframes } from 'styled-components';
import TopBar from '../components/TopBar';
import TitleAndText from './components/TitleAndText';
import Photo from './components/Photo';
import BasicData from '../../GlobalComponents/Data/movingPara';
import FirstBackground from './components/FirstBackground';
import Video from "../../global-components/Video";
import PhotoList from "./pages/PhotoList";
import FirstPage from "./pages/FirstPage";
import {limitNumber} from "../../global-components/utils";

const LargeFrame = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
`;
const FixedFrame = memo(styled.div`
  //background-color: aquamarine;
  width: 100vw;
  z-index: 10;
  position: absolute;
  display: flex;
  pointer-events: none;
`);


const NewMain = (props) => {
  const {data, params:{page},coverData,pushElement} = props;
  
  const calStartToPage = (num) =>{
    // 找到第num页的起点长度，从0计
    let res= 0
    data.forEach((item,index)=>{
      if (num===undefined || index<=num){
        res +=  item.width ? Number(item.width) : Number(800)
      }
    })
    return res
  }
  const totalWidth = useMemo(()=>calStartToPage(),[]);
  
  const snapArray = useMemo(()=>{
    // 计算吸附列表 是一个[0,width1,width1+width2,...]这样的列表（实际长度）
    let array = []
    data.forEach((item,index)=>{
      array.push(calStartToPage((index)))
    })
    // console.log('snapArray', array);
    return array
  },[])
  
  const isBlur = useRef()
  const currentPage = useRef()
  const deltaDirection = useRef();
  const snapLock = useRef();
  const snapPage = useRef();
  const [blurControl,setBlurControl]= useState([])
  const [deltaX, setDeltaX] = useState(0)
  const [backgroundScale, setBackgroundScale]=useState(0)
  
  useEffect(()=>{
    // 初始化逻辑
    isBlur.current = 1000
    currentPage.current = 0
    snapLock.current = false;
    snapPage.current = 0;
    const _blurControl=[]
    data.forEach(() => {
      _blurControl.push(true);
    });
    // console.log("SA时的_blurControl",_blurControl)
    setBlurControl(_blurControl)
  
    window.addEventListener('mousewheel',handleScroll);
    return()=>{
      window.removeEventListener('mousewheel',handleScroll);
    }
  },[])
  
  useEffect(()=>{
    //处理backgroundScale
    if (
      deltaX + deltaDirection.current >= 0 &&
      (deltaX + deltaDirection.current) / document.body.clientWidth < 0.8
    ) {
      setBackgroundScale((deltaX + deltaDirection.current ) / document.body.clientWidth)
    } else if (deltaDirection.current < 0 && deltaX + deltaDirection.current < 0) {
      setBackgroundScale(0)
    }
  },[deltaX])
  
  useEffect(()=>{
    // 处理模糊
    isBlur.current = document.getElementById(`detail${currentPage.current}`).getBoundingClientRect().right - window.innerWidth *2;
    if (blurControl.length>0 && isBlur.current < 0) {
      const _blurControl = blurControl
      _blurControl[currentPage.current] = false;
      setBlurControl(_blurControl)
      if (currentPage.current < data.length - 1) {
        currentPage.current+=1;
      }
    }
  },[deltaX])
  
  
  // useEffect(()=>{
  //   //处理吸附
  //   if (!snapLock.current && deltaDirection.current > 0) {
  //     console.log('现在的delta是', deltaX, '距离第', snapPage.current + 1, '页即', snapArray[snapPage.current + 1], '的距离是', snapArray[snapPage.current + 1] - deltaX);
  //
  //     if (Math.abs(snapArray[snapPage.current + 1] - deltaX) < 150) {
  //
  //       snapLock.current = true;
  //       snapPage.current = limitNumber(
  //         snapPage.current + 1,
  //         data.length - 1,
  //         0,
  //       );
  //       setDeltaX(snapArray[snapPage.current]);
  //     }
  //   }
  // },[deltaX])
  
  // console.log("blurControl",blurControl)
  // console.log('totalWidth',totalWidth);
  
  
  const handleScroll = (e) => {
    let currentDelta = e.deltaY * BasicData.moveSpeedFactor;
    deltaDirection.current = currentDelta;
    setDeltaX((deltaX) => {
      const noLimitedDeltaX = deltaX + e.deltaY * BasicData.moveSpeedFactor;
      return limitNumber(noLimitedDeltaX, totalWidth, 0);
    });
  };
  
  
  
  return(
    <LargeFrame >
      <FixedFrame>
        <TopBar currentPage={'detail'} pushElement={pushElement} />
      </FixedFrame>
      <FirstPage
        backgroundScale = {backgroundScale}
        page={page}
        coverData={coverData}
        {...props}
      />

      <PhotoList
        offset={deltaX}
        data={data}
        blurControl={blurControl}
      />
    </LargeFrame>
  )
}

export default NewMain;
