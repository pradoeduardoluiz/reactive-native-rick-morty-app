/**
 * Screen: Episodes List
 */
import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../navigation/types';
import {useEpisodes} from '../hooks';
import {Card, Text, Loading, ErrorView} from '../components';
import {Episode} from '@domain/entities';
import {theme} from '@shared/theme';

export const EpisodesScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [page, setPage] = useState(1);
  const {data, isLoading, error, refetch} = useEpisodes(page);

  if (isLoading) {
    return <Loading message="Loading episodes..." />;
  }

  if (error) {
    return (
      <ErrorView
        message="Failed to load episodes. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const renderEpisode = ({item}: {item: Episode}) => (
    <Card onPress={() => navigation.navigate('EpisodeDetail', {episode: item})}>
      <Text variant="h4" numberOfLines={1}>
        {item.name}
      </Text>
      <Text variant="bodySmall" color={theme.colors.textSecondary}>
        {item.episode} • {item.airDate}
      </Text>
      <Text variant="caption" color={theme.colors.textTertiary}>
        {item.characterIds.length} characters
      </Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.results || []}
        renderItem={renderEpisode}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        onEndReached={() => {
          if (data?.info.next) {
            setPage(data.info.next);
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    paddingVertical: theme.spacing.sm,
  },
});
