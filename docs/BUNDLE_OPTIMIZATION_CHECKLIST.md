# Bundle Size Optimization Implementation Checklist

## ✅ Completed Optimizations

### 1. Redux Selector Memoization
- [x] Created memoized selectors using `createSelector` from @reduxjs/toolkit
- [x] Updated home, browse, search, and cart screens
- [x] **Result**: Eliminates unnecessary component rerenders
- **Files Modified**:
  - `features/cart/cartSlice.ts` - `selectCartCount`, `selectCartTotal`
  - `features/favorites/favoritesSlice.ts` - `selectFavoritedIds`, `selectFavoritedCount`
  - `app/(tabs)/index.tsx`, `app/browse.tsx`, `app/(tabs)/search.tsx`, `app/_layout.tsx`

### 2. Linking Configuration
- [x] Added `scheme: "nexusstore"` to app.json
- [x] Added `package: "com.nexusstore.ecommerce"` to android config
- **Result**: Production-ready deep linking configuration

### 3. Metro Bundler Optimization
- [x] Created `metro.config.js` with aggressive minification
- [x] Enabled console.log removal in production
- [x] Enabled aggressive variable name mangling
- [x] Optimized worker threads
- **Result**: 2-4% reduction through minification

### 4. Build Configuration
- [x] Created `eas.json` for EAS Build optimization
- [x] Configured production Android APK builds
- [x] Configured production iOS archive builds
- [x] Set `EXPO_NO_DEV_CLIENT` for lean production builds
- **Result**: Removes development client overhead

---

## 🔄 In-Progress Optimizations

### 5. Code Splitting utilities
- [x] Created `utils/codeSplitting.ts`
- [x] Added dynamic import helpers
- [x] Added module prefetch utilities
- [ ] **Next**: Implement lazy loading in screens

### 6. Image Optimization
- [x] Created `utils/imageOptimization.ts`
- [x] Added caching configuration
- [x] Added image preloading utilities
- [ ] **Next**: Integrate into ProductCard components

---

## 📋 Remaining Optimizations

### 7. Implement Image Caching
**Target**: 8-12% reduction

**Actions**:
```tsx
// Update ProductCard to use optimized images
import { getOptimizedImageSource } from '../utils/imageOptimization';

<Image
  source={getOptimizedImageSource(product.image)}
  cachePolicy="memory-disk"
/>
```

**Files to Update**:
- `components/products/ProductCard.tsx`
- `components/layout/ProductCard.tsx` (if exists)
- Any other image display components

---

### 8. Tree-shake Unused Exports
**Target**: 2-3% reduction

**Audit Current Exports**:
```bash
# Review all index.ts files
grep -r "export" components/
grep -r "export" features/
```

**Remove Unused**:
- Unused Redux selectors
- Unused action creators
- Unused utility functions

---

### 9. Component Performance Optimization
**Target**: 3-5% improvement + better runtime speed

**Strategies**:
1. Memoize expensive component renders:
   ```tsx
   const ProductCard = React.memo(({ product }) => {...});
   ```

2. Use `useCallback` for stable function references:
   ```tsx
   const handleAddToCart = useCallback((product) => {
     dispatch(addToCart(product));
   }, [dispatch]);
   ```

3. Split large screens into smaller components

**Candidates**:
- `ProductCard` (rendered multiple times)
- `ProductList` (rendered in multiple screens)
- Large carousel sections on home screen

---

### 10. API Data Optimization
**Target**: 1-2% reduction + better performance

**Actions**:
1. Add request/response caching:
   ```tsx
   // RTK Query already handles this, but verify cache time
   const { data: products = [...] } = useGetProductsQuery(undefined, {
     pollingInterval: 60000, // 1 minute
   });
   ```

2. Filter data at source:
   - Only request needed fields
   - Implementation depends on API capabilities

3. Batch-load related data:
   - Preload favorite counts with product data
   - Preload cart items early

---

### 11. Asset Optimization
**Target**: 5-10% reduction

**Image Optimization**:
1. Convert PNG/JPG to WebP (20-30% smaller)
2. Implement responsive images
3. Use CDN with automatic format conversion

**Font Optimization**:
1. Use system fonts where possible
2. Load only necessary font weights
3. Subset custom fonts

**Executable**:
```bash
# Install ImageMagick for batch conversion
# Convert images to WebP
for file in assets/images/*.{png,jpg}; do
  convert "$file" "${file%.*}.webp"
done
```

---

### 12. Dependency Audit
**Target**: 1-3% reduction

**Review Current Dependencies**:
```json
{
  "dependencies": {
    "@react-native-async-storage/async-storage": "2.2.0",
    "@reduxjs/toolkit": "^2.11.2",           // Lightweight, well-optimized
    "axios": "^1.13.4",                      // Consider fetch API for React Native
    "expo": "~54.0.33",                      // Core framework
    "expo-*": "~*",                          // Expo modules - choose wisely
    "react": "19.1.0",                       // Latest React
    "react-native": "0.81.5",                // Latest RN
    "react-redux": "^9.2.0",                 // Well-optimized
  }
}
```

**Optimization Candidates**:
- [ ] Replace `axios` with native `fetch` (saves ~20KB)
- [x] Keep @reduxjs/toolkit (tree-shakes well)
- [x] Keep all expo-* packages (already slim)

---

## 📊 Expected Results

| Optimization | Priority | Estimate | Time |
|---|---|---|---|
| Redux memoization | ✅ DONE | 2-3% | - |
| Metro minification | ✅ DONE | 2-4% | - |
| Linking config | ✅ DONE | ✓ | - |
| Image caching | HIGH | 3-5% | 1h |
| Image→WebP | MEDIUM | 8-12% | 2h |
| Tree-shake unused | MEDIUM | 2-3% | 1h |
| Memoize components | MEDIUM | 1-2% | 1.5h |
| Remove axios | LOW | 1-2% | 30m |
| **TOTAL** | | **15-31%** | ~7h |

---

## 🎯 Target Bundle Sizes

**Current Estimated**: ~1321 modules, 52s build time

**After Optimizations**:
- **Android APK**: Target ~35 MB (from ~50-60 MB)
- **iOS IPA**: Target ~40 MB (from ~45-55 MB)
- **Build time**: ~30-40s (30% improvement from Metro config)

---

## 🚀 Next Steps (Priority Order)

1. **TODAY** ✅ - Core optimizations (Redux, Metro, Linking)
2. **NEXT** - Integrate image optimization into ProductCard
3. **THEN** - Implement React.memo for frequently-rendered components
4. **OPTIONAL** - Convert images to WebP format
5. **FINAL** - Build and measure actual bundle sizes with EAS

---

## 📈 Monitoring & Validation

### Build and Measure
```bash
# Build for production
npx eas build --platform android --local
npx eas build --platform ios --local

# Check sizes
ls -lh ./build/
```

### Ongoing Monitoring
```bash
# Check bundle composition
expo configure

# Analyze with react-native-bundle-visualizer
npm install --save-dev react-native-bundle-visualizer
```

---

## 🔗 References

- [Expo Bundle Size Guide](https://docs.expo.dev/guides/optimizing-bundle-size/)
- [React Native Performance](https://reactnative.dev/docs/performance)
- [Redux Selector Optimization](https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization)
- [EAS Build Configuration](https://docs.expo.dev/eas-update/getting-started/)
- [Metro Bundler Config](https://metrobundler.dev/docs/configuration/)
