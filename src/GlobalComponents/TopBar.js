import styled from 'styled-components';
import * as Image from './image';
import { LogoWhite } from './image';
import * as Data from './Data/static';
import { useNavigate, Link } from 'react-router-dom';
import * as SVG from './Data/svgs';
import { memo } from 'react';

const LogoPlace = styled.div`
  //background-color: darkgoldenrod;
  //width: 180px;
  height: 80px;
  margin-top: 30px;
  margin-left: 50px;
  width: 95vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Title = styled.div`
  margin-left: 70px;
  //font-family: Floane;
  font-size: 14px;
  font-weight: bolder;
  transition: 0.5s all;
  color: black;
`;
const TopBar = memo((props) => {
  let { currentPage } = props;
  if (currentPage === -1) {
    currentPage = 0;
  }
  if (currentPage === 'detail') {
    return (
      <>
        <LogoPlace>
          <Link to={'/'}>
            <LogoImage2 img={'#000000'} />
          </Link>
          <Link to={'/'}>
            <CloseIconPlace>{SVG.close_icon_black}</CloseIconPlace>
          </Link>
        </LogoPlace>
      </>
    );
  } else {
    return (
      <>
        <LogoPlace style={{ justifyContent: 'flex-start' }}>
          <LogoImage2 img={'#000000'} />
          <Title color={'#000000'}>
            \ dssd
          </Title>
        </LogoPlace>
      </>
    );
  }
});

export default TopBar;
