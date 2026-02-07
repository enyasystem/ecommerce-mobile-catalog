import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Shopping Cart</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#050505',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
	},
});
