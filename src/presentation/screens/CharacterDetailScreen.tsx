/**
 * Screen: Character Detail
 */
import React from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import {Text, StatusBadge, Loading} from '../components';
import {theme} from '@shared/theme';

type CharacterDetailRouteProp = RouteProp<RootStackParamList, 'CharacterDetail'>;

export const CharacterDetailScreen: React.FC = () => {
  const route = useRoute<CharacterDetailRouteProp>();
  const {character} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: character.imageUrl}} style={styles.image} />
      
      <View style={styles.content}>
        <Text variant="h2" style={styles.name}>
          {character.name}
        </Text>
        
        <View style={styles.statusContainer}>
          <StatusBadge status={character.status} />
        </View>

        <View style={styles.section}>
          <Text variant="h4">Information</Text>
          <View style={styles.infoRow}>
            <Text variant="bodySmall" color={theme.colors.textSecondary}>
              Species:
            </Text>
            <Text variant="body">{character.species}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="bodySmall" color={theme.colors.textSecondary}>
              Gender:
            </Text>
            <Text variant="body">{character.gender}</Text>
          </View>
          {character.type && (
            <View style={styles.infoRow}>
              <Text variant="bodySmall" color={theme.colors.textSecondary}>
                Type:
              </Text>
              <Text variant="body">{character.type}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text variant="h4">Origin</Text>
          <Text variant="body">{character.origin.name}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="h4">Last Known Location</Text>
          <Text variant="body">{character.location.name}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="h4">Episodes</Text>
          <Text variant="body" color={theme.colors.textSecondary}>
            Appeared in {character.episodeIds.length} episodes
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.md,
  },
  name: {
    marginBottom: theme.spacing.sm,
  },
  statusContainer: {
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
});
