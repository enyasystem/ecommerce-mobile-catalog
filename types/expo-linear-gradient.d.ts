declare module 'expo-linear-gradient' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';

  export interface LinearGradientProps extends ViewProps {
    colors: string[];
    start?: [number, number];
    end?: [number, number];
    locations?: number[];
  }

  export class LinearGradient extends React.Component<LinearGradientProps> {}

  export default LinearGradient;
}
