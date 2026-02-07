import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input(props: any) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({ input: { padding: 12, borderRadius: 8, backgroundColor: '#111', color: '#fff' } });
