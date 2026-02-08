import { Animated, Easing } from 'react-native';

/**
 * Pulse animation - gentle scaling loop
 * Perfect for attention-grabbing elements (sale badges, notifications)
 */
export const createPulseAnimation = (
  minScale: number = 1,
  maxScale: number = 1.05,
  duration: number = 800
) => {
  const pulseValue = new Animated.Value(minScale);

  const pulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: maxScale,
          duration,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: minScale,
          duration,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stop = () => {
    pulseValue.flattenOffset();
  };

  return {
    pulse,
    stop,
    animatedStyle: {
      transform: [{ scale: pulseValue }],
    },
  };
};

/**
 * Shimmer animation - for skeleton loaders
 * Creates a shimmering effect moving horizontally across an element
 */
export const createShimmerAnimation = (
  duration: number = 1500,
  startColor: string = '#1a1a2e',
  midColor: string = '#2d2d4e',
  endColor: string = '#1a1a2e'
) => {
  const shimmerValue = new Animated.Value(0);

  const startShimmering = () => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration,
        easing: Easing.ease,
        useNativeDriver: false,
      })
    ).start();
  };

  const stop = () => {
    shimmerValue.resetAnimation();
  };

  const backgroundColor = shimmerValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [startColor, midColor, endColor],
  });

  return {
    startShimmering,
    stop,
    animatedStyle: {
      backgroundColor,
    },
  };
};

/**
 * Floating animation - gentle vertical movement
 * Creates a peaceful, premium floating effect
 */
export const createFloatingAnimation = (
  distance: number = 8,
  duration: number = 3000
) => {
  const floatValue = new Animated.Value(0);

  const startFloating = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatValue, {
          toValue: 1,
          duration,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(floatValue, {
          toValue: 0,
          duration,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stop = () => {
    floatValue.resetAnimation();
  };

  const translateY = floatValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -distance],
  });

  return {
    startFloating,
    stop,
    animatedStyle: {
      transform: [{ translateY }],
    },
  };
};

/**
 * Parallax animation - for scroll-linked movement
 * Moves at different rates based on scroll position
 */
export const createParallaxAnimation = (scrollOffset: Animated.Value, parallaxFactor: number = 0.3) => {
  const translateY = Animated.multiply(scrollOffset, parallaxFactor);

  return {
    animatedStyle: {
      transform: [{ translateY }],
    },
  };
};

/**
 * Stagger animation - sequentially animates multiple values
 */
export const createStaggerAnimation = (
  itemCount: number,
  duration: number = 400,
  staggerDelay: number = 80
) => {
  const animatedValues = Array(itemCount)
    .fill(0)
    .map(() => new Animated.Value(0));

  const start = () => {
    const animations = animatedValues.map((anim) =>
      Animated.timing(anim, {
        toValue: 1,
        duration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    );

    Animated.stagger(staggerDelay, animations).start();
  };

  const reset = () => {
    animatedValues.forEach((anim) => anim.setValue(0));
  };

  return {
    animatedValues,
    start,
    reset,
    createStyle: (index: number, baseStyle?: any) => ({
      ...baseStyle,
      opacity: animatedValues[index],
      transform: [
        {
          scale: animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
      ],
    }),
  };
};

/**
 * Rotating animation - continuous 360° rotation
 * Perfect for brand icons, loading spinners
 */
export const createRotationAnimation = (duration: number = 8000) => {
  const rotateValue = new Animated.Value(0);

  const startRotating = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const stop = () => {
    rotateValue.resetAnimation();
  };

  return {
    startRotating,
    stop,
    animatedStyle: {
      transform: [
        {
          rotate: rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    },
  };
};

/**
 * Glow/Shadow animation - for emphasis and urgency
 * Increases shadow/glow intensity in a loop
 */
export const createGlowAnimation = (
  minOpacity: number = 0.3,
  maxOpacity: number = 0.8,
  duration: number = 1000
) => {
  const glowValue = new Animated.Value(minOpacity);

  const startGlowing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowValue, {
          toValue: maxOpacity,
          duration,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(glowValue, {
          toValue: minOpacity,
          duration,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const stop = () => {
    glowValue.resetAnimation();
  };

  return {
    startGlowing,
    stop,
    animatedStyle: {
      shadowOpacity: glowValue,
      elevation: glowValue.interpolate({
        inputRange: [minOpacity, maxOpacity],
        outputRange: [2, 8],
      }),
    },
  };
};

/**
 * Slide in from side animation
 */
export const createSlideFromSideAnimation = (
  direction: 'left' | 'right' = 'left',
  distance: number = 50,
  duration: number = 400
) => {
  const slideValue = new Animated.Value(direction === 'left' ? -distance : distance);

  const slideIn = () => {
    Animated.timing(slideValue, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const slideOut = (callback?: () => void) => {
    Animated.timing(slideValue, {
      toValue: direction === 'left' ? -distance : distance,
      duration,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(callback);
  };

  return {
    slideIn,
    slideOut,
    animatedStyle: {
      transform: [{ translateX: slideValue }],
    },
  };
};

/**
 * Flip card animation - 3D card flip effect
 */
export const createFlipAnimation = (duration: number = 500) => {
  const flipValue = new Animated.Value(0);

  const flip = () => {
    Animated.timing(flipValue, {
      toValue: 1,
      duration,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const flipBack = () => {
    Animated.timing(flipValue, {
      toValue: 0,
      duration,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const perspective = 1000;
  const frontRotation = flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotation = flipValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return {
    flip,
    flipBack,
    frontAnimatedStyle: {
      transform: [{ perspective }, { rotateY: frontRotation }],
    },
    backAnimatedStyle: {
      transform: [{ perspective }, { rotateY: backRotation }],
    },
  };
};

/**
 * Shake animation - for errors, notifications
 */
export const createShakeAnimation = (
  intensity: number = 10,
  duration: number = 400,
  iterations: number = 3
) => {
  const shakeValue = new Animated.Value(0);

  const shake = () => {
    const shakes = [];
    for (let i = 0; i < iterations; i++) {
      shakes.push(
        Animated.timing(shakeValue, {
          toValue: intensity,
          duration: duration / (iterations * 2),
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: -intensity,
          duration: duration / (iterations * 2),
          easing: Easing.ease,
          useNativeDriver: true,
        })
      );
    }
    shakes.push(
      Animated.timing(shakeValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      })
    );

    Animated.sequence(shakes).start();
  };

  return {
    shake,
    animatedStyle: {
      transform: [{ translateX: shakeValue }],
    },
  };
};

/**
 * Marquee animation - scrolling text effect
 * Creates a continuous horizontal scrolling animation like a news ticker
 */
export const createMarqueeAnimation = (duration: number = 3000) => {
  const marqueeValue = new Animated.Value(0);

  const startMarquee = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(marqueeValue, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(marqueeValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stop = () => {
    marqueeValue.resetAnimation();
  };

  const translateX = marqueeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, -100],
  });

  return {
    startMarquee,
    stop,
    animatedStyle: {
      transform: [{ translateX }],
    },
  };
};
