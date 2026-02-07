import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

type Props = {
  onFinish: () => void;
  duration?: number;
};

const { width } = Dimensions.get('window');

export default function SplashScreen({ onFinish, duration = 1800 }: Props) {
  const [percent, setPercent] = useState(0);
  const target = 68;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = 40; // ms between updates
    const steps = Math.max(1, Math.floor(duration / interval));
    const increment = target / steps;

    intervalRef.current = setInterval(() => {
      setPercent((p) => {
        const next = Math.min(target, p + increment);
        return next;
      });
    }, interval) as unknown as number;

    const to = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as unknown as number);
        intervalRef.current = null;
      }
      setPercent(target);
      onFinish();
    }, duration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current as unknown as number);
      clearTimeout(to);
    };
  }, [onFinish, duration]);

  const barMaxWidth = Math.min(width * 0.66, 280);
  const fillWidth = Math.round((percent / 100) * barMaxWidth);

  return (
    <View style={styles.root}>
      <View style={styles.center}>
        <View style={styles.logoWrap}>
          <View style={styles.shimmerEdge} pointerEvents="none" />
          <Text style={styles.monogram}>N</Text>
        </View>

        <View style={styles.titleWrap}>
          <Text style={styles.title}>NexusStore</Text>
          <Text style={styles.subtitle}>Elevating Commerce</Text>
        </View>
      </View>

      <View style={styles.progressArea}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressFill, { width: fillWidth }]} />
        </View>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressLabel}>Initializing</Text>
          <Text style={styles.progressLabel}>{Math.round(percent)}%</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>🔒 Encrypted Nexus Environment</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0914',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoWrap: {
    width: 160,
    height: 160,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },
  shimmerEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  monogram: {
    color: '#fff',
    fontSize: 72,
    fontWeight: '300',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleWrap: { alignItems: 'center' },
  title: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 5,
    fontWeight: '300',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    letterSpacing: 4,
    fontWeight: '600',
    marginTop: 6,
    textTransform: 'uppercase',
  },
  progressArea: { width: '100%', maxWidth: 320, marginBottom: 40 },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 999,
    opacity: 0.9,
  },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  progressLabel: { color: 'rgba(255,255,255,0.95)', fontSize: 10, letterSpacing: 2, fontWeight: '700' },
  footer: { position: 'absolute', bottom: 28, alignItems: 'center' },
  footerText: { color: 'rgba(255,255,255,0.85)', fontSize: 11, letterSpacing: 1.5, fontWeight: '600' },
});
