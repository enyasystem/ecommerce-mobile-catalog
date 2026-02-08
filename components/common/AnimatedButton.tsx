import React from 'react';
import { Animated, TouchableOpacity, TouchableOpacityProps, GestureResponderEvent } from 'react-native';
import { createPressAnimation } from '../../utils/animations';

interface AnimatedButtonProps extends TouchableOpacityProps {
	children: React.ReactNode;
	activeScale?: number;
	duration?: number;
}

export default function AnimatedButton({
	children,
	activeScale = 0.95,
	duration = 150,
	...props
}: AnimatedButtonProps) {
	const pressAnimation = React.useRef(
		createPressAnimation(activeScale, duration)
	).current;

	return (
		<Animated.View style={pressAnimation.animatedStyle}>
			<TouchableOpacity
				{...props}
				onPressIn={(event: GestureResponderEvent) => {
					pressAnimation.onPressIn();
					props.onPressIn?.(event);
				}}
				onPressOut={(event: GestureResponderEvent) => {
					pressAnimation.onPressOut();
					props.onPressOut?.(event);
				}}
			>
				{children}
			</TouchableOpacity>
		</Animated.View>
	);
}
