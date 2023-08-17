import React from 'react';
import { calOffset } from '../pages/passage2/components/Parallax';

export const PlayGroundContext = React.createContext();
const RenderPlayGround = (props) => {
  const { children, percent, pageLength, percentCorrection } = props;
  const offset = calOffset(percent, percentCorrection, pageLength);
  return (
    <PlayGroundContext.Provider value={offset}>
      {children}
    </PlayGroundContext.Provider>
  );
};

export default RenderPlayGround;
