import React from 'react';
import { G, Mask, Path } from 'react-native-svg';

import MySvg from './MySvg';

const SaveSVG = () => {
  return (
    <MySvg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
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
          d="M9.55 15.15l8.475-8.475c.2-.2.438-.3.713-.3.275 0 .512.1.712.3.2.2.3.438.3.713 0 .274-.1.512-.3.712l-9.2 9.2c-.2.2-.433.3-.7.3a.96.96 0 01-.7-.3L4.55 13a.93.93 0 01-.287-.713 1.02 1.02 0 01.312-.712c.2-.2.438-.3.713-.3.275 0 .512.1.712.3l3.55 3.575z"
          fill="#fff"
        />
      </G>
    </MySvg>
  );
};

export default SaveSVG;
