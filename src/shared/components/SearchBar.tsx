/**
 * SearchBar Component
 * Text input with search icon, clear button and 500ms debounce
 */

import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { theme } from '../../theme';

const DEBOUNCE_MS = 500;

interface SearchBarProps {
  /** Current committed search value (controlled by parent) */
  value: string;
  /** Called with the debounced text after 500 ms of inactivity */
  onChangeText: (text: string) => void;
  /** Clears the search — parent should reset `value` to '' */
  onClear: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  editable?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search...',
  autoFocus = false,
  editable = true,
}: SearchBarProps) {
  // Local state drives the TextInput so typing feels instant
  const [localText, setLocalText] = useState(value);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local text when parent resets value (e.g. after clear)
  useEffect(() => {
    setLocalText(value);
  }, [value]);

  const handleChange = (text: string) => {
    setLocalText(text);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onChangeText(text);
    }, DEBOUNCE_MS);
  };

  const handleClear = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    setLocalText('');
    onClear();
  };

  const showClear = localText.length > 0;

  return (
    <View style={styles.container}>
      {/* Search icon */}
      <View style={styles.iconContainer} pointerEvents="none">
        <SearchIcon />
      </View>

      <TextInput
        style={styles.input}
        value={localText}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textLight}
        autoFocus={autoFocus}
        editable={editable}
        returnKeyType="search"
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel="Search input"
        accessibilityHint="Type to search characters"
      />

      {/* Clear button */}
      {showClear && (
        <Pressable
          style={({ pressed }) => [styles.clearButton, pressed && styles.clearButtonPressed]}
          onPress={handleClear}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ClearIcon />
        </Pressable>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG-free icons using Text glyphs for zero-dependency rendering
// ---------------------------------------------------------------------------

function SearchIcon() {
  return (
    <View style={styles.searchIconWrapper}>
      <View style={styles.searchIconCircle} />
      <View style={styles.searchIconHandle} />
    </View>
  );
}

function ClearIcon() {
  return (
    <View style={styles.clearIconWrapper}>
      <View style={[styles.clearIconBar, styles.clearIconBar1]} />
      <View style={[styles.clearIconBar, styles.clearIconBar2]} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const ICON_SIZE = 16;
const CLEAR_ICON_SIZE = 10;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.borderLight,
    paddingHorizontal: theme.spacing.sm,
    height: 44,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },

  // Search icon
  iconContainer: {
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconWrapper: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchIconHandle: {
    width: 2,
    height: 5,
    backgroundColor: theme.colors.textSecondary,
    borderRadius: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ rotate: '-45deg' }],
  },

  // Input
  input: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
    paddingVertical: 0,
    height: '100%',
  },

  // Clear button
  clearButton: {
    marginLeft: theme.spacing.xs,
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonPressed: {
    opacity: 0.6,
  },
  clearIconWrapper: {
    width: CLEAR_ICON_SIZE,
    height: CLEAR_ICON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIconBar: {
    position: 'absolute',
    width: CLEAR_ICON_SIZE,
    height: 2,
    backgroundColor: theme.colors.textSecondary,
    borderRadius: 1,
  },
  clearIconBar1: {
    transform: [{ rotate: '45deg' }],
  },
  clearIconBar2: {
    transform: [{ rotate: '-45deg' }],
  },
});
