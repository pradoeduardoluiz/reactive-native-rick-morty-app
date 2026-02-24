/**
 * FavoriteButton Component
 * Animated heart button that toggles a character in the favorites store
 */

import { useCallback, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useFavoritesStore } from '../../../shared/stores/favoritesStore';
import { theme } from '../../../theme';

type ButtonSize = 'sm' | 'md' | 'lg';

interface FavoriteButtonProps {
  characterId: number;
  size?: ButtonSize;
}

const SIZE_MAP: Record<ButtonSize, { container: number; font: number }> = {
  sm: { container: 28, font: 14 },
  md: { container: 40, font: 20 },
  lg: { container: 48, font: 24 },
};

export function FavoriteButton({ characterId, size = 'md' }: FavoriteButtonProps) {
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = useFavoritesStore(state => state.isFavorite(characterId));

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const prevFavorite = useRef(isFavorite);

  // Animate whenever isFavorite changes
  useEffect(() => {
    if (prevFavorite.current !== isFavorite) {
      prevFavorite.current = isFavorite;
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.4,
          useNativeDriver: true,
          speed: 40,
          bounciness: 12,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 30,
          bounciness: 6,
        }),
      ]).start();
    }
  }, [isFavorite, scaleAnim]);

  const handlePress = useCallback(() => {
    toggleFavorite(characterId);
  }, [toggleFavorite, characterId]);

  const { container, font } = SIZE_MAP[size];

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.container,
        {
          width: container,
          height: container,
          borderRadius: container / 2,
          backgroundColor: isFavorite ? '#fff0f0' : theme.colors.surface,
        },
        pressed && styles.pressed,
      ]}
    >
      <Animated.Text
        style={[
          styles.icon,
          { fontSize: font },
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {isFavorite ? '❤️' : '🤍'}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.93 }],
  },
  icon: {
    lineHeight: undefined,
  },
});
