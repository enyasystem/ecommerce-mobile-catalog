import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ProductList from './src/screens/ProductList.tsx';
import ProductDetails from './src/screens/ProductDetails.tsx';
import type { Product } from './src/data/products.ts';

export default function App() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {selected ? (
        <ProductDetails product={selected} onBack={() => setSelected(null)} />
      ) : (
        <ProductList onSelect={(p) => setSelected(p)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
