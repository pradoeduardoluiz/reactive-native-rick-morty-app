# Rick and Morty App - React Native

A production-ready React Native application built with TypeScript, demonstrating clean architecture principles and best practices for Android developers transitioning to React Native.

## 🎯 Project Overview

This app uses the [Rick and Morty API](https://rickandmortyapi.com/documentation) to display characters, episodes, and locations. It's designed as a learning project for Android developers, implementing familiar patterns like:

- **Clean Architecture** (Domain/Data/Presentation layers)
- **SOLID Principles**
- **Dependency Injection** (Context-based DI)
- **Repository Pattern**
- **Use Cases/Interactors**
- **Mappers** (DTO → Domain entities)

## 📁 Folder Structure

```
rick-morty-app/
├── src/
│   ├── domain/                 # 🎯 Business Logic Layer
│   │   ├── entities/          # Domain models (Character, Episode, Location)
│   │   ├── repositories/      # Repository interfaces (contracts)
│   │   └── useCases/          # Business logic (GetCharacters, etc.)
│   │
│   ├── data/                   # 💾 Data Layer
│   │   ├── models/            # API DTOs (CharacterDto, etc.)
│   │   ├── mappers/           # DTO → Domain mappers
│   │   ├── repositories/      # Repository implementations
│   │   ├── dataSources/       # Remote data sources (API services)
│   │   └── http/              # HTTP client abstraction (Axios)
│   │
│   ├── presentation/           # 🎨 Presentation Layer
│   │   ├── navigation/        # Navigation setup (Stack + Tabs)
│   │   ├── screens/           # Screen components
│   │   ├── components/        # Reusable UI components
│   │   ├── hooks/             # Custom hooks (like ViewModels)
│   │   └── providers/         # Context providers (DI)
│   │
│   ├── shared/                 # 🛠️ Shared Utilities
│   │   ├── theme/             # Design system (colors, typography, spacing)
│   │   ├── constants/         # App constants
│   │   └── utils/             # Helper functions
│   │
│   └── App.tsx                 # Root component
│
├── __tests__/                  # 🧪 Unit Tests
│   ├── domain/useCases/       # Use case tests
│   └── data/mappers/          # Mapper tests
│
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Architecture for Android Developers

| Android | React Native (This App) |
|---------|------------------------|
| **Domain Layer** | **domain/** |
| Data classes | **entities/** (Character, Episode) |
| Repository interfaces | **repositories/** (CharacterRepository) |
| Use cases / Interactors | **useCases/** (GetCharactersUseCase) |
| **Data Layer** | **data/** |
| API models / DTOs | **models/** (CharacterDto) |
| Mappers | **mappers/** (CharacterMapper) |
| Repository implementations | **repositories/** (CharacterRepositoryImpl) |
| Retrofit services | **dataSources/** (CharacterRemoteDataSource) |
| OkHttp client | **http/** (AxiosHttpClient) |
| **Presentation Layer** | **presentation/** |
| Activities / Fragments | **screens/** (CharactersScreen) |
| ViewModels | **hooks/** (useCharacters) |
| RecyclerView adapters | FlatList with renderItem |
| Navigation Component | React Navigation (Stack + Tabs) |
| Hilt / Koin (DI) | **providers/** (RepositoryProvider) |
| **UI Resources** | **shared/** |
| colors.xml / themes.xml | **theme/colors.ts** |
| dimens.xml | **theme/spacing.ts** |
| strings.xml | **constants/** |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 8+
- React Native development environment set up
  - For iOS: Xcode, CocoaPods
  - For Android: Android Studio, JDK 11+

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd rick-morty-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only):**
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

### Development Scripts

```bash
# Start Metro bundler
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🧪 Testing

The project includes unit tests for:
- ✅ Domain use cases (business logic)
- ✅ Data mappers (DTO → Domain transformations)

Run tests:
```bash
npm test
```

View coverage:
```bash
npm run test:coverage
```

## 🎨 Design System

The app includes a minimal design system similar to Android's resource system:

### Theme Structure
- **Colors**: `src/shared/theme/colors.ts` (like colors.xml)
- **Spacing**: `src/shared/theme/spacing.ts` (like dimens.xml)
- **Typography**: `src/shared/theme/typography.ts` (like styles.xml)

### Usage Example
```typescript
import {theme} from '@shared/theme';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,        // 16
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
});
```

## 🔧 Key Technologies

| Technology | Purpose | Android Equivalent |
|------------|---------|-------------------|
| **TypeScript** | Type safety | Kotlin |
| **React Navigation** | Navigation | Navigation Component |
| **React Query** | Server state management | Repository + LiveData |
| **Axios** | HTTP client | Retrofit |
| **React Hooks** | State & lifecycle | ViewModels + Lifecycle |
| **Context API** | Dependency injection | Hilt / Koin |
| **Jest** | Unit testing | JUnit |
| **React Native Testing Library** | Component testing | Espresso |

## 📚 Key Concepts for Android Developers

### 1. **Functional Components + Hooks** (vs Activities/Fragments)
```typescript
// Android Activity/Fragment
class CharactersFragment : Fragment() {
    private val viewModel: CharactersViewModel by viewModels()
    
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        viewModel.characters.observe(viewLifecycleOwner) { characters ->
            // update UI
        }
    }
}

// React Native Functional Component
const CharactersScreen: React.FC = () => {
  const {data, isLoading} = useCharacters();
  
  if (isLoading) return <Loading />;
  
  return <FlatList data={data.results} ... />;
};
```

### 2. **Custom Hooks** (vs ViewModels)
```typescript
// Android ViewModel
class CharactersViewModel : ViewModel() {
    val characters = repository.getCharacters()
}

// React Native Custom Hook
const useCharacters = (page: number) => {
  return useQuery({
    queryKey: ['characters', page],
    queryFn: () => getCharactersUseCase.execute({page}),
  });
};
```

### 3. **Context Providers** (vs Hilt/Koin)
```typescript
// Android Hilt Module
@Module
@InstallIn(SingletonComponent::class)
object RepositoryModule {
    @Provides
    @Singleton
    fun provideCharacterRepository(): CharacterRepository = ...
}

// React Native Context Provider
export const RepositoryProvider: React.FC = ({children}) => {
  const repositories = useMemo(() => ({
    characterRepository: new CharacterRepositoryImpl(...),
  }), []);
  
  return <Context.Provider value={repositories}>{children}</Context.Provider>;
};
```

### 4. **FlatList** (vs RecyclerView)
```typescript
// Android RecyclerView + Adapter
recyclerView.adapter = CharacterAdapter(characters)

// React Native FlatList
<FlatList
  data={characters}
  renderItem={({item}) => <CharacterCard character={item} />}
  keyExtractor={item => item.id.toString()}
/>
```

## 🔗 API Reference

This app uses the [Rick and Morty API](https://rickandmortyapi.com/documentation):
- Base URL: `https://rickandmortyapi.com/api`
- Endpoints: `/character`, `/episode`, `/location`
- No authentication required

## 📖 Learning Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 Contributing

This is a learning project. Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project for learning purposes.

---

## 🎓 Next Steps for Learning

1. **Add offline support**: Implement local storage with AsyncStorage or Realm
2. **Add authentication**: Implement login flow with secure token storage
3. **Add more tests**: Component tests, integration tests, E2E tests
4. **Optimize performance**: Implement React.memo, useMemo, useCallback
5. **Add animations**: Use React Native Reanimated
6. **Improve accessibility**: Add screen reader support
7. **Add error boundary**: Implement error handling component
8. **Add deep linking**: Configure React Navigation for deep links

---

**Happy Coding! 🚀**

*Questions? Feel free to open an issue or reach out!*
