/**/**



























export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';import {StackNavigationProp} from '@react-navigation/stack';// Navigation prop types for screens};  LocationsTab: undefined;  EpisodesTab: undefined;  CharactersTab: undefined;export type MainTabParamList = {// Bottom Tab Navigator};  LocationDetail: {location: LocationEntity};  EpisodeDetail: {episode: Episode};  CharacterDetail: {character: Character};  Main: undefined;export type RootStackParamList = {// Root Stack Navigatorimport {Character, Episode, LocationEntity} from '@domain/entities'; */ * Type-safe navigation params * Navigation Types * Navigation Types
 * Similar to Android Navigation component SafeArgs
 */
import {ROUTES} from '@shared/constants';

/**
 * Root Stack Navigator Params
 */
export type RootStackParamList = {
  [ROUTES.CHARACTER_DETAIL]: {characterId: number};
  [ROUTES.EPISODE_DETAIL]: {episodeId: number};
  [ROUTES.LOCATION_DETAIL]: {locationId: number};
};

/**
 * Tab Navigator Params
 */
export type TabParamList = {
  [ROUTES.CHARACTERS_TAB]: undefined;
  [ROUTES.EPISODES_TAB]: undefined;
  [ROUTES.LOCATIONS_TAB]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
