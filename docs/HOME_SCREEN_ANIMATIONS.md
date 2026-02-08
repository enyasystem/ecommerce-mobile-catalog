# Home Screen Animation Suggestions 🎨

## Overview
This document suggests strategic animations for the home screen that enhance user experience without compromising performance. All animations utilize the existing animation utilities in `utils/animations.ts`.

---

## Component-by-Component Animation Recommendations

### 1. **Header Section** ✨
**Current State**: Static, appears instantly on load

**Suggested Animations**:

#### A. Logo Bounce on Load
```tsx
const logoAnimation = createBounceAnimation();

useEffect(() => {
  logoAnimation.bounce();
}, []);

<Animated.View style={logoAnimation.animatedStyle}>
  <View style={styles.logo}>
    <MaterialCommunityIcons name="cube" size={28} color="#2b6cee" />
    <Text style={styles.logoText}>NexusStore</Text>
  </View>
</Animated.View>
```
**Effect**: Logo bounces when user first opens the app, creating a welcoming feel
**Duration**: 300ms
**Impact**: High visual polish, low performance cost

#### B. Notification Badge Pulse
```tsx
const notificationPulse = new Animated.Value(1);

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(notificationPulse, {
        toValue: 1.3,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(notificationPulse, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);

<Animated.View style={[styles.notificationBadge, { transform: [{ scale: notificationPulse }] }]} />
```
**Effect**: Badge gently pulses to draw attention
**Duration**: Infinite loop
**Impact**: Subtle attention-grabber

---

### 2. **Search Bar** 🔍
**Current State**: Static, no emphasis

**Suggested Animation**:

#### Focus Slide & Glow
```tsx
const searchFocus = new Animated.Value(0);

const handleSearchFocus = () => {
  Animated.timing(searchFocus, {
    toValue: 1,
    duration: 300,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: false,
  }).start();
};

const borderWidth = searchFocus.interpolate({
  inputRange: [0, 1],
  outputRange: [1, 2],
});

const shadowOpacity = searchFocus.interpolate({
  inputRange: [0, 1],
  outputRange: [0.2, 0.6],
});

<Animated.View style={[styles.searchContainer, { borderWidth, shadowOpacity }]}>
  {/* Search content */}
</Animated.View>
```
**Effect**: Search bar glows with enhanced shadow when focused
**Duration**: 300ms
**Impact**: Better focus indication

---

### 3. **Category Filter Pills** 🏷️
**Current State**: Tap to change color, no transition

**Suggested Animations**:

#### A. Staggered Entrance
```tsx
const [categoryAnimations] = useState(
  CATEGORIES.map(() => new Animated.Value(0))
);

useEffect(() => {
  Animated.staggered(
    categoryAnimations.map((anim) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ),
    100 // 100ms between each
  ).start();
}, []);

{CATEGORIES.map((cat, index) => (
  <Animated.View
    key={cat}
    style={[
      {
        opacity: categoryAnimations[index],
        transform: [
          {
            translateX: categoryAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            }),
          },
        ],
      },
    ]}
  >
    <TouchableOpacity
      style={[
        styles.categoryBtn,
        selectedCategory === cat && styles.categoryBtnActive,
      ]}
      onPress={() => setSelectedCategory(cat)}
    >
      {/* Category button */}
    </TouchableOpacity>
  </Animated.View>
))}
```
**Effect**: Category pills slide in from left in sequence
**Duration**: 400ms + 100ms stagger = 900ms total
**Impact**: Guides user attention sequentially

#### B. Selection Highlight Pulse
```tsx
const highlightScale = new Animated.Value(1);

useEffect(() => {
  if (selectedCategory !== 'All') {
    Animated.sequence([
      Animated.timing(highlightScale, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(highlightScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }
}, [selectedCategory]);

<Animated.View style={[styles.categoryBtnActive, { transform: [{ scale: highlightScale }] }]}>
  {/* Active pill indicator */}
</Animated.View>
```
**Effect**: Selected pill scales up slightly to confirm selection
**Duration**: 400ms
**Impact**: Better feedback on interaction

---

### 4. **Hero Banner** 🖼️
**Current State**: Static, no movement

**Suggested Animations**:

#### A. Parallax Scroll Effect (Advanced)
```tsx
const scrollOffset = new Animated.Value(0);

const handleScroll = Animated.event(
  [{ nativeEvent: { contentOffset: { y: scrollOffset } } }],
  { useNativeDriver: true }
);

const translateY = scrollOffset.interpolate({
  inputRange: [0, 300],
  outputRange: [0, 30], // Slower scroll than content
});

<Animated.View style={[styles.heroImageWrapper, { transform: [{ translateY }] }]}>
  <Image source={{...}} style={styles.heroImage} />
</Animated.View>
```
**Effect**: Background image moves slower than content, creating depth
**Duration**: Continuous with scroll
**Impact**: Premium feel, good visual depth

#### B. Fade & Scale on Load
```tsx
const heroBannerAnimation = createFadeAnimation(500);

useEffect(() => {
  heroBannerAnimation.fadeIn();
}, []);

<Animated.View style={[styles.heroBanner, heroBannerAnimation.animatedStyle]}>
  {/* Banner content fades in */}
</Animated.View>
```
**Effect**: Hero banner fades in smoothly on load
**Duration**: 500ms
**Impact**: Less jarring experience

#### C. Floating Content Overlay
```tsx
const floatValue = new Animated.Value(0);

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(floatValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(floatValue, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);

const heroContentTranslateY = floatValue.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -8],
});

<Animated.View style={[styles.heroContent, { transform: [{ translateY: heroContentTranslateY }] }]}>
  {/* Hero text gently floats up and down */}
</Animated.View>
```
**Effect**: Hero content text gently floats up and down
**Duration**: 6s loop (3s up, 3s down)
**Impact**: Subtle, premium feel

---

### 5. **Product Carousel Items** 🛍️
**Current State**: Static, no entrance animation

**Suggested Animations**:

#### A. Staggered Fade-In on Load
```tsx
const [itemAnimations] = useState(
  Array(8).fill(0).map(() => new Animated.Value(0))
);

useEffect(() => {
  if (!isLoading) {
    Animated.staggered(
      itemAnimations.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      ),
      80 // 80ms between items
    ).start();
  }
}, [isLoading]);

{allProducts.slice(0, 8).map((product, index) => (
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
      onPress={() => {/* navigate */}}
    >
      {/* Product card content */}
    </TouchableOpacity>
  </Animated.View>
))}
```
**Effect**: Product cards scale and fade in sequence
**Duration**: 400ms + 80ms * 8 = ~1040ms total
**Impact**: Impressive visual impact, guides attention

#### B. Press Animation on Add to Cart
Use existing `AnimatedButton` component or `createPressAnimation`:
```tsx
const pressAnimation = createPressAnimation(0.92, 150);

<Animated.View style={pressAnimation.animatedStyle}>
  <TouchableOpacity
    style={styles.addBtn}
    onPressIn={pressAnimation.onPressIn}
    onPressOut={pressAnimation.onPressOut}
    onPress={() => dispatch(addToCart(product))}
  >
    <MaterialCommunityIcons name="plus" size={18} color="#fff" />
  </TouchableOpacity>
</Animated.View>
```
**Effect**: Button scales down 8% when pressed
**Duration**: 150ms
**Impact**: Better tactile feedback

#### C. Heart Animation on Favorite Toggle
```tsx
const heartAnimation = createBounceAnimation();

const handleFavoritePress = () => {
  heartAnimation.bounce();
  dispatch(toggleFavorite({...}));
};

<Animated.View style={heartAnimation.animatedStyle}>
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
```
**Effect**: Heart bounces when tapped
**Duration**: 300ms
**Impact**: Delightful interaction, confirms action

#### D. Price Change Animation
```tsx
const priceAnimation = new Animated.Value(0);

const handlePriceHighlight = () => {
  Animated.sequence([
    Animated.timing(priceAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }),
    Animated.timing(priceAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }),
  ]).start();
};

const backgroundColor = priceAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: ['transparent', 'rgba(43, 108, 238, 0.1)'],
});

<Animated.View style={[styles.priceWrap, { backgroundColor }]}>
  <Text style={styles.productPrice}>${product.price}</Text>
</Animated.View>
```
**Effect**: Price background highlights on view
**Duration**: 400ms
**Impact**: Draws attention to pricing

---

### 6. **Flash Sale Section** ⚡
**Current State**: Static countdown timer

**Suggested Animations**:

#### A. Pulsing Sale Container
```tsx
const saleAnimation = new Animated.Value(1);

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(saleAnimation, {
        toValue: 1.05,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(saleAnimation, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);

<Animated.View style={[styles.flashSale, { transform: [{ scale: saleAnimation }] }]}>
  {/* Flash sale content */}
</Animated.View>
```
**Effect**: Flash sale box gently scales up and down
**Duration**: 1600ms loop
**Impact**: Draws attention to time-limited offer

#### B. Timer Numbers Glow
```tsx
const timerGlow = new Animated.Value(0);

useEffect(() => {
  if (remaining < 3600) { // Less than 1 hour
    Animated.loop(
      Animated.sequence([
        Animated.timing(timerGlow, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(timerGlow, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }
}, [remaining]);

const shadowOpacity = timerGlow.interpolate({
  inputRange: [0, 1],
  outputRange: [0.3, 0.8],
});

<Animated.View style={[styles.flashTime, { shadowOpacity }]}>
  <Text>{formatHHMMSS(remaining)}</Text>
</Animated.View>
```
**Effect**: Timer glows intensely when sale is ending soon
**Duration**: 1000ms loop (reduces to 400ms at 30 min)
**Impact**: Urgency indicator

---

### 7. **Top Brands Section** 🎯
**Current State**: Static circular brand icons

**Suggested Animations**:

#### A. Rotating Brand Circles
```tsx
const [brandRotations] = useState(
  BRANDS.map(() => new Animated.Value(0))
);

useEffect(() => {
  BRANDS.forEach((_, index) => {
    Animated.loop(
      Animated.timing(brandRotations[index], {
        toValue: 1,
        duration: 8000 + (index * 1000), // Staggered rotation speeds
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  });
}, []);

{BRANDS.map((brand, index) => (
  <View key={brand.id} style={styles.brandItem}>
    <Animated.View
      style={[
        styles.brandCircle,
        {
          transform: [
            {
              rotate: brandRotations[index].interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
      ]}
    >
      <MaterialCommunityIcons name={brand.icon as any} size={32} color="rgba(255, 255, 255, 0.9)" />
    </Animated.View>
    <Text style={styles.brandName}>{brand.name}</Text>
  </Animated.View>
))}
```
**Effect**: Each brand circle rotates at different speeds
**Duration**: 8s-14s rotations (staggered)
**Impact**: Eye-catching, premium feel

#### B. Hover Scale Effect
```tsx
const brandScale = new Animated.Value(1);

const handleBrandPress = () => {
  Animated.sequence([
    Animated.timing(brandScale, {
      toValue: 1.15,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(brandScale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start();
};

<Animated.View style={[styles.brandCircle, { transform: [{ scale: brandScale }] }]}>
  {/* Brand icon */}
</Animated.View>
```
**Effect**: Brand circle enlarges on tap
**Duration**: 400ms
**Impact**: Interactive feedback

---

### 8. **Section Headers** 📝
**Current State**: Static text

**Suggested Animation**:

#### Slide-In from Left
```tsx
const [headerAnimations] = useState({
  newArrivals: new Animated.Value(-50),
  brands: new Animated.Value(-50),
  featured: new Animated.Value(-50),
  electronics: new Animated.Value(-50),
  // ... more sections
});

useEffect(() => {
  Animated.timing(headerAnimations.newArrivals, {
    toValue: 0,
    duration: 400,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  }).start();
  // ... animate other headers
}, []);

<Animated.View style={{ transform: [{ translateX: headerAnimations.newArrivals }] }}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>New Arrivals</Text>
    <TouchableOpacity>
      <Text style={styles.viewAllBtn}>View All</Text>
    </TouchableOpacity>
  </View>
</Animated.View>
```
**Effect**: Section titles slide in from left
**Duration**: 400ms
**Impact**: Structured visual flow

---

### 9. **Skeleton Loaders** 💀
**Current State**: Static gray boxes

**Suggested Animation**:

#### Shimmer Loading Effect
```tsx
const shimmerAnimation = new Animated.Value(0);

useEffect(() => {
  if (isLoading) {
    Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: false,
      })
    ).start();
  }
}, [isLoading]);

const backgroundColor = shimmerAnimation.interpolate({
  inputRange: [0, 1],
  outputRange: ['#1a1a2e', '#2d2d4e'],
});

{isLoading && (
  <Animated.View
    style={[styles.skeletonImage, { backgroundColor }]}
  />
)}
```
**Effect**: Skeleton loaders shimmer back and forth
**Duration**: 1500ms loop
**Impact**: Better perceived performance, less jarring

---

## Section Carousel Animations (Multiple Categories)

For each category carousel section (Electronics, Men's Clothing, Women's Clothing, Jewelery):

### A. Sequential Section Entrance
```tsx
const sectionAnimations = {
  electronics: new Animated.Value(0),
  menClothing: new Animated.Value(0),
  womenClothing: new Animated.Value(0),
  jewelery: new Animated.Value(0),
};

useEffect(() => {
  Animated.staggered([
    Animated.timing(sectionAnimations.electronics, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }),
    Animated.timing(sectionAnimations.menClothing, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }),
    Animated.timing(sectionAnimations.womenClothing, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }),
    Animated.timing(sectionAnimations.jewelery, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }),
  ], 200).start();
}, []);
```
**Effect**: Each category section fades in one after another
**Duration**: 400ms + 200ms stagger = 1400ms total
**Impact**: Guides user through content systematically

---

## Combined Animation Sequence (Page Load)

For the best user experience, orchestrate animations in this sequence:

```
T=0ms:     Logo bounces
T=200ms:   Notification badge starts pulsing
T=400ms:   Search bar appears (fade in)
T=300ms:   Category pills slide in (staggered)
T=600ms:   Hero banner fades in, starts floating
T=1000ms:  Product carousels fade in (staggered)
T=2000ms:  Brand section rotations begin
T=2500ms:  Flash sale pulsing begins
T=3000ms:  All animations stable
```

---

## Performance Considerations

### GPU-Accelerated Animations
All animations use `useNativeDriver: true` where possible for better performance:
- ✅ Scale, opacity, rotation, translateX/Y
- ❌ Width, height, backgroundColor (use `useNativeDriver: false`)

### Animation Optimization Tips
1. **Use `shouldRasterizeIOS`** for complex animated views:
   ```tsx
   <Animated.View style={{ shouldRasterizeIOS: isAnimating }}>
     {/* Complex hierarchy */}
   </Animated.View>
   ```

2. **Limit concurrent animations** to 3-4 simultaneous
3. **Stop animations when screen is not visible** using `useEffect` cleanup
4. **Memoize animation values** with `useMemo`

---

## Implementation Phases

### Phase 1: Basic (Low Cost, High Impact)
- [x] Logo bounce on load
- [ ] Product carousel fade-in
- [ ] Favorite button bounce
- [ ] Category pills animation
- [ ] Flash sale pulse
- **Effort**: 2-3 hours
- **Performance Impact**: Minimal

### Phase 2: Intermediate (Medium Cost, Good Impact)
- [ ] Parallax hero banner
- [ ] Skeleton shimmer
- [ ] Section header slide-in
- [ ] Brand circle rotation
- [ ] Hero content floating
- **Effort**: 4-5 hours
- **Performance Impact**: Low

### Phase 3: Advanced (Higher Cost, Premium Feel)
- [ ] Complex staggered sequences
- [ ] Gesture-based animations
- [ ] Scroll-linked parallax
- [ ] Advanced easing curves
- **Effort**: 6-8 hours
- **Performance Impact**: Medium (optimize carefully)

---

## Animation Best Practices Checklist

- ✅ Use existing animation utilities from `utils/animations.ts`
- ✅ Keep animations under 500ms for UI feedback
- ✅ Keep infinite animations smooth and subtle
- ✅ Test on real devices (especially low-end)
- ✅ Disable animations option in accessibility settings
- ✅ Monitor FPS with React Native performance monitor
- ✅ Use `useNativeDriver: true` whenever possible
- ✅ Don't animate components during heavy computation
- ✅ Stop animations in cleanup (useEffect return)
- ✅ Document animation parameters for maintainability

---

## Testing Animations

### Visual Testing Checklist
- [ ] Test on iPhone (iOS)
- [ ] Test on Android device
- [ ] Test on slow devices (Pixel 3, iPhone XS)
- [ ] Test with low power mode enabled
- [ ] Test with reduce motion accessibility setting enabled
- [ ] Monitor with React Native DevTools performance profiler

### Performance Metrics
```bash
# Check FPS during animation playback
npx react-native run-android --verbose
# Monitor: Check for yellow/red frames in React Native Debugger
```

---

## Recommended Priority for Implementation

**Highest Impact, Easiest Implementation:**
1. **Logo bounce** (5 min) - Creates immediate welcoming feel
2. **Product carousel fade-in** (15 min) - Professional appearance
3. **Favorite button bounce** (10 min) - Better feedback
4. **Flash sale pulse** (10 min) - Draws attention to offers
5. **Category pills slide-in** (20 min) - Guides user attention

**Time Investment**: ~1 hour
**Visual Impact**: High
**Performance Cost**: Minimal

---

## Code Organization

Create a new file `hooks/useHomeScreenAnimations.ts` to centralize all animation logic:

```tsx
// hooks/useHomeScreenAnimations.ts
export const useHomeScreenAnimations = () => {
  const logoAnimation = createBounceAnimation();
  const heroAnimation = createFadeAnimation(500);
  const saleAnimation = createPulseAnimation();
  
  useEffect(() => {
    logoAnimation.bounce();
    heroAnimation.fadeIn();
  }, []);
  
  return {
    logoAnimation,
    heroAnimation,
    saleAnimation,
    // ... other animations
  };
};

// In home screen
const animations = useHomeScreenAnimations();
<Animated.View style={animations.logoAnimation.animatedStyle}>
  {/* Logo */}
</Animated.View>
```

This keeps the component clean and animations maintainable.

---

## Summary

Implementing these 5-10 strategic animations will transform the home screen from functional to delightful:
- **Logo bounce**: Immediate welcoming feel
- **Product carousel fade**: Professional appearance
- **Hero banner floating**: Premium feel
- **Flash sale pulse**: Urgency indicator
- **Brand rotations**: Eye-catching elements

Start with Phase 1 for immediate visual improvement, then add more sophisticated animations as time permits.
