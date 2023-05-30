import React,{memo} from "react";
import styled,{keyframes} from "styled-components";
import * as Data from '../../../GlobalComponents/Data/static'

const Frame=styled.div`
  //background-color: #61dafb;
  position: relative;
  margin-top: 200px;
  margin-left: 120px;
  width: 58vw;
  flex-shrink: 0;
  filter: blur(${props=>props.blur?'20':'0'}px);
`

const Title=styled.div`
    font-weight: bold;
  font-size: 14px;
`

const ItemsTitle=styled.div`
    font-size: 42px;
  text-transform:uppercase;
  margin-bottom: 5px;
`

const Items=memo(()=>{
    return(
        <>
            <Frame>
                <Title>
                    {Data.HomepageData[0].content[0].title}
                </Title>
                {Data.HomepageData[0].content[0].items.map((item,key)=>{
                    return(
                        <ItemsTitle>
                            {item.name}
                        </ItemsTitle>
                    )
                })}
                <ItemsTitle style={{textDecoration:'underline'}}>
                    MORE
                </ItemsTitle>
            </Frame>
            <Frame>
                <Title>
                    {Data.HomepageData[0].content[1].title}
                </Title>
                {Data.HomepageData[0].content[1].items.map((item,key)=>{
                    return(
                        <ItemsTitle id={`Items${item.index}`} onMouseOver={()=>{
                        }
                        }>
                            {item.name}
                        </ItemsTitle>
                    )
                })}
                <ItemsTitle style={{textDecoration:'underline'}}>
                    MORE
                </ItemsTitle>
            </Frame>
        </>

    )
})

export default Items;