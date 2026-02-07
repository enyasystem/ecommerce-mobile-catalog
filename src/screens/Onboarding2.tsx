import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Defs, LinearGradient, RadialGradient, Stop, Rect, G, Path, Circle } from 'react-native-svg';

type Props = {
  onNext: () => void;
};

const { width } = Dimensions.get('window');

// Render SVG via react-native-svg (supported by Expo)

export default function Onboarding2({ onNext }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.visualArea}>
        <View style={styles.cardHost}>
          <View style={styles.roundedCard}>
            <Svg width={260} height={220} viewBox="0 0 260 220">
              <Defs>
                <RadialGradient id="mesh" cx="50%" cy="30%" rx="50%" ry="50%">
                  <Stop offset="0" stopColor="#4c1d95" stopOpacity="0.16" />
                  <Stop offset="1" stopColor="#000000" stopOpacity="0" />
                </RadialGradient>
                <LinearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0" stopColor="#2b0b3f" stopOpacity="0.14" />
                  <Stop offset="1" stopColor="#08020a" stopOpacity="0.02" />
                </LinearGradient>
              </Defs>

              {/* background mesh */}
              <Rect x={0} y={0} width={260} height={220} fill="url(#mesh)" opacity={0.6} />

              {/* large back card rotated */}
              <G transform="translate(18,8) rotate(-12 120 80)">
                <Rect x={0} y={0} rx={20} width={220} height={140} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.03)" />
              </G>

              {/* foreground card rotated differently */}
              <G transform="translate(42,28) rotate(8 110 70)">
                <Rect x={0} y={0} rx={18} width={180} height={110} fill="url(#cardGrad)" stroke="rgba(255,255,255,0.04)" />

                {/* small UI elements on card */}
                <Rect x={14} y={14} width={36} height={20} rx={4} fill="rgba(255,255,255,0.06)" />
                <Rect x={60} y={18} width={86} height={10} rx={5} fill="rgba(255,255,255,0.035)" />
                <Rect x={60} y={36} width={70} height={8} rx={4} fill="rgba(255,255,255,0.03)" />

                {/* contactless waves */}
                <G transform="translate(156,22)">
                  <Path d="M0 4c2 0 4 1 6 2" stroke="rgba(255,255,255,0.9)" strokeWidth={2} strokeLinecap="round" fill="none" />
                  <Path d="M0 12c2 0 4 1 6 2" stroke="rgba(255,255,255,0.9)" strokeWidth={2} strokeLinecap="round" strokeOpacity={0.6} fill="none" />
                </G>
              </G>

              {/* decorative circles */}
              <Circle cx={70} cy={150} r={22} fill="#4c1d95" opacity={0.95} />
              <Circle cx={110} cy={145} r={18} fill="rgba(255,255,255,0.03)" />
            </Svg>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Seamless{"\n"}Experience</Text>
        <Text style={styles.subtitle} numberOfLines={3}>
          Secure payments and glass-smooth navigation designed for you.
        </Text>

        <View style={styles.progressWrap}>
          <View style={styles.progressLeft} />
          <View style={styles.progressCenter} />
          <View style={styles.progressRight} />
        </View>

        <TouchableOpacity style={styles.cta} onPress={onNext} activeOpacity={0.85}>
          <Text style={styles.ctaText}>Next</Text>
          <Text style={styles.ctaArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#030006' },
  visualArea: {
    height: '45%',
    backgroundColor: 'transparent',
    // decorative glow behind content
    shadowColor: '#4c1d95',
    shadowOpacity: 0.6,
    shadowRadius: 60,
  },
  content: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 28, paddingTop: 20 },
  title: { color: '#fff', fontSize: 44, fontWeight: '800', textAlign: 'center', lineHeight: 50 },
  subtitle: { color: 'rgba(255,255,255,0.68)', fontSize: 16, textAlign: 'center', marginTop: 18, maxWidth: 340, lineHeight: 22 },
  progressWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 28 },
  progressLeft: { width: 8, height: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.18)', marginHorizontal: 12 },
  progressCenter: {
    width: 36,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#6f21d9',
    shadowColor: '#6f21d9',
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 8,
  },
  progressRight: { width: 8, height: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.18)', marginHorizontal: 12 },
  cta: {
    marginTop: 8,
    width: '90%',
    maxWidth: 420,
    height: 72,
    borderRadius: 999,
    backgroundColor: '#281032',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  ctaText: { color: '#fff', fontSize: 20, fontWeight: '700', marginRight: 12 },
  ctaArrow: { color: '#fff', fontSize: 26, fontWeight: '700' },
  cardHost: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  roundedCard: {
    width: 260,
    height: 220,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  icon: { width: 120, height: 90 },
});
