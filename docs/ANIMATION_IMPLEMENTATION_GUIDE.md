# Home Screen Animation Implementation Guide 🚀

Quick reference for implementing animations on the home screen with code examples.

---

## Quick Start: 5 Impactful Animations (1-2 Hours)

### 1. Logo Bounce on Load ⭐ (5 minutes)

**File**: `app/(tabs)/index.tsx`

```tsx
import { createBounceAnimation } from '../../utils/animations';
import Animated from 'react-native-reanimated';

export default function HomeScreen() {
  const logoAnimation = createBounceAnimation();

  useEffect(() => {
    logoAnimation.bounce();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Animated.View style={logoAnimation.animatedStyle}>
            <View style={styles.logo}>
              <MaterialCommunityIcons name="cube" size={28} color="#2b6cee" />
              <Text style={styles.logoText}>NexusStore</Text>
            </View>
          </Animated.View>
          {/* Rest of header */}
        </View>
      </View>
    </SafeAreaView>
  );
}
```

**Result**: Logo bounces when app opens
**Duration**: 300ms
**Dependencies**: Existing `createBounceAnimation`

---

### 2. Product Carousel Fade-In ⭐⭐ (15 minutes)

**File**: `app/(tabs)/index.tsx`

```tsx
import { createFadeAnimation } from '../../utils/animations';

export default function HomeScreen() {
  const [itemAnimations] = useState(
    Array(8).fill(0).map(() => new Animated.Value(0))
  );

  useEffect(() => {
    if (!isLoading) {
      const fadeAnimations = itemAnimations.map((anim, index) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
          delay: index * 80, // Stagger each item
        })
      );

      Animated.parallel(fadeAnimations).start();
    }
  }, [isLoading]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContent}
    >
      {isLoading ? (
        // Skeleton loaders
      ) : (
        allProducts.slice(0, 8).map((product, index) => (
          <Animated.View
            key={product.id}
            style={[
              {
                opacity: itemAnimations[index],
                transform: [
                  {
                    scale: itemAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.productCarouselCard}
              onPress={() => {/* Navigate to product */}}
            >
              {/* Product card content */}
            </TouchableOpacity>
          </Animated.View>
        ))
      )}
    </ScrollView>
  );
}
```

**Result**: Products fade and scale in sequence
**Duration**: 400ms + 80ms × 8 = 1040ms total
**Dependencies**: Existing `Animated.timing`, `Easing`

---

### 3. Flash Sale Pulse ⭐⭐ (10 minutes)

**File**: `app/(tabs)/index.tsx` - Flash Sale Section

```tsx
import { createPulseAnimation } from '../../utils/advancedAnimations';

export default function HomeScreen() {
  const saleAnimation = createPulseAnimation(1, 1.05, 800);

  useEffect(() => {
    saleAnimation.pulse();
    return () => saleAnimation.stop();
  }, []);

  return (
    <Animated.View style={[styles.flashSale, saleAnimation.animatedStyle]}>
      <View style={styles.flashSaleContent}>
        <MaterialCommunityIcons name="lightning-bolt" size={16} color="#f59e0b" />
        <Text style={styles.flashText}>FLASH SALE</Text>
      </View>
      <Text style={styles.flashTime}>{formatHHMMSS(remaining)}</Text>
    </Animated.View>
  );
}
```

**Result**: Flash sale box gently scales up and down
**Duration**: 1600ms loop
**Dependencies**: New `createPulseAnimation` from `advancedAnimations.ts`

---

### 4. Favorite Button Bounce ⭐⭐ (10 minutes)

**File**: `app/(tabs)/index.tsx` - Inside product card

```tsx
import { createBounceAnimation } from '../../utils/animations';

// Inside the product mapping:
{allProducts.slice(0, 8).map((product) => {
  const heartBounce = createBounceAnimation();

  const handleFavoritePress = () => {
    heartBounce.bounce();
    dispatch(toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }));
  };

  return (
    <TouchableOpacity
      key={product.id}
      style={styles.productCarouselCard}
      onPress={() => {/* Navigate */}}
    >
      <View style={styles.productImageContainer}>
        <Animated.View style={heartBounce.animatedStyle}>
          <TouchableOpacity
            style={styles.favoriteBtn}
            onPress={handleFavoritePress}
          >
            <MaterialCommunityIcons
              name={favoriteIds.includes(product.id) ? 'heart' : 'heart-outline'}
              size={18}
              color="#2b6cee"
            />
          </TouchableOpacity>
        </Animated.View>
        {/* Image and other content */}
      </View>
    </TouchableOpacity>
  );
})}
```

**Result**: Heart bounces when tapped
**Duration**: 300ms
**Dependencies**: Existing `createBounceAnimation`

---

### 5. Category Pills Slide-In ⭐ (20 minutes)

**File**: `app/(tabs)/index.tsx` - Category Filter Section

```tsx
import { createSlideFromSideAnimation } from '../../utils/advancedAnimations';

export default function HomeScreen() {
  const [categoryAnimations] = useState(
    CATEGORIES.map((_, index) => createSlideFromSideAnimation('left', 50, 400))
  );

  useEffect(() => {
    categoryAnimations.forEach((anim, index) => {
      setTimeout(() => {
        anim.slideIn();
      }, index * 100); // Stagger by 100ms
    });

    return () => {
      categoryAnimations.forEach(anim => anim.slideOut());
    };
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryScroll}
      contentContainerStyle={styles.categoryContent}
      scrollEnabled={false}
    >
      {CATEGORIES.map((cat, index) => (
        <Animated.View
          key={cat}
          style={[
            categoryAnimations[index].animatedStyle,
          ]}
        >
          <TouchableOpacity
            style={[
              styles.categoryBtn,
              selectedCategory === cat && styles.categoryBtnActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}
```

**Result**: Category pills slide in from left in sequence
**Duration**: 400ms per pill + 100ms stagger = 900ms total
**Dependencies**: New `createSlideFromSideAnimation` from `advancedAnimations.ts`

---

## Enhanced Animations (Additional 2-3 hours)

### 6. Brand Circles Rotating

```tsx
import { createRotationAnimation } from '../../utils/advancedAnimations';

{BRANDS.map((brand, index) => {
  const brandRotate = createRotationAnimation(8000 + (index * 1000));

  useEffect(() => {
    brandRotate.startRotating();
    return () => brandRotate.stop();
  }, []);

  return (
    <View key={brand.id} style={styles.brandItem}>
      <Animated.View
        style={[
          styles.brandCircle,
          brandRotate.animatedStyle,
        ]}
      >
        <MaterialCommunityIcons
          name={brand.icon as any}
          size={32}
          color="rgba(255, 255, 255, 0.9)"
        />
      </Animated.View>
      <Text style={styles.brandName}>{brand.name}</Text>
    </View>
  );
})}
```

**Result**: Brand circles rotate at staggered speeds
**Duration**: 8s-14s per rotation
**Dependencies**: New `createRotationAnimation` from `advancedAnimations.ts`

---

### 7. Hero Banner Floating Content

```tsx
import { createFloatingAnimation } from '../../utils/advancedAnimations';

export default function HomeScreen() {
  const heroFloat = createFloatingAnimation(8, 3000);

  useEffect(() => {
    heroFloat.startFloating();
    return () => heroFloat.stop();
  }, []);

  return (
    <View style={styles.heroBanner}>
      <View style={styles.heroImageWrapper}>
        <Image source={{...}} style={styles.heroImage} />
      </View>
      <Animated.View style={[styles.heroContent, heroFloat.animatedStyle]}>
        <Text style={styles.heroLabel}>Limited Edition</Text>
        <Text style={styles.heroTitle}>NEW{'\n'}ARRIVALS</Text>
        <TouchableOpacity style={styles.heroBtn}>
          <Text style={styles.heroBtnText}>Shop Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
```

**Result**: Hero text gently floats up and down
**Duration**: 6s loop (3s up, 3s down)
**Dependencies**: New `createFloatingAnimation` from `advancedAnimations.ts`

---

### 8. Skeleton Shimmer Effect

```tsx
import { createShimmerAnimation } from '../../utils/advancedAnimations';

// In the isLoading section:
{isLoading ? (
  Array.from({ length: 3 }).map((_, index) => {
    const shimmer = createShimmerAnimation(1500);

    useEffect(() => {
      shimmer.startShimmering();
      return () => shimmer.stop();
    }, []);

    return (
      <View key={`skeleton-${index}`} style={styles.productCarouselCard}>
        <Animated.View
          style={[
            styles.productImageContainer,
            styles.skeletonImage,
            shimmer.animatedStyle,
          ]}
        />
        <View style={styles.skeletonContainer}>
          <Animated.View
            style={[
              styles.skeletonBar,
              { width: '75%', height: 16 },
              shimmer.animatedStyle,
            ]}
          />
          {/* More skeleton bars */}
        </View>
      </View>
    );
  })
) : (
  // Loaded content
)}
```

**Result**: Skeleton loaders shimmer while loading
**Duration**: 1500ms loop
**Dependencies**: New `createShimmerAnimation` from `advancedAnimations.ts`

---

## Advanced: Parallax Hero Image

```tsx
import { createParallaxAnimation } from '../../utils/advancedAnimations';

export default function HomeScreen() {
  const scrollOffset = new Animated.Value(0);
  const parallaxAnimation = createParallaxAnimation(scrollOffset, 0.3);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffset } } }],
    { useNativeDriver: true }
  );

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      style={styles.mainScroll}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.heroImageWrapper,
            parallaxAnimation.animatedStyle,
          ]}
        >
          <Image source={{...}} style={styles.heroImage} />
        </Animated.View>
        {/* Rest of content */}
      </SafeAreaView>
    </ScrollView>
  );
}
```

**Result**: Hero image moves slower than scroll for depth effect
**Duration**: Continuous with scroll
**Dependencies**: New `createParallaxAnimation` from `advancedAnimations.ts`

---

## Testing & Validation

### 1. Test on Real Device
```bash
npx expo start --android
# or
npx expo start --ios
```

### 2. Check Performance
Open React Native Debugger → Profiler → Check FPS
- Target: 60 FPS (green)
- Warning: 30-60 FPS (yellow)
- Problem: <30 FPS (red)

### 3. Accessibility
Settings → Developer Options → Animation Scale
Test with animation scale set to 0.5x and 2x

---

## Implementation Checklist

### Phase 1 (1-2 hours) - Highest Impact
- [ ] Logo bounce on load
- [ ] Product carousel fade-in
- [ ] Favorite button bounce
- [ ] Flash sale pulse
- [ ] Category pills slide-in
- ✅ Run TypeScript validation
- ✅ Test on device
- ✅ Check FPS performance

### Phase 2 (2-3 hours) - Premium Polish
- [ ] Brand circles rotation
- [ ] Hero content floating
- [ ] Skeleton shimmer
- [ ] Add to cart scale animation
- [ ] Section header slide in
- ✅ Validate changes
- ✅ Test performance impact

### Phase 3 (Optional) - Advanced
- [ ] Parallax hero image
- [ ] Gesture-based animations
- [ ] Complex color transitions
- [ ] Scroll-linked animations

---

## Common Issues & Solutions

### Issue: Animation not starting
**Solution**: Ensure useEffect runs after component mounts
```tsx
useEffect(() => {
  animation.start();
}, []); // Empty dependency array
```

### Issue: Animation stuttering on low-end devices
**Solution**: Reduce concurrent animations, use `useNativeDriver: true`
```tsx
useNativeDriver: true // Keep native animations≤ this for GPU acceleration
```

### Issue: Animation causing lag
**Solution**: Use performance profiler to identify bottleneck
```bash
flipper # Open Flipper for profiling
```

---

## Code Organization Best Practice

Create `hooks/useHomeAnimations.ts` for all animations:

```tsx
// hooks/useHomeAnimations.ts
export const useHomeAnimations = () => {
  const logoAnimation = createBounceAnimation();
  const saleAnimation = createPulseAnimation(1, 1.05, 800);
  const heroFloat = createFloatingAnimation(8, 3000);

  return {
    logoAnimation,
    saleAnimation,
    heroFloat,
  };
};

// In HomeScreen:
const animations = useHomeAnimations();
```

This keeps the component clean and animations maintainable.

---

## Performance Tips

✅ **DO**:
- Use `useNativeDriver: true` for transform and opacity
- Stop animations in cleanup functions
- Throttle scroll events with `scrollEventThrottle={16}`
- Test on actual devices
- Monitor FPS with Flipper

❌ **DON'T**:
- Animate width/height (use `useNativeDriver: false`)
- Run 10+ animations simultaneously
- Use excessive easing functions
- Ignore accessibility settings
- Skip performance testing

---

## Next Steps

1. Choose 3-5 animations from the suggestions
2. Follow the implementation code examples
3. Test on real devices (iOS + Android)
4. Monitor FPS with profiler
5. Iterate based on performance feedback
6. Combine animations for cohesive experience

---

## Resources

- [React Native Animated API](https://reactnative.dev/docs/animated)
- [Animation Best Practices](https://reactnative.dev/docs/performance)
- [Easing Functions](https://reactnative.dev/docs/easing)
- [Flipper Profiler](https://fbflipper.com/)

---

**Total Expected Time**: 1-2 hours for Phase 1 animations
**Visual Impact**: High (immediate professional appearance)
**Performance Cost**: Minimal (GPU-accelerated)
