/**
 * Root App Component
 * Sets up all providers and navigation
 */
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppQueryClientProvider, RepositoryProvider} from './presentation/providers';
import {RootNavigator} from './presentation/navigation';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <AppQueryClientProvider>
          <RepositoryProvider>
            <RootNavigator />
          </RepositoryProvider>
        </AppQueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
