/**
 * Bottom Tab Navigator
 * Similar to Android BottomNavigationView
 */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './types';
import {CharactersScreen} from '../screens/CharactersScreen';
import {EpisodesScreen} from '../screens/EpisodesScreen';
import {LocationsScreen} from '../screens/LocationsScreen';
import {theme} from '@shared/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.textInverse,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
      }}>
      <Tab.Screen
        name="CharactersTab"
        component={CharactersScreen}
        options={{
          title: 'Characters',
          tabBarLabel: 'Characters',
        }}
      />
      <Tab.Screen
        name="EpisodesTab"
        component={EpisodesScreen}
        options={{
          title: 'Episodes',
          tabBarLabel: 'Episodes',
        }}
      />
      <Tab.Screen
        name="LocationsTab"
        component={LocationsScreen}
        options={{
          title: 'Locations',
          tabBarLabel: 'Locations',
        }}
      />
    </Tab.Navigator>
  );
};
