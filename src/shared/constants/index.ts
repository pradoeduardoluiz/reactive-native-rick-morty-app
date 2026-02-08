/**
 * API Constants
 */
export const API_CONFIG = {
  BASE_URL: 'https://rickandmortyapi.com/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

/**
 * Navigation Routes
 */
export const ROUTES = {
  // Tab Navigator
  CHARACTERS_TAB: 'CharactersTab',
  EPISODES_TAB: 'EpisodesTab',
  LOCATIONS_TAB: 'LocationsTab',
  
  // Stack Navigator
  CHARACTER_DETAIL: 'CharacterDetail',
  EPISODE_DETAIL: 'EpisodeDetail',
  LOCATION_DETAIL: 'LocationDetail',
} as const;

/**
 * Query Keys
 * Similar to Android repository cache keys
 */
export const QUERY_KEYS = {
  CHARACTERS: 'characters',
  CHARACTER_DETAIL: 'character-detail',
  EPISODES: 'episodes',
  EPISODE_DETAIL: 'episode-detail',
  LOCATIONS: 'locations',
  LOCATION_DETAIL: 'location-detail',
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  PAGE_SIZE: 20,
  INITIAL_PAGE: 1,
} as const;
