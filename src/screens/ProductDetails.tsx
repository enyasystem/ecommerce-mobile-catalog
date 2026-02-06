import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import type { Product } from '../data/products';

type Props = {
  product: Product;
  onBack: () => void;
};

export default function ProductDetails({ product, onBack }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Image source={product.image} style={styles.image} contentFit="cover" />
      <View style={styles.info}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  backButton: { marginBottom: 12 },
  backText: { color: '#007aff' },
  image: { width: '100%', height: 300, borderRadius: 8, backgroundColor: '#eee' },
  info: { marginTop: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  price: { marginTop: 8, fontSize: 18, color: '#444' },
  desc: { marginTop: 12, lineHeight: 20, color: '#333' },
});
