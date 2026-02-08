/**
 * Screen: Locations List
 */
import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../navigation/types';
import {useLocations} from '../hooks';
import {Card, Text, Loading, ErrorView} from '../components';
import {LocationEntity} from '@domain/entities';
import {theme} from '@shared/theme';

export const LocationsScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [page, setPage] = useState(1);
  const {data, isLoading, error, refetch} = useLocations(page);

  if (isLoading) {
    return <Loading message="Loading locations..." />;
  }

  if (error) {
    return (
      <ErrorView
        message="Failed to load locations. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const renderLocation = ({item}: {item: LocationEntity}) => (
    <Card onPress={() => navigation.navigate('LocationDetail', {location: item})}>
      <Text variant="h4" numberOfLines={1}>
        {item.name}
      </Text>
      <Text variant="bodySmall" color={theme.colors.textSecondary}>
        {item.type} • {item.dimension}
      </Text>
      <Text variant="caption" color={theme.colors.textTertiary}>
        {item.residentIds.length} residents
      </Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.results || []}
        renderItem={renderLocation}
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
