declare module 'expo-blur' {
  import * as React from 'react';
  import { ViewProps } from 'react-native';

  export interface BlurViewProps extends ViewProps {
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
  }

  export const BlurView: React.ComponentType<BlurViewProps>;

  export default BlurView;
}
