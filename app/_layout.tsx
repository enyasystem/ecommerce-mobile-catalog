import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomTabBarContent({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.tabBar}>
          {/* Glass blur + subtle gradient overlay for frosted look */}
          <BlurView intensity={50} tint="dark" style={styles.tabBarBlur} pointerEvents="none" />
          <LinearGradient
            colors={["rgba(255,255,255,0.02)", "rgba(255,255,255,0.01)"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.tabBarGradient}
            pointerEvents="none"
          />
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
                  name={options.tabBarIcon?.({ color: isFocused ? '#2b6cee' : 'rgba(255, 255, 255, 0.4)', size: 24 }).props.name}
                  size={24}
                  color={isFocused ? '#2b6cee' : 'rgba(255, 255, 255, 0.4)'}
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
                  name={options.tabBarIcon?.({ color: isFocused ? '#2b6cee' : 'rgba(100, 100, 120, 0.5)', size: 24 }).props.name}
                  size={24}
                  color={isFocused ? '#2b6cee' : 'rgba(100, 100, 120, 0.5)'}
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
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
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
    fontSize: 9,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  tabLabelLight: {
    color: 'rgba(100, 100, 120, 0.5)',
  },
  tabLabelActive: {
    color: '#2b6cee',
    fontWeight: '700',
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

  tabBarGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 36,
    zIndex: 1,
    opacity: 0.9,
  },
  tabBarBlur: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 36,
    zIndex: 0,
    overflow: 'hidden',
  },
  /* filter button removed */
});
