import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Rect, Circle, G, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

type Props = {
  onNext: () => void;
};

const { width, height } = Dimensions.get('window');

export default function Onboarding3({ onNext }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.visualArea}>
        <View style={styles.cardHost}>
          <View style={styles.glassSquircle}>
            <Svg width={220} height={220} viewBox="0 0 220 220">
              <Defs>
                <LinearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0" stopColor="#2b6cee" stopOpacity="0.18" />
                  <Stop offset="1" stopColor="#8a2be2" stopOpacity="0.12" />
                </LinearGradient>
              </Defs>

              <G>
                <Rect x={0} y={0} rx={36} width={220} height={220} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
                <Circle cx={110} cy={110} r={44} fill="#fff" opacity={0.06} />
                <Circle cx={110} cy={110} r={40} fill="#fff" />
                <Path d="M96 110l8 8 20-24" stroke="#4b2e7a" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </G>
            </Svg>

            <View style={styles.innerGlowTop} />
            <View style={styles.innerGlowBottom} />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Join the <Text style={styles.titleAccent}>Nexus</Text>
        </Text>
        <Text style={styles.subtitle} numberOfLines={3}>
          Unlock premium benefits and personalized offers today.
        </Text>

        <View style={styles.progressWrap}>
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressActive} />
        </View>

        <TouchableOpacity style={styles.cta} onPress={onNext} activeOpacity={0.88}>
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>

        <View style={styles.homeIndicator} />
      </View>

      <View style={styles.decorTop} pointerEvents="none" />
      <View style={styles.decorBottom} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#050007' },
  visualArea: { height: '48%', alignItems: 'center', justifyContent: 'center' },
  cardHost: { alignItems: 'center', justifyContent: 'center' },
  glassSquircle: {
    width: 260,
    height: 260,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 26,
  },
  innerGlowTop: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,126,95,0.08)',
  },
  innerGlowBottom: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(43,108,238,0.06)',
  },
  content: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 28, paddingTop: 20 },
  title: { color: '#fff', fontSize: 42, fontWeight: '800', textAlign: 'center', lineHeight: 48 },
  titleAccent: { color: '#4b7bff' },
  subtitle: { color: 'rgba(255,255,255,0.62)', fontSize: 16, textAlign: 'center', marginTop: 14, maxWidth: 340, lineHeight: 22 },
  progressWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 28, marginBottom: 18 },
  progressDot: { width: 6, height: 6, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.18)', marginHorizontal: 10 },
  progressActive: { width: 36, height: 12, borderRadius: 12, backgroundColor: '#2b6cee', shadowColor: '#2b6cee', shadowOpacity: 0.9, shadowRadius: 12 },
  cta: { marginTop: 6, width: '90%', maxWidth: 420, height: 72, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  homeIndicator: { width: 180, height: 6, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.06)', marginTop: 18, opacity: 0.5 },
  decorTop: { position: 'absolute', top: -80, right: -60, width: width * 0.8, height: height * 0.45, borderRadius: 300, backgroundColor: 'rgba(255,126,95,0.05)' },
  decorBottom: { position: 'absolute', bottom: -80, left: -60, width: width * 0.8, height: height * 0.45, borderRadius: 300, backgroundColor: 'rgba(43,108,238,0.05)' },
});
