import React from 'react';
import { G, Mask, Path } from 'react-native-svg';

import MySvg from './MySvg';

const CloseSVG = () => {
  return (
    <MySvg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M12 13.4l-4.9 4.9a.948.948 0 01-.7.275.948.948 0 01-.7-.275.948.948 0 01-.275-.7c0-.283.091-.517.275-.7l4.9-4.9-4.9-4.9a.948.948 0 01-.275-.7c0-.283.091-.517.275-.7a.948.948 0 01.7-.275c.283 0 .516.092.7.275l4.9 4.9 4.9-4.9a.948.948 0 01.7-.275c.283 0 .516.092.7.275a.948.948 0 01.275.7.948.948 0 01-.275.7L13.4 12l4.9 4.9a.949.949 0 01.275.7.948.948 0 01-.275.7.948.948 0 01-.7.275.948.948 0 01-.7-.275L12 13.4z"
          fill="#15171E"
        />
      </G>
    </MySvg>
  );
};

export default CloseSVG;
