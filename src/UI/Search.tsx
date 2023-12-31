import React from 'react';
import { G, Mask, Path } from 'react-native-svg';

import MySvg from './MySvg';

interface Props {
  color?: string;
}

const SearchSVG = ({ color = '#3D465C' }: Props) => {
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
          d="M9.5 16c-1.817 0-3.354-.63-4.612-1.887C3.629 12.854 3 11.317 3 9.5c0-1.817.63-3.354 1.888-4.612C6.146 3.629 7.683 3 9.5 3c1.817 0 3.354.63 4.613 1.888C15.37 6.146 16 7.683 16 9.5a6.096 6.096 0 01-1.3 3.8l5.6 5.6a.948.948 0 01.275.7.948.948 0 01-.275.7.948.948 0 01-.7.275.948.948 0 01-.7-.275l-5.6-5.6A6.096 6.096 0 019.5 16zm0-2c1.25 0 2.313-.438 3.188-1.313C13.562 11.813 14 10.75 14 9.5c0-1.25-.438-2.313-1.313-3.188C11.813 5.438 10.75 5 9.5 5c-1.25 0-2.313.438-3.188 1.313S5 8.25 5 9.5c0 1.25.438 2.313 1.313 3.188C7.188 13.562 8.25 14 9.5 14z"
          fill={color}
        />
      </G>
    </MySvg>
  );
};

export default SearchSVG;
