/**
 * Root Stack Navigator
 * Similar to Android Navigation Component
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {MainTabNavigator} from './MainTabNavigator';
import {CharacterDetailScreen} from '../screens/CharacterDetailScreen';
import {EpisodeDetailScreen} from '../screens/EpisodeDetailScreen';
import {LocationDetailScreen} from '../screens/LocationDetailScreen';
import {theme} from '@shared/theme';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.textInverse,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
          options={{title: 'Character Details'}}
        />
        <Stack.Screen
          name="EpisodeDetail"
          component={EpisodeDetailScreen}
          options={{title: 'Episode Details'}}
        />
        <Stack.Screen
          name="LocationDetail"
          component={LocationDetailScreen}
          options={{title: 'Location Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
