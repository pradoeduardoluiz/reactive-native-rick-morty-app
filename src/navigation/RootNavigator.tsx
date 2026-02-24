/**
 * Root Stack Navigator
 * Contains the main tab navigator and other stacked screens
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme';
import { TabNavigator } from './TabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Placeholder for Character Detail Screen
 * Will be replaced with actual implementation later
 */
function CharacterDetailScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Character Detail Screen</Text>
    </View>
  );
}

/**
 * Root Navigator Component
 */
export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.textInverse,
          headerTitleStyle: {
            fontWeight: theme.typography.fontWeight.bold,
          },
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
          options={{
            title: 'Character Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
