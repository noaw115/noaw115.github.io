import styled from 'styled-components';
import * as Image from '../../global-components/Images';
import { LogoWhite } from '../../global-components/Images';
import * as Data from '../../apiData/static';
import { useNavigate, Link } from 'react-router-dom';
import * as SVG from '../../global-components/Svgs';
import { memo, useEffect, useRef } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import StyledComponents from '../../global-components/StyledComponents';
import { observer } from 'mobx-react';

const { MontserratFont } = StyledComponents;

const LogoPlace = styled.div`
  //background-color: darkgoldenrod;
  //width: 180px;
  //height: 80px;
  margin-top: 30px;
  margin-left: 50px;
  width: 95vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
`;

const RightPart = styled.div`
  font-family: Floane;
  text-align: right;
  font-size: 20px;
  //background-color: greenyellow;
  pointer-events: auto;
`;
const CloseIconPlace = styled.div`
  width: 40px;
  height: 40px;
  //position: absolute;
  //right: 20px;
  //top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.8);
  //background-color: aqua;
`;

const Navigate = styled.div`
  //background-color: red;
  width: 200px;
  padding-right: 80px;
  transition: 0.3s all;
  transform: translateX(70px);
  &:hover {
    transform: translateX(50px);
  }
`;

const LogoImage2 = styled.div`
  width: 130px;
  height: 50px;
  background-image: url(${(props) => Image.LogoBlack});
  background-size: contain;
  background-repeat: no-repeat;
  transition: 0.5s all;
  cursor: pointer; // 显示为指针，表示可点击
`;


const Title = styled(MontserratFont)`
  margin-top: 20px;
  font-size: 16px;
  transition: 0.5s all;
  color: black;
`;
const TopBar = observer((props) => {
  let { currentPage, pushElement, store } = props;
  if (currentPage === -1) {
    currentPage = 0;
  }

  const clickRef = useRef();
  const readyToJump = (descrip) => {
    // console.log('点击', descrip);
    store.jumpTo = descrip;
  };

  useEffect(() => {
    if (clickRef) {
      pushElement(clickRef,'no-text');
    }
  }, [clickRef]);
  if (currentPage === 'detail') {
    return (
      <LogoPlace>
        <div>
          <Link to={`${window.__route__}/`} onClick={() => window.location.reload()}>
            <LogoImage2 img={'#000000'} />
          </Link>
          <Title color={'#000000'}>Designer/ Illustrator/ Art Director</Title>
        </div>
        <div style={{ pointerEvents: 'auto' }}>
          <Link to={`${window.__route__}/`}>
            <CloseIconPlace>{SVG.close_icon_black}</CloseIconPlace>
          </Link>
        </div>
      </LogoPlace>
    );
  } else {
    return (
      <LogoPlace>
        <div>
          <LogoImage2 img={'#000000'} />
          <Title color={'#000000'}>Designer/ Illustrator/ Art Director</Title>
        </div>
        <RightPart ref={clickRef}>
          <Navigate
            onClick={() => {
              readyToJump('视差滚动NOA');
            }}
            style={{
              color: store.nowPage === '视差滚动NOA' ? '#B6E5E3' : 'black',
            }}
          >
            PLAYGROUND
          </Navigate>
          <Navigate
            onClick={() => {
              readyToJump('联系信息');
            }}
            style={{
              color: store.nowPage === '联系信息' ? '#B6E5E3' : 'black',
            }}
          >
            CONTACT
          </Navigate>
        </RightPart>
      </LogoPlace>
    );
  }
});

export default TopBar;
