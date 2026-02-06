# ⚡ Mobile Quick Start - React Native + Expo

## Get Your E-Commerce App Running in 20 Minutes

**Time Remaining**: ~3 days (Feb 6 → Feb 8)

---

## 🎯 Critical Path to Success

### Phase 1: Setup (TODAY - 2 hours)
1. ✅ Install Expo & create project (10 min)
2. ✅ Configure NativeWind (10 min)
3. ✅ Setup Redux Toolkit (15 min)
4. ✅ Create Expo Router structure (15 min)
5. ✅ Build ProductCard (30 min)
6. ✅ Test on your phone (10 min)
7. ✅ First Git commit (5 min)

### Phase 2: Core Features (TODAY - 6 hours)
8. ✅ ProductList with FlatList (1 hour)
9. ✅ API integration (1 hour)
10. ✅ Filter modal (1.5 hours)
11. ✅ Search screen (1 hour)
12. ✅ Product details screen (1.5 hours)

### Phase 3: Polish (FEB 7 - 6 hours)
13. ✅ Pull-to-refresh (30 min)
14. ✅ Loading states (1 hour)
15. ✅ Error handling (1 hour)
16. ✅ Accessibility labels (1 hour)
17. ✅ UI refinements (2 hours)
18. ✅ Test on device (30 min)

### Phase 4: Submit (FEB 8 - 6 hours)
19. ✅ Build APK (1 hour)
20. ✅ Figma mockup (1 hour)
21. ✅ Demo video (1 hour)
22. ✅ Presentation (1 hour)
23. ✅ README finalization (1 hour)
24. ✅ Submit (1 hour)

---

## 🚀 20-Minute Setup

### Step 1: Install Expo CLI (2 min)

```bash
npm install -g expo-cli
# or
npm install -g eas-cli
```

### Step 2: Create Project (3 min)

```bash
# Create project
npx create-expo-app@latest ecommerce-mobile --template blank-typescript

cd ecommerce-mobile

# Test it works
npx expo start
```

**Press 'i' for iOS or 'a' for Android simulator**  
**OR scan QR code with Expo Go app on your phone** 📱

### Step 3: Install Dependencies (5 min)

```bash
# Expo Router
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# Redux
npm install @reduxjs/toolkit react-redux axios

# NativeWind
npm install nativewind
npm install --save-dev tailwindcss

# UI enhancements
npm install react-native-reanimated react-native-gesture-handler
npx expo install expo-image
```

### Step 4: Configure NativeWind (5 min)

**Create `tailwind.config.js`:**
```javascript
module.exports = {
  content: ["./app/**/*.{js,tsx,ts,tsx}", "./components/**/*.{js,tsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

**Create `global.css`:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Update `babel.config.js`:**
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel', 'react-native-reanimated/plugin'],
  };
};
```

**Create `metro.config.js`:**
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

**Create `nativewind-env.d.ts`:**
```typescript
/// <reference types="nativewind/types" />
```

### Step 5: Setup Project Structure (5 min)

```bash
# Create folders
mkdir -p app/{tabs,product}
mkdir -p components/{common,layout,products}
mkdir -p features/{products,filters}
mkdir -p store types hooks utils

# Create essential files
touch types/product.ts
touch store/index.ts
touch store/hooks.ts
touch features/products/productsAPI.ts
touch features/filters/filtersSlice.ts
```

---

## 🏗️ First Working Feature (30 min)

### Create Types (5 min)

**`types/product.ts`:**
```typescript
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}
```

### Setup Redux Store (10 min)

**`store/index.ts`:**
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../features/products/productsAPI';
import filtersReducer from '../features/filters/filtersSlice';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**`store/hooks.ts`:**
```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

**`features/products/productsAPI.ts`:**
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/types/product';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
```

**`features/filters/filtersSlice.ts`:**
```typescript
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: { category: null, sortBy: 'default', searchQuery: '' },
  reducers: {
    setCategory: (state, action) => { state.category = action.payload; },
    setSortBy: (state, action) => { state.sortBy = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
  },
});

export const { setCategory, setSortBy, setSearchQuery } = filtersSlice.actions;
export default filtersSlice.reducer;
```

### Setup Expo Router (10 min)

**`app/_layout.tsx`:**
```typescript
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import '../global.css';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Details' }} />
      </Stack>
    </Provider>
  );
}
```

**`app/(tabs)/_layout.tsx`:**
```typescript
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#2563eb' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
```

### Create First Screen (5 min)

**`app/(tabs)/index.tsx`:**
```typescript
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetProductsQuery } from '@/features/products/productsAPI';

export default function HomeScreen() {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) return <View className="flex-1 justify-center items-center"><Text>Loading...</Text></View>;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white m-2 p-4 rounded-lg">
            <Text className="font-bold">{item.title}</Text>
            <Text className="text-blue-600">${item.price}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
```

**`app/(tabs)/search.tsx`:**
```typescript
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl">Search Screen</Text>
      </View>
    </SafeAreaView>
  );
}
```

---

## ✅ First Checkpoint

Run your app:
```bash
npx expo start
```

You should see:
- ✅ App loads without errors
- ✅ Products display from API
- ✅ Bottom tabs work (Products & Search)
- ✅ Basic styling with NativeWind

**🎉 If you see this, you're on track!**

---

## 📱 Testing on Your Phone (FASTEST METHOD)

### iOS:
1. Download **Expo Go** from App Store
2. Open Camera app
3. Scan QR code from terminal
4. App loads instantly! ⚡

### Android:
1. Download **Expo Go** from Play Store
2. Open Expo Go app
3. Scan QR code from terminal
4. App loads instantly! ⚡

**Pro Tip**: Keep Expo Go open while developing. Changes appear instantly!

---

## 🎨 Next: Build ProductCard (30 min)

**`components/products/ProductCard.tsx`:**
```typescript
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Product } from '@/types/product';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      className="bg-white rounded-xl shadow m-2 overflow-hidden"
    >
      <Image source={{ uri: product.image }} className="w-full h-48" contentFit="cover" />
      <View className="p-4">
        <Text className="font-semibold text-gray-900" numberOfLines={2}>
          {product.title}
        </Text>
        <Text className="text-xs text-gray-500 uppercase mt-1">{product.category}</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-xl font-bold text-blue-600">${product.price}</Text>
          <Text className="text-sm text-gray-600">★ {product.rating.rate}</Text>
        </View>
      </View>
    </Pressable>
  );
}
```

**Update `app/(tabs)/index.tsx`:**
```typescript
import { ProductCard } from '@/components/products/ProductCard';

// In FlatList renderItem:
renderItem={({ item }) => <ProductCard product={item} />}
numColumns={2}
```

---

## 🚨 Common Issues & Quick Fixes

### "Module not found"
```bash
npx expo start --clear
```

### "NativeWind not working"
```bash
# Restart with cache cleared
npx expo start --clear
```

### "Can't connect to device"
- Ensure phone and computer on same WiFi
- Use tunnel mode: `npx expo start --tunnel`

### "Build errors"
```bash
# Clean install
rm -rf node_modules
npm install
npx expo start --clear
```

---

## 📊 Daily Progress Tracker

### Day 1 (Today - Feb 6)
- [ ] Setup complete
- [ ] ProductCard working
- [ ] Products display from API
- [ ] Basic navigation works
- [ ] Tested on phone
- [ ] Git commit

### Day 2 (Feb 7)
- [ ] Filter modal complete
- [ ] Search functional
- [ ] Product details screen
- [ ] Pull-to-refresh
- [ ] Loading states
- [ ] All features work

### Day 3 (Feb 8)
- [ ] APK built
- [ ] Figma mockup
- [ ] Demo video
- [ ] Presentation
- [ ] Submitted

---

## 🎯 MVP Feature Checklist

**Must Have** (Core functionality):
- [ ] Products display from API
- [ ] Filter by category
- [ ] Sort by price
- [ ] Search products
- [ ] Product details page
- [ ] Works on physical device

**Should Have** (Polish):
- [ ] Pull-to-refresh
- [ ] Loading skeletons
- [ ] Error handling
- [ ] Smooth navigation

**Nice to Have** (If time permits):
- [ ] Animations
- [ ] Offline support
- [ ] Image caching
- [ ] Haptic feedback

---

## 💡 Pro Tips for Speed

### 1. Use Your Phone for Testing
- Instant feedback
- Real performance testing
- No simulator setup needed

### 2. Commit Often
```bash
git add .
git commit -m "feat: add ProductCard component"
```

### 3. Test After Each Feature
Don't write everything then test. Test incrementally!

### 4. Use Copilot Effectively
Write clear comments:
```typescript
// TODO: Create a filter modal with:
// - Category selection
// - Price range slider
// - Sort options
// - Apply and reset buttons
```

### 5. Start Simple, Add Complexity
Get basic version working first, then enhance.

---

## 🎬 Building APK (Quick Method)

### Day 3 - When you're ready:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build APK for testing
eas build --platform android --profile preview
```

This creates a download link you can share!

---

## 📝 Git Workflow

```bash
# Initial setup
git init
git add .
git commit -m "feat: initialize React Native Expo project"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-mobile.git
git push -u origin main

# Feature commits
git add .
git commit -m "feat(products): create ProductCard component"
git push

git add .
git commit -m "feat(api): integrate Fake Store API"
git push

# Keep committing!
```

---

## ⚡ Speed Checklist

Before moving to next feature, verify:
- [ ] Current feature works on device
- [ ] No console errors
- [ ] Code committed to Git
- [ ] You understand what you built

---

## 🆘 Emergency Resources

### Stuck on Setup?
- Expo docs: https://docs.expo.dev
- NativeWind docs: https://www.nativewind.dev

### Stuck on Redux?
- RTK Query: https://redux-toolkit.js.org/rtk-query/overview

### Stuck on Routing?
- Expo Router: https://docs.expo.dev/router/introduction

### Can't Build APK?
- EAS Build: https://docs.expo.dev/build/introduction

---

## 🎯 Success Metrics

By end of today, you should have:
- ✅ App running on your phone
- ✅ Products displaying from API
- ✅ Basic navigation working
- ✅ At least 3-5 Git commits

By end of tomorrow:
- ✅ All core features working
- ✅ UI looks professional
- ✅ Tested thoroughly
- ✅ 15+ Git commits

By submission day:
- ✅ APK built and downloadable
- ✅ Demo video recorded
- ✅ All links in README

---

## 🚀 You've Got This!

**Remember:**
1. **Start simple** - Get basic version working first
2. **Test constantly** - After every feature
3. **Commit often** - Every 30-60 minutes
4. **Stay focused** - Core features before polish
5. **Use your phone** - Fastest feedback loop

**Most important**: Don't overthink. Build, test, commit, repeat!

Now **STOP READING** and **START CODING**! ⚡

Good luck! 🍀
