import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>User Profile</Text>
			<Text style={styles.text}>Comming Soon</Text>
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
