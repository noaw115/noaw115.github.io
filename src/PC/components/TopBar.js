import styled from 'styled-components';
import * as Image from '../../global-components/Images';
import { LogoWhite } from '../../global-components/Images';
import * as Data from '../../GlobalComponents/Data/static';
import { useNavigate, Link } from 'react-router-dom';
import * as SVG from '../../global-components/Svgs';
import { memo, useEffect, useRef } from 'react';
import { click } from '@testing-library/user-event/dist/click';
import StyledComponents from '../../global-components/StyledComponents';

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

const LogoImage2 = styled.div`
  width: 130px;
  height: 50px;
  background-image: url(${(props) => Image.LogoBlack});
  background-size: contain;
  background-repeat: no-repeat;
  transition: 0.5s all;
`;

const Title = styled(MontserratFont)`
  margin-top: 20px;
  font-size: 16px;
  transition: 0.5s all;
  color: black;
`;
const TopBar = memo((props) => {
  let { currentPage, pushElement } = props;
  if (currentPage === -1) {
    currentPage = 0;
  }

  const clickRef = useRef();

  useEffect(() => {
    if (clickRef) {
      pushElement(clickRef);
    }
  }, [clickRef]);
  if (currentPage === 'detail') {
    return (
      <LogoPlace>
        <div>
          <Link to={'/'}>
            <LogoImage2 img={'#000000'} />
          </Link>
          <Title color={'#000000'}>Designer/ Illustrator/ Art Director</Title>
        </div>
        <div style={{ pointerEvents: 'auto' }}>
          <Link to={'/'}>
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
          <div>PLAYGROUND</div>
          <div>CONTACT</div>
        </RightPart>
      </LogoPlace>
    );
  }
});

export default TopBar;
