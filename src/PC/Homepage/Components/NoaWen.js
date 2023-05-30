import styled,{keyframes} from "styled-components";
import * as Images from "../../../GlobalComponents/image"
import React,{memo, useEffect} from 'react'
import Letter from "./Letter";
import qe from "styled-components";

const LargeFrame=styled.div`
    width: 100%;
  height: 100%;
  //background-color: brown;
 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const HalfFrame=styled.div`
  display: flex;
  //background-color: coral;
`

const NoaWen =memo((props)=>{
        return (
                <LargeFrame>
                    <HalfFrame>

                        <Letter
                            startXY={{x:-200,y:-100}}
                            rotate={90}
                            ifAnimation={props.ifAnimation}
                            endXY={{x:20,y:10}}
                            endScale={1.1}
                            content={"N"}
                        >
                            {Images.N}
                        </Letter>

                        <Letter endXY={{x:0,y:40}}
                                startXY={{x:100,y:-200}}
                                rotate={29}
                                ifAnimation={props.ifAnimation}
                                endScale={1.2}
                                content={"O"}
                        >
                            {Images.O}
                        </Letter>
                        <Letter endXY={{x:-5,y:15}}
                                startXY={{x:300,y:-200}}
                                rotate={-90}
                                ifAnimation={props.ifAnimation}
                                endScale={1.1}
                                content={"A"}
                        >
                            {Images.A}
                        </Letter>


                    </HalfFrame>
                    <HalfFrame>

                        <Letter endXY={{x:20,y:15}}
                                startXY={{x:-300,y:200}}
                                rotate={90}
                                ifAnimation={props.ifAnimation}
                                endScale={1.2}
                                content={"W"}
                        >
                            {Images.W}
                        </Letter>
                        <Letter endXY={{x:20,y:30}}
                                startXY={{x:200,y:0}}
                                rotate={29}
                                ifAnimation={props.ifAnimation}
                                endScale={1}
                                content={"E"}
                        >
                            {Images.E}
                        </Letter>
                        <Letter endXY={{x:5,y:40}}
                                startXY={{x:310,y:200}}
                                rotate={-90}
                                ifAnimation={props.ifAnimation}
                                endScale={0.9}
                                content={"N2"}
                        >
                            {Images.N2}
                        </Letter>


                    </HalfFrame>
                </LargeFrame>
        );
})

export default NoaWen