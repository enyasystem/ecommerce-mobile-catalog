import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

type Props = {
  onNext: () => void;
};

const { width } = Dimensions.get('window');

export default function Onboarding1({ onNext }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.heroArea}>
        <View style={styles.glowBg} />
        <View style={styles.productWrap}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-UG10Fb0z1xDuvewJDTbIbZXOtikclfa-i1N0kpGdSPwiCJMnI5I9IxkSc2M-akkfTWAir6be8WBMmZysaRGlcIcAp0LkyxZBV7qNLz995FneN8NiUP9knMCNztfUR5OLzFDMwBHDo_-iuNu157ra26XckFUw3AfLJjzNRWPWiKaCz5PL-fmvDS-SBOK_SOO8hhEfoQRmE8VnFR64e7H_DREOp0rEGYIx0QgozcsDAWjfmlb-sX0zv_VSIQFkRNSn5pCRxuOuYny_' }}
            style={styles.productImage}
            resizeMode="contain"
            accessible
            accessibilityLabel="Product preview"
          />
        </View>
      </View>

      <View style={styles.textArea}>
        <Text style={styles.title}>Discover{"\n"}Excellence</Text>
        <Text style={styles.subtitle}>Explore our curated collection of premium goods.</Text>

        <View style={styles.progressRow}>
          <View style={[styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity style={styles.button} onPress={onNext} activeOpacity={0.88}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#030409' },
  heroArea: { height: '52%', alignItems: 'center', justifyContent: 'center', paddingTop: 28 },
  glowBg: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: 'transparent',
    borderRadius: (width * 0.9) / 2,
    top: -80,
    left: -40,
    zIndex: 0,
  },
  productWrap: { zIndex: 1, alignItems: 'center', justifyContent: 'center' },
  productImage: { width: 320, height: 220, borderRadius: 28, backgroundColor: 'rgba(0,0,0,0.2)' },
  textArea: { paddingHorizontal: 24, paddingBottom: 36, alignItems: 'center', marginTop: 12 },
  title: { color: '#fff', fontSize: 44, fontWeight: '800', marginBottom: 6, textAlign: 'center', lineHeight: 48 },
  subtitle: { color: 'rgba(255,255,255,0.62)', fontSize: 16, textAlign: 'center', maxWidth: 360, marginTop: 6, lineHeight: 22 },
  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 22 },
  dot: { width: 8, height: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.18)', marginHorizontal: 8 },
  dotActive: { width: 12, height: 12, borderRadius: 12, backgroundColor: '#2b6cee', marginHorizontal: 8, shadowColor: '#2b6cee', shadowOpacity: 0.95, shadowRadius: 14, elevation: 10 },
  button: { width: '94%', maxWidth: 520, height: 72, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});
