/**
 * Navigation types for type-safe navigation
 */

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Root Stack Navigator param list
 */
export type RootStackParamList = {
  Tabs: undefined;
  CharacterDetail: {
    characterId: number;
  };
};

/**
 * Bottom Tab Navigator param list
 */
export type TabParamList = {
  Characters: undefined;
  Favorites: undefined;
  About: undefined;
};

/**
 * Root Stack Navigator screen props
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

/**
 * Tab Navigator screen props with root stack navigation
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

/**
 * Declare global navigation types for TypeScript
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
