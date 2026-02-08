import { Animated, Easing } from 'react-native';

/**
 * Slide in animation from bottom
 */
export const createSlideInAnimation = (duration: number = 350) => {
	const animatedValue = new Animated.Value(1);

	const slideIn = () => {
		animatedValue.setValue(1);
		Animated.timing(animatedValue, {
			toValue: 0,
			duration,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: false,
		}).start();
	};

	const slideOut = (callback?: () => void) => {
		Animated.timing(animatedValue, {
			toValue: 1,
			duration,
			easing: Easing.in(Easing.cubic),
			useNativeDriver: false,
		}).start(callback);
	};

	const translateY = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 500],
	});

	const opacity = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0],
	});

	return {
		slideIn,
		slideOut,
		animatedStyle: {
			transform: [{ translateY }],
			opacity,
		},
	};
};

/**
 * Fade in/out animation
 */
export const createFadeAnimation = (duration: number = 300) => {
	const animatedValue = new Animated.Value(0);

	const fadeIn = () => {
		Animated.timing(animatedValue, {
			toValue: 1,
			duration,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start();
	};

	const fadeOut = (callback?: () => void) => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration,
			easing: Easing.ease,
			useNativeDriver: true,
		}).start(callback);
	};

	return {
		fadeIn,
		fadeOut,
		animatedStyle: {
			opacity: animatedValue,
		},
	};
};

/**
 * Scale animation for button press
 */
export const createPressAnimation = (
	activeScale: number = 0.95,
	duration: number = 150
) => {
	const scaleValue = new Animated.Value(1);

	const onPressIn = () => {
		Animated.spring(scaleValue, {
			toValue: activeScale,
			useNativeDriver: true,
			speed: 20,
			bounciness: 5,
		}).start();
	};

	const onPressOut = () => {
		Animated.spring(scaleValue, {
			toValue: 1,
			useNativeDriver: true,
			speed: 20,
			bounciness: 5,
		}).start();
	};

	return {
		onPressIn,
		onPressOut,
		animatedStyle: {
			transform: [{ scale: scaleValue }],
		},
	};
};

/**
 * Bounce animation
 */
export const createBounceAnimation = () => {
	const bounceValue = new Animated.Value(0);

	const bounce = () => {
		bounceValue.setValue(0);
		Animated.sequence([
			Animated.timing(bounceValue, {
				toValue: -8,
				duration: 150,
				easing: Easing.ease,
				useNativeDriver: true,
			}),
			Animated.timing(bounceValue, {
				toValue: 0,
				duration: 150,
				easing: Easing.bounce,
				useNativeDriver: true,
			}),
		]).start();
	};

	return {
		bounce,
		animatedStyle: {
			transform: [{ translateY: bounceValue }],
		},
	};
};
