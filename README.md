# 🛍️ Dynamic E-Commerce Product Catalog - Mobile App

> A production-ready React Native mobile application built with Expo, showcasing professional mobile development skills with modern tools and best practices.

[![Expo](https://img.shields.io/badge/Expo-51.0-000020.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.74-61dafb.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Testing on Device](#testing-on-device)
- [Deployment](#deployment)

## 🎯 Overview

A dynamic e-commerce product catalog mobile application that allows users to browse, filter, and sort products seamlessly. Built as part of Project Nexus using React Native with Expo, demonstrating advanced mobile development skills including API integration, state management, responsive design, and performance optimization.

**Live Demo:** [Add your Expo published URL here]

**Demo Video:** [Add your video link here]

**Figma Design:** [Add your Figma link here]

**GitHub Repository:** https://github.com/YOUR_USERNAME/ecommerce-mobile-catalog

## ✨ Features

### Core Functionality
- **Dynamic Product Display**: Real-time data fetching from backend API with loading states
- **Advanced Filtering**: Multi-criteria filtering by category, price range, brand, and ratings
- **Smart Sorting**: Sort by price (ascending/descending), popularity, newest arrivals, and ratings
- **Infinite Scroll**: Smooth infinite scrolling with pull-to-refresh
- **Search Functionality**: Real-time product search with debouncing
- **Product Details**: Detailed product view with image gallery and specifications

### Mobile-Specific Features
- **Pull-to-Refresh**: Native pull-to-refresh on product list
- **Smooth Animations**: Native animations using Reanimated
- **Haptic Feedback**: Tactile feedback on interactions
- **Optimized Images**: Progressive image loading with caching
- **Offline Support**: Basic offline functionality with cached data
- **Native Navigation**: Smooth transitions with Expo Router
- **Platform-Specific UI**: Adapts to iOS and Android design patterns

### User Experience
- **Loading States**: Skeleton screens for smooth loading experience
- **Error Handling**: User-friendly error messages with retry options
- **Accessibility**: VoiceOver/TalkBack support with proper labels
- **Performance**: Optimized FlatList rendering with virtualization
- **Gestures**: Native swipe gestures for navigation

## 🛠️ Tech Stack

### Core Technologies
- **React Native 0.74** - Cross-platform mobile framework
- **Expo SDK 51** - Development platform and toolchain
- **TypeScript 5.0+** - Type-safe JavaScript
- **Expo Router** - File-based routing for React Native
- **Redux Toolkit** - State management with RTK Query

### Styling & UI
- **NativeWind v4** - Tailwind CSS for React Native
- **React Native Reanimated** - Smooth 60fps animations
- **Expo Vector Icons** - Icon library

### Additional Libraries
- **Axios** - HTTP client for API requests
- **React Native Safe Area Context** - Handle device safe areas
- **Expo Image** - Optimized image component with caching
- **React Native Gesture Handler** - Native touch handling

### Development Tools
- **Expo Go** - Test on physical devices instantly
- **ESLint** - Code quality and linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

### Deployment
- **EAS Build** - Build native apps for iOS and Android
- **EAS Update** - Over-the-air updates
- **Expo Dev Client** - Development builds with native modules

## 🚀 Getting Started

### Prerequisites

**Required:**
- Node.js (v18.0.0 or higher)
- npm or yarn
- Git

**For testing on device:**
- Expo Go app on iOS or Android (recommended for quick testing)
- OR iOS Simulator (Mac only) / Android Studio (for emulators)

### Installation

1. **Install Expo CLI globally**
```bash
npm install -g expo-cli
# or
npm install -g eas-cli
```

2. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-mobile-catalog.git
cd ecommerce-mobile-catalog
```

3. **Install dependencies**
```bash
npm install
# or
yarn install
```

4. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
EXPO_PUBLIC_API_BASE_URL=https://fakestoreapi.com
EXPO_PUBLIC_API_KEY=your_api_key_here
```

5. **Start the development server**
```bash
npx expo start
```

This will open Expo Dev Tools in your browser. You can:
- Press `i` for iOS simulator
- Press `a` for Android emulator  
- Scan QR code with Expo Go app on your phone

### Available Scripts

```bash
npx expo start              # Start development server
npx expo start --clear      # Start with cache cleared
npx expo start --ios        # Start and open iOS simulator
npx expo start --android    # Start and open Android emulator

npm run android            # Build and run on Android
npm run ios               # Build and run on iOS
npm run web               # Run in web browser (testing only)

npm run lint              # Lint code
npm run type-check        # Check TypeScript types

npx expo prebuild         # Generate native code
eas build                 # Build production app
eas update               # Push OTA update
```

## 📁 Project Structure

```
ecommerce-mobile-catalog/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── index.tsx            # Home/Products screen
│   │   ├── search.tsx           # Search screen
│   │   └── profile.tsx          # Profile/Settings screen
│   ├── product/
│   │   └── [id].tsx             # Product details (dynamic route)
│   ├── _layout.tsx              # Root layout
│   └── +not-found.tsx           # 404 screen
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Loader.tsx
│   │   └── ErrorBoundary.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── TabBar.tsx
│   └── products/
│       ├── ProductCard.tsx
│       ├── ProductList.tsx
│       ├── FilterModal.tsx
│       ├── SortModal.tsx
│       └── ProductSkeleton.tsx
├── features/
│   ├── products/
│   │   ├── productsSlice.ts
│   │   └── productsAPI.ts
│   └── filters/
│       └── filtersSlice.ts
├── hooks/
│   ├── useDebounce.ts
│   ├── useInfiniteScroll.ts
│   └── useCache.ts
├── store/
│   ├── index.ts
│   └── rootReducer.ts
├── types/
│   ├── product.ts
│   ├── filter.ts
│   └── navigation.ts
├── utils/
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
├── assets/
│   ├── images/
│   └── fonts/
├── .env.example
├── .gitignore
├── app.json                     # Expo configuration
├── babel.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 💻 Development Guidelines

### Code Style

- **TypeScript**: All code must be type-safe
- **Naming Conventions**:
  - Components: PascalCase (e.g., `ProductCard.tsx`)
  - Screens: PascalCase (e.g., `index.tsx` in app folder)
  - Hooks: camelCase with "use" prefix (e.g., `useDebounce.ts`)
  - Constants: UPPER_SNAKE_CASE
  - Types/Interfaces: PascalCase

### Component Guidelines

```typescript
// Example component structure
import { View, Text, Pressable } from 'react-native';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onPress: (id: string) => void;
}

export function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable onPress={() => onPress(product.id)}>
      <View className="bg-white rounded-lg p-4 shadow">
        <Text className="text-lg font-semibold">{product.title}</Text>
      </View>
    </Pressable>
  );
}
```

### Expo Router Navigation

```typescript
// Navigate to product details
import { router } from 'expo-router';

router.push(`/product/${productId}`);

// Go back
router.back();

// Navigate to tab
router.push('/(tabs)/search');
```

### NativeWind Styling

```typescript
// Use Tailwind classes with className prop
<View className="flex-1 bg-gray-50 p-4">
  <Text className="text-2xl font-bold text-gray-900">
    Products
  </Text>
  <View className="flex-row justify-between items-center mt-4">
    <Text className="text-lg">Filter</Text>
  </View>
</View>

// Conditional classes
<View className={`p-4 ${selected ? 'bg-blue-100' : 'bg-white'}`}>
```

### Performance Best Practices

1. **Use FlatList for lists** - Never use ScrollView for large lists
2. **Optimize images** - Use Expo Image with blurhash
3. **Memoization** - Use React.memo for expensive components
4. **Debounce inputs** - Debounce search and filter inputs
5. **Virtual scrolling** - FlatList handles this automatically

## 📱 Testing on Device

### Method 1: Expo Go (Fastest for Development)

1. **Install Expo Go on your phone:**
   - iOS: Download from App Store
   - Android: Download from Play Store

2. **Start development server:**
```bash
npx expo start
```

3. **Scan QR code:**
   - iOS: Use Camera app to scan QR code
   - Android: Use Expo Go app to scan QR code

4. **Your app loads instantly!** 🎉

### Method 2: iOS Simulator (Mac only)

```bash
npx expo start --ios
```

### Method 3: Android Emulator

```bash
npx expo start --android
```

### Method 4: Development Build (for custom native code)

```bash
# Create development build
eas build --profile development --platform ios
eas build --profile development --platform android

# Install on device and use
npx expo start --dev-client
```

## 📡 API Documentation

### Using Fake Store API

**Base URL:** `https://fakestoreapi.com`

**Key Endpoints:**

```typescript
// Get all products
GET /products

// Get single product
GET /products/:id

// Get categories
GET /products/categories

// Get products by category
GET /products/category/:category

// Limit results
GET /products?limit=10

// Sort results
GET /products?sort=asc
```

### RTK Query Setup

```typescript
// src/features/products/productsAPI.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL 
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 20 }) => 
        `/products?limit=${limit}`,
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});
```

## 🚀 Deployment

### Building for Production

#### Method 1: EAS Build (Recommended)

```bash
# Login to Expo
eas login

# Configure project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both
eas build --platform all
```

#### Method 2: Local Build

```bash
# Android APK
eas build --platform android --local

# iOS (Mac only)
eas build --platform ios --local
```

### Publishing Updates (OTA)

```bash
# Publish update to production
eas update --branch production --message "Bug fixes"

# Publish to preview
eas update --branch preview
```

### App Store Submission

1. **Build production app:**
```bash
eas build --platform ios --profile production
```

2. **Download IPA file from Expo dashboard**

3. **Upload to App Store Connect using Transporter**

4. **Submit for review**

### Google Play Submission

1. **Build production app:**
```bash
eas build --platform android --profile production
```

2. **Download AAB file from Expo dashboard**

3. **Upload to Google Play Console**

4. **Submit for review**

## 🧪 Testing Strategy

### Manual Testing Checklist

- [ ] Products load from API correctly
- [ ] Filtering works (category, price)
- [ ] Sorting works (price asc/desc, rating)
- [ ] Search functionality works
- [ ] Infinite scroll loads more products
- [ ] Pull-to-refresh works
- [ ] Product details page displays correctly
- [ ] Navigation works smoothly
- [ ] App works on both iOS and Android
- [ ] Loading states display correctly
- [ ] Error states handled gracefully
- [ ] Images load and cache properly
- [ ] App works on different screen sizes

## 📈 Performance Targets

- **App Load Time**: < 3 seconds
- **List Scrolling**: 60 FPS
- **Image Loading**: Progressive with placeholders
- **API Response Time**: Cached after first load
- **App Size**: < 50 MB (Android APK)

## ♿ Accessibility

- [ ] All Pressable components have `accessibilityLabel`
- [ ] Screen readers work (VoiceOver/TalkBack)
- [ ] Color contrast meets standards
- [ ] Text is scalable
- [ ] Touch targets are at least 44x44 points

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

## 🙏 Acknowledgments

- Project Nexus - ProDev Frontend Program
- Expo team for amazing tools
- React Native community

---

**Built with ❤️ using React Native + Expo**

**Due Date**: February 8, 2026

**Project Type**: Mobile Application (React Native)
