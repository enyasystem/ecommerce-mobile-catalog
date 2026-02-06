# 🔧 Mobile Implementation Guide - React Native + Expo

## Complete Technical Guide for Building Your E-Commerce Mobile App

---

## 🎯 Project Timeline - URGENT

**Start Date**: January 19, 2026  
**Due Date**: February 8, 2026 (11:59 PM)  
**Today**: February 6, 2026  
**⏰ Time Remaining**: ~3 days (60-72 hours)

### Emergency Action Plan

#### TODAY (Feb 6) - Setup & Core (8-10 hours)
- [ ] Initialize Expo project (30 min)
- [ ] Configure NativeWind + TypeScript (30 min)
- [ ] Set up Redux Toolkit + RTK Query (1 hour)
- [ ] Create basic Expo Router structure (1 hour)
- [ ] Build ProductCard component (1.5 hours)
- [ ] Implement ProductList with FlatList (1.5 hours)
- [ ] API integration with Fake Store API (1.5 hours)
- [ ] Test on physical device (1 hour)

#### TOMORROW (Feb 7) - Features & Polish (8-10 hours)
- [ ] Filtering modal (category, price) (2 hours)
- [ ] Sorting functionality (1 hour)
- [ ] Search with debounce (1.5 hours)
- [ ] Infinite scroll implementation (1.5 hours)
- [ ] Product details screen (1.5 hours)
- [ ] Pull-to-refresh (30 min)
- [ ] Loading states & skeletons (1 hour)
- [ ] Error handling (1 hour)

#### FEB 8 - Final Push & Submit (6-8 hours)
- [ ] UI polish & animations (2 hours)
- [ ] Accessibility labels (1 hour)
- [ ] Build APK/IPA with EAS (1 hour)
- [ ] Create Figma mockup (1 hour)
- [ ] Record demo video (1 hour)
- [ ] Create presentation deck (1 hour)
- [ ] Update README with links (30 min)
- [ ] Submit for review (30 min)

---

## 📦 Initial Setup - Step by Step

### Step 1: Create Expo Project (5 minutes)

```bash
# Create new Expo app with TypeScript
npx create-expo-app@latest ecommerce-mobile-catalog --template blank-typescript

cd ecommerce-mobile-catalog

# Verify it works
npx expo start
```

Press `i` for iOS or `a` for Android, or scan QR with Expo Go app.

### Step 2: Install Core Dependencies (5 minutes)

```bash
# Core navigation and routing
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# State management
npm install @reduxjs/toolkit react-redux axios

# NativeWind (Tailwind for React Native)
npm install nativewind
npm install --save-dev tailwindcss

# Useful utilities
npm install react-native-reanimated react-native-gesture-handler
npx expo install expo-image
```

### Step 3: Configure NativeWind (5 minutes)

**Create `tailwind.config.js`:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
    },
  },
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
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin', // Must be last
    ],
  };
};
```

**Update `metro.config.js` (create if doesn't exist):**
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

### Step 4: Set Up Expo Router (10 minutes)

**Update `app.json`:**
```json
{
  "expo": {
    "name": "E-Commerce Catalog",
    "slug": "ecommerce-mobile-catalog",
    "scheme": "ecommerce-catalog",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourname.ecommerceapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourname.ecommerceapp"
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

**Create folder structure:**
```bash
mkdir -p app/{tabs,product}
mkdir -p components/{common,layout,products}
mkdir -p features/{products,filters}
mkdir -p store types hooks utils
```

**Create `app/_layout.tsx` (Root Layout):**
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
        <Stack.Screen 
          name="product/[id]" 
          options={{ 
            title: 'Product Details',
            headerBackTitle: 'Back'
          }} 
        />
      </Stack>
    </Provider>
  );
}
```

**Create `app/(tabs)/_layout.tsx` (Tab Layout):**
```typescript
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### Step 5: TypeScript Types (5 minutes)

**Create `types/product.ts`:**
```typescript
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface FilterState {
  category: string | null;
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  searchQuery: string;
}

export type SortOption = 
  | 'default'
  | 'price_asc' 
  | 'price_desc' 
  | 'rating' 
  | 'name';

export interface Category {
  id: string;
  name: string;
}
```

### Step 6: Redux Store Setup (10 minutes)

**Create `store/index.ts`:**
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

**Create `store/hooks.ts`:**
```typescript
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

**Create `features/products/productsAPI.ts`:**
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/types/product';

const BASE_URL = 'https://fakestoreapi.com';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { limit?: number; sort?: string }>({
      query: ({ limit = 20, sort = 'asc' }) => 
        `/products?limit=${limit}&sort=${sort}`,
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => '/products/categories',
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
```

**Create `features/filters/filtersSlice.ts`:**
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, SortOption } from '@/types/product';

const initialState: FilterState = {
  category: null,
  minPrice: 0,
  maxPrice: 1000,
  sortBy: 'default',
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setCategory,
  setPriceRange,
  setSortBy,
  setSearchQuery,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
```

---

## 🎨 Core Components Implementation

### 1. ProductCard Component

**Create `components/products/ProductCard.tsx`:**
```typescript
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const blurhash = 'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.';

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.id}`)}
      className="bg-white rounded-xl shadow-md m-2 overflow-hidden active:opacity-80"
      accessibilityLabel={`View details for ${product.title}`}
      accessibilityRole="button"
    >
      {/* Image */}
      <View className="w-full h-48 bg-gray-100">
        <Image
          source={{ uri: product.image }}
          placeholder={blurhash}
          contentFit="cover"
          transition={300}
          className="w-full h-full"
        />
      </View>

      {/* Content */}
      <View className="p-4">
        {/* Title */}
        <Text 
          className="text-base font-semibold text-gray-900 mb-2"
          numberOfLines={2}
        >
          {product.title}
        </Text>

        {/* Category */}
        <Text className="text-xs text-gray-500 uppercase mb-2">
          {product.category}
        </Text>

        {/* Price and Rating Row */}
        <View className="flex-row justify-between items-center">
          {/* Price */}
          <Text className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </Text>

          {/* Rating */}
          <View className="flex-row items-center">
            <Text className="text-yellow-500 mr-1">★</Text>
            <Text className="text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count})
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
```

### 2. ProductList Component

**Create `components/products/ProductList.tsx`:**
```typescript
import React, { useMemo } from 'react';
import { FlatList, View, Text, RefreshControl } from 'react-native';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { Product } from '@/types/product';
import { useAppSelector } from '@/store/hooks';

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  error?: string;
  onRefresh?: () => void;
  refreshing?: boolean;
  onEndReached?: () => void;
}

export function ProductList({
  products,
  loading,
  error,
  onRefresh,
  refreshing = false,
  onEndReached,
}: ProductListProps) {
  const filters = useAppSelector((state) => state.filters);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply category filter
    if (filters.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    // Apply price filter
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [products, filters]);

  // Loading state
  if (loading) {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item) => `skeleton-${item}`}
        renderItem={() => <ProductSkeleton />}
        numColumns={2}
        contentContainerClassName="p-2"
      />
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-red-500 text-lg text-center mb-4">{error}</Text>
        {onRefresh && (
          <Pressable
            onPress={onRefresh}
            className="bg-blue-600 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </Pressable>
        )}
      </View>
    );
  }

  // Empty state
  if (filteredProducts.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-8">
        <Text className="text-gray-500 text-lg text-center">
          No products found
        </Text>
        <Text className="text-gray-400 text-sm text-center mt-2">
          Try adjusting your filters
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard product={item} />}
      numColumns={2}
      contentContainerClassName="p-2"
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  );
}
```

### 3. ProductSkeleton Component

**Create `components/products/ProductSkeleton.tsx`:**
```typescript
import React from 'react';
import { View } from 'react-native';

export function ProductSkeleton() {
  return (
    <View className="bg-white rounded-xl shadow-md m-2 overflow-hidden">
      {/* Image skeleton */}
      <View className="w-full h-48 bg-gray-200 animate-pulse" />

      {/* Content skeleton */}
      <View className="p-4">
        {/* Title lines */}
        <View className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
        <View className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />

        {/* Category */}
        <View className="h-3 bg-gray-200 rounded w-20 mb-2 animate-pulse" />

        {/* Price and rating row */}
        <View className="flex-row justify-between items-center">
          <View className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
          <View className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        </View>
      </View>
    </View>
  );
}
```

### 4. Home Screen (Products List)

**Create `app/(tabs)/index.tsx`:**
```typescript
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductList } from '@/components/products/ProductList';
import { useGetProductsQuery } from '@/features/products/productsAPI';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const { data: products, isLoading, error, refetch } = useGetProductsQuery({
    limit: 20,
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 shadow-sm">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-900">Products</Text>
          
          <Pressable
            onPress={() => setShowFilters(true)}
            className="flex-row items-center bg-blue-50 px-4 py-2 rounded-lg"
            accessibilityLabel="Open filters"
            accessibilityRole="button"
          >
            <Ionicons name="filter" size={20} color="#2563eb" />
            <Text className="text-blue-600 ml-2 font-semibold">Filter</Text>
          </Pressable>
        </View>
      </View>

      {/* Product List */}
      <ProductList
        products={products || []}
        loading={isLoading}
        error={error ? 'Failed to load products' : undefined}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}
```

### 5. Product Details Screen

**Create `app/product/[id].tsx`:**
```typescript
import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { useGetProductByIdQuery } from '@/features/products/productsAPI';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductByIdQuery(
    Number(id)
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-500">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-red-500 mb-4">Product not found</Text>
        <Pressable
          onPress={() => router.back()}
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View className="w-full h-96 bg-gray-100">
          <Image
            source={{ uri: product.image }}
            contentFit="contain"
            className="w-full h-full"
          />
        </View>

        {/* Product Info */}
        <View className="p-6">
          {/* Category */}
          <Text className="text-sm text-gray-500 uppercase mb-2">
            {product.category}
          </Text>

          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            {product.title}
          </Text>

          {/* Price and Rating */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-3xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </Text>

            <View className="flex-row items-center">
              <Text className="text-yellow-500 text-xl mr-2">★</Text>
              <Text className="text-lg text-gray-700">
                {product.rating.rate}
              </Text>
              <Text className="text-sm text-gray-500 ml-1">
                ({product.rating.count} reviews)
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </Text>
            <Text className="text-gray-600 leading-6">
              {product.description}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3">
            <Pressable className="flex-1 bg-blue-600 py-4 rounded-lg items-center">
              <Text className="text-white font-bold text-lg">Add to Cart</Text>
            </Pressable>

            <Pressable className="bg-gray-100 px-6 py-4 rounded-lg items-center">
              <Ionicons name="heart-outline" size={24} color="#374151" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
```

---

## 🔍 Advanced Features Implementation

### 1. Search Screen with Debouncing

**Create `hooks/useDebounce.ts`:**
```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

**Create `app/(tabs)/search.tsx`:**
```typescript
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductList } from '@/components/products/ProductList';
import { useGetProductsQuery } from '@/features/products/productsAPI';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppDispatch } from '@/store/hooks';
import { setSearchQuery } from '@/features/filters/filtersSlice';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 300);
  const dispatch = useAppDispatch();

  const { data: products, isLoading } = useGetProductsQuery({ limit: 20 });

  // Update Redux when debounced value changes
  React.useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Search Bar */}
      <View className="bg-white px-4 py-3 shadow-sm">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search products..."
            className="flex-1 ml-3 text-base"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Results */}
      <ProductList
        products={products || []}
        loading={isLoading}
      />
    </SafeAreaView>
  );
}
```

### 2. Filter Modal

**Create `components/products/FilterModal.tsx`:**
```typescript
import React from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setCategory,
  setSortBy,
  resetFilters,
} from '@/features/filters/filtersSlice';
import { useGetCategoriesQuery } from '@/features/products/productsAPI';
import { SortOption } from '@/types/product';
import { Ionicons } from '@expo/vector-icons';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export function FilterModal({ visible, onClose }: FilterModalProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { data: categories } = useGetCategoriesQuery();

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name: A to Z' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-black/50">
        <View className="flex-1 mt-20 bg-white rounded-t-3xl">
          {/* Header */}
          <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
            <Text className="text-xl font-bold">Filters</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={28} color="#374151" />
            </Pressable>
          </View>

          <ScrollView className="flex-1 px-6 py-4">
            {/* Categories */}
            <View className="mb-6">
              <Text className="text-lg font-semibold mb-3">Category</Text>
              <Pressable
                onPress={() => dispatch(setCategory(null))}
                className={`p-4 rounded-lg mb-2 ${
                  !filters.category ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`font-medium ${
                    !filters.category ? 'text-blue-700' : 'text-gray-700'
                  }`}
                >
                  All Products
                </Text>
              </Pressable>

              {categories?.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => dispatch(setCategory(category))}
                  className={`p-4 rounded-lg mb-2 ${
                    filters.category === category ? 'bg-blue-100' : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`font-medium capitalize ${
                      filters.category === category
                        ? 'text-blue-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Sort Options */}
            <View className="mb-6">
              <Text className="text-lg font-semibold mb-3">Sort By</Text>
              {sortOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => dispatch(setSortBy(option.value))}
                  className={`p-4 rounded-lg mb-2 ${
                    filters.sortBy === option.value ? 'bg-blue-100' : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      filters.sortBy === option.value
                        ? 'text-blue-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View className="px-6 py-4 border-t border-gray-200 flex-row gap-3">
            <Pressable
              onPress={() => {
                dispatch(resetFilters());
                onClose();
              }}
              className="flex-1 bg-gray-100 py-4 rounded-lg items-center"
            >
              <Text className="text-gray-700 font-semibold">Reset</Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              className="flex-1 bg-blue-600 py-4 rounded-lg items-center"
            >
              <Text className="text-white font-semibold">Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
```

**Update `app/(tabs)/index.tsx` to use FilterModal:**
```typescript
// Add to imports
import { FilterModal } from '@/components/products/FilterModal';

// Inside component, add modal
{showFilters && (
  <FilterModal
    visible={showFilters}
    onClose={() => setShowFilters(false)}
  />
)}
```

---

## 🚀 Testing & Running

### Test on Physical Device (Recommended)

```bash
# Start dev server
npx expo start

# Scan QR code with:
# - Camera app (iOS)
# - Expo Go app (Android)
```

### Test on Simulator/Emulator

```bash
# iOS Simulator (Mac only)
npx expo start --ios

# Android Emulator
npx expo start --android
```

---

## 📱 Building for Production

### Setup EAS (Expo Application Services)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure
```

### Build APK for Android

```bash
# Build APK (for testing)
eas build --platform android --profile preview

# Build AAB (for Play Store)
eas build --platform android --profile production
```

### Build for iOS

```bash
# Build IPA
eas build --platform ios --profile production
```

**Create `eas.json`:**
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  }
}
```

---

## 🎯 Performance Optimization

### 1. Optimize FlatList

```typescript
// Add these props to FlatList
<FlatList
  data={products}
  // Performance props
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={6}
  windowSize={5}
  // ... other props
/>
```

### 2. Memoize Expensive Components

```typescript
import React from 'react';

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  // Component code
});
```

### 3. Use Expo Image for Better Performance

Already implemented - Expo Image provides:
- Automatic caching
- Blurhash placeholders
- Better memory management
- Progressive loading

---

## ♿ Accessibility Checklist

```typescript
// Add to all interactive elements
<Pressable
  accessibilityLabel="View product details"
  accessibilityRole="button"
  accessibilityHint="Opens product details screen"
>
  {/* Content */}
</Pressable>

// Add to text inputs
<TextInput
  accessibilityLabel="Search products"
  accessibilityHint="Type to search for products"
/>

// Add to images
<Image
  source={{ uri: product.image }}
  accessibilityLabel={`Image of ${product.title}`}
/>
```

---

## 🐛 Common Issues & Solutions

### Issue: "NativeWind styles not working"

```bash
# Clear cache and restart
npx expo start --clear
```

### Issue: "Redux store not working"

Check that Provider wraps app in `app/_layout.tsx`

### Issue: "Navigation not working"

Ensure all routes are in `app/` folder with proper naming

### Issue: "Images not loading"

Check network connectivity and API URL

---

## 📊 Project Completion Checklist

### Core Features (Must Have)
- [ ] Products display from API
- [ ] Filter by category
- [ ] Sort by price/rating
- [ ] Search functionality
- [ ] Product details screen
- [ ] Pull-to-refresh
- [ ] Loading states
- [ ] Error handling

### Polish (Should Have)
- [ ] Smooth animations
- [ ] Skeleton loaders
- [ ] Accessibility labels
- [ ] Responsive on different screen sizes
- [ ] Works on both iOS and Android

### Deployment (Must Have)
- [ ] APK built successfully
- [ ] App tested on physical device
- [ ] README updated with links
- [ ] Demo video recorded
- [ ] Figma mockup created

---

## 🎓 Git Workflow for Mobile

```bash
# Initial commit
git init
git add .
git commit -m "feat: initialize React Native Expo project"

# Feature commits
git commit -m "feat: set up Expo Router with tabs navigation"
git commit -m "feat(products): create ProductCard component"
git commit -m "feat(products): implement ProductList with FlatList"
git commit -m "feat(api): integrate Fake Store API with RTK Query"
git commit -m "feat(filters): add FilterModal with categories and sorting"
git commit -m "feat(search): implement search with debouncing"
git commit -m "feat(details): create product details screen"
git commit -m "style: apply NativeWind styling throughout app"
git commit -m "feat(a11y): add accessibility labels"
git commit -m "build: configure EAS for production builds"
```

---

## 🎬 Quick Win Tips

1. **Use Expo Go** - Fastest way to test (no simulators needed)
2. **Start with ProductCard** - Once it works, everything else is easier
3. **Test early, test often** - Check on device after each feature
4. **Don't over-engineer** - Simple working features > complex broken ones
5. **Copy-paste wisely** - Understand code before using it

---

**You've got this! 🚀 Now start building!**

Time to execute. Follow the setup steps, commit frequently, and ship something amazing!
