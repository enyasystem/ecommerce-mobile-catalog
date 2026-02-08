import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PRODUCTS, { type Product } from '../data/products';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const id = params.id;

  const product = useMemo(() => {
    // Prefer full product data passed via query params (so taps show exact item)
    if (params.name || params.image) {
      return {
        id: String(id ?? PRODUCTS[0].id),
        name: String(params.name ?? PRODUCTS[0].name),
        price: Number(params.price ?? PRODUCTS[0].price) || 0,
        description: String(params.description ?? PRODUCTS[0].description ?? ''),
        image: String(params.image ?? PRODUCTS[0].image),
      } as Product;
    }
    return PRODUCTS.find((p) => p.id === String(id)) ?? PRODUCTS[0];
  }, [params, id]);

  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedSize, setSelectedSize] = useState('US 7');
  const [activeImage, setActiveImage] = useState(0);

  // support multiple images passed as a single string separated by `|`
  const images: string[] = useMemo(() => {
    const img = product?.image ?? '';
    if (typeof img === 'string' && img.includes('|')) return img.split('|').map((s) => s.trim());
    return [String(img)];
  }, [product]);

  const cardSize = Math.min(420, width - 48);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header (absolute) */}
        <View style={styles.headerAbsolute} pointerEvents="box-none">
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, styles.iconBtnRight]}>
            <MaterialCommunityIcons name="heart-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.heroWrap}>
          <View style={styles.heroBgAccent} />
            <View style={styles.heroCard}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                  const idx = Math.round(e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width);
                  setActiveImage(idx);
                }}
                style={{ width: cardSize }}
              >
                {images.map((src, i) => (
                  <View key={i} style={[styles.heroInner, { width: cardSize }]}> 
                    <Image source={{ uri: src }} style={[styles.heroImage, { width: cardSize * 0.92, height: cardSize * 0.88 }]} contentFit="contain" />
                  </View>
                ))}
              </ScrollView>
            </View>
          <View style={styles.paginationDots}>
            {images.map((_, i) => (
              <View key={i} style={i === activeImage ? styles.dotActive : styles.dot} />
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.name}</Text>
            <View style={styles.ratingWrap}>
              <MaterialCommunityIcons name="star" size={14} color="#FACC15" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.description}>
              {product.description}{' '}
              <Text style={styles.readMore}>Read more</Text>
            </Text>
          </View>

          {/* Color selector */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Color</Text>
            <View style={styles.colorRow}>
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: '#dc2626' }, selectedColor === 'red' && styles.colorSelected]}
                onPress={() => setSelectedColor('red')}
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: '#2563eb' }, selectedColor === 'blue' && styles.colorSelected]}
                onPress={() => setSelectedColor('blue')}
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: '#111827' }, selectedColor === 'black' && styles.colorSelected]}
                onPress={() => setSelectedColor('black')}
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: '#ffffff', borderWidth: 1 }, selectedColor === 'white' && styles.colorSelected]}
                onPress={() => setSelectedColor('white')}
              />
            </View>
          </View>

          {/* Size selector */}
          <View style={[styles.section, styles.sizeSection]}>
            <View style={styles.sizeHeader}>
              <Text style={styles.sectionLabel}>Select Size</Text>
              <TouchableOpacity>
                <Text style={styles.sizeGuide}>Size Guide</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={['US 7', 'US 8', 'US 9', 'US 10', 'US 11']}
              horizontal
              keyExtractor={(i) => i}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sizesList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedSize(item)}
                  style={[
                    styles.sizeBtn,
                    item === selectedSize ? styles.sizeBtnActive : styles.sizeBtnInactive,
                  ]}
                >
                  <Text style={item === selectedSize ? styles.sizeTextActive : styles.sizeText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={{ height: insets.bottom + 160 }} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Area */}
      <View style={styles.bottomWrap} pointerEvents="box-none">
        <View style={[styles.buyGlow, { bottom: insets.bottom + 100 }]} />
        <TouchableOpacity style={[styles.buyBtn, { bottom: insets.bottom + 104 }]}>
          <MaterialCommunityIcons name="shopping" size={18} color="#fff" />
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>

        <View style={[styles.floatingTabs, { bottom: insets.bottom + 16 }] }>
          <TouchableOpacity style={styles.tabBtn}>
            <MaterialCommunityIcons name="home" size={22} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBtn}>
            <MaterialCommunityIcons name="magnify" size={22} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
          <View style={styles.centerAction}>
            <TouchableOpacity style={styles.centerBtn}>
              <MaterialCommunityIcons name="cart" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.tabBtn}>
            <MaterialCommunityIcons name="heart-outline" size={22} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabBtn}>
            <MaterialCommunityIcons name="account" size={22} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#050505' },
  container: { paddingBottom: 24 },
  headerAbsolute: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnRight: {},
  heroWrap: {
    width: '100%',
    height: Math.max(460, width * 0.6),
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050511',
    paddingTop: 12,
  },
  heroBgAccent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    backgroundColor: 'transparent',
  },
  heroCard: {
    width: Math.min(420, width - 48),
    height: Math.min(420, width - 48),
    borderRadius: 20,
    backgroundColor: '#0b0b0d',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 18,
  },
  heroInner: { zIndex: 10, width: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' as any },
  heroImage: {
    width: '92%',
    height: '88%',
    resizeMode: 'contain',
    borderRadius: 16,
  },
  paginationDots: { position: 'absolute', bottom: 18, flexDirection: 'row' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 4 },
  dotActive: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff', marginHorizontal: 4 },
  content: { paddingHorizontal: 18, paddingTop: 18 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { color: '#fff', fontSize: 28, fontWeight: '900', flex: 1 },
  ratingWrap: { backgroundColor: '#061223', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderColor: 'rgba(43,108,238,0.14)' },
  ratingText: { color: '#fff', marginLeft: 6, fontWeight: '700' },
  price: { color: '#2b6cee', fontSize: 22, fontWeight: '800', marginTop: 8 },
  section: { marginTop: 18 },
  sectionLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  description: { color: 'rgba(255,255,255,0.85)', marginTop: 8, lineHeight: 22, fontWeight: '300' },
  readMore: { color: '#2b6cee', fontWeight: '700' },
  colorRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  colorCircle: { width: 40, height: 40, borderRadius: 20, borderColor: '#fff', borderWidth: 0.5 },
  colorSelected: { borderWidth: 2, borderColor: '#2b6cee', shadowColor: '#2b6cee', shadowOpacity: 0.4, shadowRadius: 12, elevation: 12 },
  sizeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sizeSection: { marginTop: 10 },
  sizeGuide: { color: '#2b6cee', fontWeight: '600' },
  sizesList: { paddingVertical: 6 },
  sizeBtn: { minWidth: 56, height: 56, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  sizeBtnActive: { backgroundColor: '#2b6cee', borderWidth: 0, shadowColor: '#2b6cee', shadowOpacity: 0.4, shadowRadius: 14, elevation: 10 },
  sizeBtnInactive: { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  sizeTextActive: { color: '#fff', fontWeight: '800' },
  sizeText: { color: 'rgba(255,255,255,0.7)', fontWeight: '700' },
  bottomWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, alignItems: 'center', pointerEvents: 'box-none' as any },
  buyGlow: { position: 'absolute', bottom: 156, width: Math.min(440, width - 48), height: 44, borderRadius: 999, backgroundColor: '#2b6cee', opacity: 0.12, shadowColor: '#2b6cee', shadowOpacity: 0.6, shadowRadius: 32, shadowOffset: { width: 0, height: 18 }, elevation: 12, zIndex: 20 },
  buyBtn: { position: 'absolute', bottom: 160, left: 24, right: 24, maxWidth: 440, height: 44, backgroundColor: '#2b6cee', borderRadius: 999, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, elevation: 14, zIndex: 30 },
  buyText: { color: '#fff', fontWeight: '800', marginLeft: 8 },
  floatingTabs: { position: 'absolute', bottom: 16, marginTop: 12, width: Math.min(360, width - 32), height: 64, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.03)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8, shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 12, elevation: 10, zIndex: 10 },
  tabBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  centerAction: { position: 'relative', top: -20, alignItems: 'center', justifyContent: 'center' },
  centerBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#fff', shadowOpacity: 0.6, shadowRadius: 18, elevation: 10 },
});
