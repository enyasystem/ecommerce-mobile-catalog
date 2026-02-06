import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PRODUCTS from '../data/products';
import ProductCard from '../components/ProductCard';
import type { Product } from '../data/products';

type Props = {
  onSelect: (p: Product) => void;
};

export default function ProductList({ onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catalog</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={onSelect} />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 24, fontWeight: '700', padding: 16 },
});
