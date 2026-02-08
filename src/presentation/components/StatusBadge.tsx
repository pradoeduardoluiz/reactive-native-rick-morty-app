/**
 * Reusable UI Component: Character Status Badge
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CharacterStatus} from '@domain/entities';
import {Text} from './Text';
import {theme} from '@shared/theme';

interface StatusBadgeProps {
  status: CharacterStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({status}) => {
  const getStatusColor = () => {
    switch (status) {
      case CharacterStatus.ALIVE:
        return theme.colors.alive;
      case CharacterStatus.DEAD:
        return theme.colors.dead;
      default:
        return theme.colors.unknown;
    }
  };

  return (
    <View style={[styles.badge, {backgroundColor: getStatusColor()}]}>
      <Text variant="caption" color={theme.colors.textInverse}>
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
});
