import React, {useRef} from 'react';
import { calOffset } from '../pages/passage2/components/Parallax';

export const PlayGroundContext = React.createContext();
const RenderPlayGround = (props) => {
  const { children, percent, pageLength, percentCorrection } = props;
  const offset = calOffset(percent, percentCorrection, pageLength);
  const firstFlag = useRef(true)
  return (
    <PlayGroundContext.Provider value={{offset, firstFlag}}>
      {children}
    </PlayGroundContext.Provider>
  );
};

export default RenderPlayGround;
