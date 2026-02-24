/**
 * Bottom Tab Navigator
 * Main navigation with 3 tabs: Characters, Favorites, About
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

/**
 * Placeholder screens - will be replaced with actual screens later
 */
function CharactersScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Characters Screen</Text>
    </View>
  );
}

function FavoritesScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Favorites Screen</Text>
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>About Screen</Text>
    </View>
  );
}

/**
 * Tab Navigator Component
 */
export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.textInverse,
        headerTitleStyle: {
          fontWeight: theme.typography.fontWeight.bold,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          height: theme.layout.tabBarHeight,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
        },
      }}
    >
      <Tab.Screen
        name="Characters"
        component={CharactersScreen}
        options={{
          title: 'Characters',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>👥</Text>,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>❤️</Text>,
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>ℹ️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  placeholderText: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
});
