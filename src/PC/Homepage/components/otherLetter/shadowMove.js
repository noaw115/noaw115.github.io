import * as Images from '../../../asserts/image';
import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';

const LetterShadow = styled.div`
  position: absolute;
  //background-color: coral;
  opacity: 0.7;
  filter: blur(10px);
  transform: translate(${(props) => props.left}px, ${(props) => props.top}px);
  //top: ;
`;

const LetterDiv = styled.div`
  width: 120px;
  height: 150px;
  //background-color: #0c0c0c;
  //opacity: 0.7;
  margin: 1px;
  position: relative;
  transform-origin: left top;
  animation: ${(props) => {
      if (props.ifAnimation) {
        return keyframes`
            0%{
              transform:  translate(${props.startX}%,${props.startY}%) scale(1.5) rotate(${props.rotate}deg);
            }
            100%{
              transform: translate(${props.endX}%,${props.endY}%)  scale(${props.endScale}) rotate(0);
            }
           `;
      }
    }}
    ease-in 1.5s forwards;
`;
const Image = styled.img`
  width: 100px;
`;

class Letter extends React.PureComponent {
  state = {
    shadowX: 0,
    shadowY: 0,
  };
  handleMouseMove = (e) => {
    this.setState({
      shadowX: (
        ((e.clientX - document.body.clientWidth / 2) /
          document.body.clientWidth) *
        2
      ).toFixed(2),
      shadowY: (
        ((e.clientY - document.body.clientHeight / 2) /
          document.body.clientHeight) *
        2
      ).toFixed(2),
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.ifAnimation) {
      document.addEventListener('mousemove', this.handleMouseMove);
    } else {
      document.removeEventListener('mousemove', this.handleMouseMove);
    }
  }
  render() {
    return (
      <LetterDiv
        startX={this.props.startXY.x}
        startY={this.props.startXY.y}
        endX={this.props.endXY.x}
        endY={this.props.endXY.y}
        rotate={this.props.rotate}
        ifAnimation={this.props.ifAnimation}
        endScale={this.props.endScale}
      >
        {/*{this.state.shadowX},{this.state.shadowY}*/}
        <LetterShadow
          left={-this.state.shadowX * 30}
          top={-this.state.shadowY * 30}
        >
          <Image src={this.props.children} />
        </LetterShadow>
        <Image src={this.props.children} />
      </LetterDiv>
    );
  }
}

export default Letter;
