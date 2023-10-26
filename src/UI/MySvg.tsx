import React, { type FC, type ReactNode } from 'react';
import { type ColorValue } from 'react-native';

import { Svg } from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  viewBox?: string;
  fill?: ColorValue;
  children: ReactNode;
}

const MySvg: FC<Props> = ({ children, width, height, viewBox, fill }) => {
  return (
    <Svg width={width} height={height} viewBox={viewBox} fill={fill}>
      {children}
    </Svg>
  );
};

export default MySvg;
