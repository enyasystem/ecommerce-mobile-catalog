# Bundle Size Optimization Guide

## Current Status
- **Build Time**: 52722ms with 1321 modules (initial)
- **Target Sizes**:
  - Android APK: ~35 MB
  - iOS IPA: ~40 MB

## Issues Resolved ✅

### 1. Linking Scheme Configuration
**Issue**: Missing `scheme` in app.json causes Linking to fail in production
**Resolution**: Added `scheme: "nexusstore"` to app.json

### 2. Redux Selector Memoization
**Issue**: Selectors returning new array/object references causing unnecessary rerenders
```tsx
// ❌ Before - Creates new array on every render
const favoriteIds = useSelector((state: any) =>
  state.favorites.items.map((item: any) => item.id)
);
```

**Resolution**: Created memoized selectors using `createSelector`:
- `selectCartCount` - Memoized cart item count
- `selectCartTotal` - Memoized cart totals (subtotal, tax, total)
- `selectFavoritedIds` - Memoized favorite IDs array
- `selectFavoritedCount` - Memoized count of favorites

Updated all screens to use memoized selectors:
- ✅ [app/(tabs)/index.tsx](../../app/(tabs)/index.tsx)
- ✅ [app/browse.tsx](../../app/browse.tsx)
- ✅ [app/(tabs)/search.tsx](../../app/(tabs)/search.tsx)
- ✅ [app/_layout.tsx](../../app/_layout.tsx)

---

## Bundle Size Optimization Strategies

### 1. **Code Splitting & Lazy Loading** (Priority: HIGH)
Lazy load screens and heavy components to reduce initial bundle:

```tsx
// Instead of importing eagerly:
import ProductDetails from './product/[id]';

// Use dynamic imports:
const ProductDetails = lazy(() => import('./product/[id]'));
```

**Implementation**:
- Lazy load product detail screen (heavy with animations)
- Lazy load filter modal (only shown on demand)
- Lazy load search screen complex components

**Expected Reduction**: 5-8%

---

### 2. **Tree-Shake Unused Code** (Priority: HIGH)
Ensure only used code is included in bundle.

**Audit Steps**:
```bash
# Check for unused dependencies
npm ls (or yarn why)

# Analyze bundle composition
expo configure

# Use metro inspector for real-time analysis
npx metro --inspect-output bundle.json
```

**Current Dependencies to Review**:
- axios (already imported, should be kept)
- tailwindcss (verify it's being tree-shaken properly)
- @reduxjs/toolkit (RTK is well tree-shaken, keep)
- react-dom (web support, safe to keep)

**Expected Reduction**: 3-5%

---

### 3. **Optimize Image Assets** (Priority: MEDIUM)
Images often comprise 40-50% of app bundle.

**Current Implementation**:
- Using `expo-image` (optimized)
- Static image imports processed by Metro

**Optimization Steps**:
```tsx
// Use expo-image with optimized format
import { Image } from 'expo-image';

<Image
  source={{ uri: product.image }}
  cachePolicy="memory-disk"
  contentFit="cover"
  transition={300}
/>

// For local images, use WebP format (requires image conversion)
```

**Actions**:
1. Optimize all images to WebP format (20-30% smaller)
2. Implement image caching at HTTP level
3. Use responsive image sizing

**Expected Reduction**: 8-12%

---

### 4. **Remove Unused Imports & Dependencies** (Priority: MEDIUM)
Check each file for unused imports.

**Automated Cleanup**:
```bash
# Use the built-in refactoring to find unused imports
# VS Code: Cmd+Shift+P > "Source Action" > Remove Unused Imports
```

**Manual Review**:
- React imports that aren't needed (React 19 JSX transform)
- Unused icon sets (MaterialCommunityIcons is well-managed)
- Unused Redux actions/selectors

**Expected Reduction**: 1-2%

---

### 5. **Optimize Redux Store Selectors** (Priority: COMPLETED ✅)
**Status**: Already implemented memoized selectors
- Prevents unnecessary full-app rerenders
- Improves runtime performance (faster filter/sort operations)

**Benefit**: 2-3% performance improvement, bundle size neutral

---

### 6. **Metro Bundler Configuration Optimization** (Priority: MEDIUM)
Optimize Metro configuration for smaller output.

**Create/Update `metro.config.js`**:
```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable optimizations
config.transformer.minifierConfig = {
  compress: {
    drop_console: true,
    drop_debugger: true,
  },
  mangle: {
    toplevel: true,
  },
};

// Increase worker threads for faster builds
config.maxWorkers = 4;

module.exports = config;
```

**Actions**:
1. Create metro.config.js in root directory
2. Enable console dropping for production
3. Enable aggressive minification

**Expected Reduction**: 2-4%

---

### 7. **Remove Dev-Only Dependencies** (Priority: LOW)
For production builds, ensure dev tools aren't included.

**Check**:
- Redux DevTools code
- Debug console utilities
- Development-only polyfills

```json
{
  "dependencies": {
    // Production only
  },
  "devDependencies": {
    // Dev only - automatically excluded from production build
    "@types/react": "~19.1.0",
    "tailwindcss": "^4.1.18"
  }
}
```

**Status**: Already properly configured ✅

---

### 8. **Optimize Font Loading** (Priority: LOW)
Fonts can add 1-3MB to bundle.

**Current State**: Using system fonts + Expo icon fonts
**Optimization**: Only include necessary weights and styles

---

## Bundle Analysis Command

Run this to analyze current bundle:

```bash
# Start with optimization enabled
npx expo start --max-workers=4

# Then build for distribution
eas build --platform android --local
eas build --platform ios --local

# Analyze the resulting APK/IPA size
```

---

## Expected Results After All Optimizations

| Optimization | Priority | Estimated Reduction | Time |
|--------------|----------|---------------------|------|
| Code Splitting | HIGH | 5-8% | 2h |
| Tree-shake unused | HIGH | 3-5% | 1h |
| Image optimization | MEDIUM | 8-12% | 1.5h |
| Remove unused imports | MEDIUM | 1-2% | 30m |
| Metro optimization | MEDIUM | 2-4% | 30m |
| Font optimization | LOW | 1-2% | 30m |
| **TOTAL REDUCTION** | — | **20-33%** | ~7h |

---

## Next Steps (In Order)

1. **TODAY** ✅ - Fix warnings (Linking scheme + Redux selectors)
2. **TOMORROW** - Implement Metro bundler optimization
3. **LATER** - Implement code splitting for heavy screens
4. **LATER** - Optimize image assets to WebP
5. **FINAL** - Production builds and size verification

---

## Monitoring & Validation

After each optimization:

```bash
# Build and measure
eas build --platform android --local --output=app.apk

# Check size
ls -lh app.apk  # Should show size in MB

# For iOS (if building locally)
eas build --platform ios --local --output=app.ipa
```

---

## References

- [Expo Bundle Optimization](https://docs.expo.dev/guides/optimizing-bundle-size/)
- [React Native Performance](https://reactnative.dev/docs/performance)
- [Metro Bundler Configuration](https://metrobundler.dev/docs/configuration)
- [Redux Selector Optimization](https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization)
