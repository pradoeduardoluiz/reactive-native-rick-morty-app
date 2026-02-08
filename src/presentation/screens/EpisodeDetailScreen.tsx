/**
 * Screen: Episode Detail
 */
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import {Text} from '../components';
import {theme} from '@shared/theme';

type EpisodeDetailRouteProp = RouteProp<RootStackParamList, 'EpisodeDetail'>;

export const EpisodeDetailScreen: React.FC = () => {
  const route = useRoute<EpisodeDetailRouteProp>();
  const {episode} = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="h2" style={styles.title}>
          {episode.name}
        </Text>

        <View style={styles.section}>
          <Text variant="h4">Episode</Text>
          <Text variant="body">{episode.episode}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="h4">Air Date</Text>
          <Text variant="body">{episode.airDate}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="h4">Characters</Text>
          <Text variant="body" color={theme.colors.textSecondary}>
            {episode.characterIds.length} characters appeared in this episode
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
  },
  title: {
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
});
