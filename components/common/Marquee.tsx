import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleProp, ViewStyle, View } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
};

const Marquee: React.FC<Props> = ({ children, style, duration = 3000 }) => {
  const translate = useRef(new Animated.Value(0)).current;
  const [singleWidth, setSingleWidth] = useState(0);

  useEffect(() => {
    if (!singleWidth) return;

    translate.setValue(0);
    const anim = Animated.loop(
      Animated.timing(translate, {
        toValue: -singleWidth,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [singleWidth, duration, translate]);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w && singleWidth !== w) setSingleWidth(w);
  };

  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <Animated.View
        style={{ flexDirection: 'row', transform: [{ translateX: translate }] }}
      >
        <View onLayout={onLayout}>
          {children}
        </View>
        <View>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default Marquee;
