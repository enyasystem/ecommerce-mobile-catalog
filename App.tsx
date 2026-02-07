import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductList from './src/screens/ProductList.tsx';
import ProductDetails from './src/screens/ProductDetails.tsx';
import SplashScreen from './src/screens/SplashScreen';
import Onboarding1 from './src/screens/Onboarding1';
import Onboarding2 from './src/screens/Onboarding2';
import Onboarding3 from './src/screens/Onboarding3';
import type { Product } from './src/data/products.ts';

export default function App() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const implementedOnboardingScreens = 3;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {showSplash ? (
        <SplashScreen
          onFinish={async () => {
            setShowSplash(false);
            try {
              const seen = await AsyncStorage.getItem('seenOnboarding');
              if (seen === 'true') {
                setShowOnboarding(false);
              } else {
                setShowOnboarding(true);
                setOnboardingStep(1);
              }
            } catch (e) {
              setShowOnboarding(true);
              setOnboardingStep(1);
            }
          }}
        />
      ) : showOnboarding ? (
        onboardingStep === 1 ? (
          <Onboarding1
            onNext={() => {
              const next = onboardingStep + 1;
              if (next <= implementedOnboardingScreens) {
                setOnboardingStep(next);
              } else {
                setShowOnboarding(false);
              }
            }}
          />
        ) : onboardingStep === 2 ? (
          <Onboarding2
            onNext={() => {
              const next = onboardingStep + 1;
              if (next <= implementedOnboardingScreens) {
                setOnboardingStep(next);
              } else {
                setShowOnboarding(false);
              }
            }}
          />
        ) : onboardingStep === 3 ? (
          <Onboarding3
            onNext={async () => {
              try {
                await AsyncStorage.setItem('seenOnboarding', 'true');
              } catch (e) {
                // ignore storage errors
              }
              const next = onboardingStep + 1;
              if (next <= implementedOnboardingScreens) {
                setOnboardingStep(next);
              } else {
                setShowOnboarding(false);
              }
            }}
          />
        ) : null
      ) : selected ? (
        <ProductDetails product={selected} onBack={() => setSelected(null)} />
      ) : (
        <ProductList onSelect={(p) => setSelected(p)} />
      )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
