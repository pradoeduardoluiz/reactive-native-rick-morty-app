/**
 * Screen: Location Detail
 */
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import {Text} from '../components';
import {theme} from '@shared/theme';

type LocationDetailRouteProp = RouteProp<RootStackParamList, 'LocationDetail'>;

export const LocationDetailScreen: React.FC = () => {
  const route = useRoute<LocationDetailRouteProp>();
  const {location} = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="h2" style={styles.title}>
          {location.name}
        </Text>

        <View style={styles.section}>
          <Text variant="h4">Type</Text>
          <Text variant="body">{location.type}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="h4">Dimension</Text>
          <Text variant="body">{location.dimension}</Text>
        </View>

        <View style={styles.section}>
          <Text variant="h4">Residents</Text>
          <Text variant="body" color={theme.colors.textSecondary}>
            {location.residentIds.length} residents live here
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
