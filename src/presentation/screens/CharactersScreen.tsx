/**
 * Screen: Characters List
 * Similar to Android Fragment/Activity with RecyclerView
 */
import React, {useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../navigation/types';
import {useCharacters} from '../hooks';
import {Card, Text, Loading, ErrorView, StatusBadge} from '../components';
import {Character} from '@domain/entities';
import {theme} from '@shared/theme';

export const CharactersScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [page, setPage] = useState(1);
  const {data, isLoading, error, refetch} = useCharacters(page);

  if (isLoading) {
    return <Loading message="Loading characters..." />;
  }

  if (error) {
    return (
      <ErrorView
        message="Failed to load characters. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const renderCharacter = ({item}: {item: Character}) => (
    <Card
      onPress={() =>
        navigation.navigate('CharacterDetail', {character: item})
      }>
      <View style={styles.characterContainer}>
        <Image source={{uri: item.imageUrl}} style={styles.avatar} />
        <View style={styles.characterInfo}>
          <Text variant="h4" numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="bodySmall" color={theme.colors.textSecondary}>
            {item.species} • {item.gender}
          </Text>
          <View style={styles.statusContainer}>
            <StatusBadge status={item.status} />
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.results || []}
        renderItem={renderCharacter}
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
  characterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: theme.layout.avatarSize.md,
    height: theme.layout.avatarSize.md,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.md,
  },
  characterInfo: {
    flex: 1,
  },
  statusContainer: {
    marginTop: theme.spacing.xs,
  },
});
