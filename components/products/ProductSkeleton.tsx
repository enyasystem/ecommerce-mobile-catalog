import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

export default function ProductSkeleton() {
	const shimmerAnim = new Animated.Value(0);

	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(shimmerAnim, {
					toValue: 1,
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: false,
				}),
				Animated.timing(shimmerAnim, {
					toValue: 0,
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: false,
				}),
			])
		).start();
	}, []);

	const shimmerOpacity = shimmerAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0.3, 0.7],
	});

	return (
		<View style={styles.card}>
			{/* Image Skeleton */}
			<Animated.View
				style={[
					styles.imageSkeleton,
					{ opacity: shimmerOpacity },
				]}
			/>

			{/* Title Skeleton */}
			<Animated.View
				style={[
					styles.titleSkeleton,
					{ opacity: shimmerOpacity },
				]}
			/>

			{/* Subtitle Skeleton */}
			<Animated.View
				style={[
					styles.subtitleSkeleton,
					{ opacity: shimmerOpacity },
				]}
			/>

			{/* Footer Skeleton */}
			<View style={styles.footerSkeleton}>
				<Animated.View
					style={[
						styles.priceSkeleton,
						{ opacity: shimmerOpacity },
					]}
				/>
				<Animated.View
					style={[
						styles.buttonSkeleton,
						{ opacity: shimmerOpacity },
					]}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: '100%',
		borderRadius: 12,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		padding: 12,
		marginBottom: 16,
		overflow: 'hidden',
	},
	imageSkeleton: {
		width: '100%',
		height: 120,
		borderRadius: 12,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		marginBottom: 12,
	},
	titleSkeleton: {
		width: '80%',
		height: 16,
		borderRadius: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		marginBottom: 8,
	},
	subtitleSkeleton: {
		width: '60%',
		height: 12,
		borderRadius: 6,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		marginBottom: 12,
	},
	footerSkeleton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	priceSkeleton: {
		width: '40%',
		height: 16,
		borderRadius: 8,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
	buttonSkeleton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
	},
});
