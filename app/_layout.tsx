import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store/index';
import { selectCartCount } from '../features/cart/cartSlice';

function CustomTabBarContent({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const cartCount = useSelector(selectCartCount);

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.tabBar}>
          {/* Glass blur for frosted glass effect */}
          <BlurView intensity={40} tint="light" style={styles.tabBarBlur} pointerEvents="none" />
        <View style={styles.tabsLeft}>
          {state.routes.slice(0, 2).map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || options.title;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}
              >
                <MaterialCommunityIcons
                  name={options.tabBarIcon?.({ color: isFocused ? '#2b6cee' : '#000', size: 26 }).props.name}
                  size={26}
                  color={isFocused ? '#2b6cee' : '#000'}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isFocused && styles.tabLabelActive,
                  ]}
                >
                  {label}
                </Text>
                {isFocused && <View style={styles.indicatorDot} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Cart icon (center, elevated) */}
        <View style={styles.cartIconWrapper}>
          <View style={styles.cartOuter} />
          <TouchableOpacity
            onPress={() => {
              const route = state.routes[2];
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            }}
            style={styles.cartButton}
          >
            <MaterialCommunityIcons
              name="shopping"
              size={24}
              color="#fff"
            />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartCount > 9 ? '9+' : cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.tabsRight}>
          {state.routes.slice(3, 5).map((route: any, index: number) => {
            const actualIndex = index + 3;
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || options.title;
            const isFocused = state.index === actualIndex;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}
              >
                <MaterialCommunityIcons
                  name={options.tabBarIcon?.({ color: isFocused ? '#2b6cee' : '#000', size: 26 }).props.name}
                  size={26}
                  color={isFocused ? '#2b6cee' : '#000'}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    styles.tabLabelLight,
                    isFocused && styles.tabLabelActive,
                  ]}
                >
                  {label}
                </Text>
                {isFocused && <View style={styles.indicatorDot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function CustomTabBar(props: any) {
  return <CustomTabBarContent {...props} />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
        tabBar={CustomTabBar}
      >
        <Tabs.Screen
          name="(tabs)/index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tabs.Screen
          name="browse"
          options={{
            title: 'Browse',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="view-grid" size={24} color={color} />
            ),
            tabBarLabel: 'Browse',
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="shopping" size={24} color={color} />
            ),
            tabBarLabel: 'Cart',
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: 'Saved',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart" size={24} color={color} />
            ),
            tabBarLabel: 'Saved',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            ),
            tabBarLabel: 'Profile',
          }}
        />
      </Tabs>
    </Provider>
  );
}

const styles = StyleSheet.create<Record<string, any>>({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'box-none',
    paddingHorizontal: 16,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 72,
    borderRadius: 36,
    overflow: 'visible',
    position: 'relative',
    width: '100%',
    maxWidth: 360,
    paddingHorizontal: 6,
    backgroundColor: '#FFF6E0',
    borderWidth: 0,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 24,
  },
  tabsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    flex: 0,
    gap: 12,
  },
  tabsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    flex: 0,
    gap: 12,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    gap: 2,
    paddingHorizontal: 10,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  tabLabelLight: {
    color: '#000',
  },
  tabLabelActive: {
    color: '#2b6cee',
    fontWeight: '800',
  },
  indicatorDot: {
    position: 'absolute',
    bottom: 6,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#2b6cee',
  },
  cartIconWrapper: {
    position: 'absolute',
    width: 92,
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -46 }],
    zIndex: 20,
  },
  cartButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2b6cee',
    shadowColor: '#2b6cee',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    elevation: 25,
    borderWidth: 4,
    borderColor: '#050505',
  },
  cartOuter: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 6,
    borderColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#050505',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },

  tabBarBlur: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 36,
    zIndex: 1,
    overflow: 'hidden',
  },
  /* filter button removed */
});
