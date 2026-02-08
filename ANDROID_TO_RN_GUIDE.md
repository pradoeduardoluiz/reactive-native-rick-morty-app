# Android to React Native - Quick Reference Guide

## 🎯 Core Concepts Mapping

### 1. Components & UI

| Android | React Native |
|---------|--------------|
| `Activity` | Screen Component (functional) |
| `Fragment` | Screen/Component (functional) |
| `View` | `<View>` component |
| `TextView` | `<Text>` component |
| `ImageView` | `<Image>` component |
| `RecyclerView` | `<FlatList>` or `<SectionList>` |
| `ScrollView` | `<ScrollView>` |
| `Button` | `<TouchableOpacity>` + `<Text>` |
| `LinearLayout` | `<View style={{flexDirection: 'row/column'}}>` |
| `ConstraintLayout` | `<View>` with flexbox |
| `CardView` | Custom `<Card>` component (see components/) |

### 2. State Management

| Android | React Native |
|---------|--------------|
| `ViewModel` | Custom hooks (useCharacters) |
| `LiveData` | React Query (useQuery) |
| `StateFlow` | useState + useEffect |
| `MutableLiveData` | useState setter |
| `viewModelScope.launch` | useEffect with async |
| `SavedStateHandle` | Navigation params |

**Example:**
```kotlin
// Android ViewModel
class CharactersViewModel : ViewModel() {
    private val _characters = MutableLiveData<List<Character>>()
    val characters: LiveData<List<Character>> = _characters
    
    fun loadCharacters() {
        viewModelScope.launch {
            _characters.value = repository.getCharacters()
        }
    }
}
```

```typescript
// React Native Hook
const useCharacters = (page: number) => {
  return useQuery({
    queryKey: ['characters', page],
    queryFn: () => getCharactersUseCase.execute({page}),
  });
};

// Usage in Component
const CharactersScreen = () => {
  const {data, isLoading, error} = useCharacters(1);
  // data is automatically updated, like LiveData
};
```

### 3. Lifecycle

| Android | React Native |
|---------|--------------|
| `onCreate()` | Component mount / useEffect with [] |
| `onResume()` | useFocusEffect (React Navigation) |
| `onPause()` | useFocusEffect cleanup |
| `onDestroy()` | useEffect cleanup function |
| `onSaveInstanceState()` | Navigation state persistence |

**Example:**
```kotlin
// Android
override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    // Initial setup
}
```

```typescript
// React Native
useEffect(() => {
  // Runs on mount (like onCreate)
  console.log('Component mounted');
  
  return () => {
    // Runs on unmount (like onDestroy)
    console.log('Component unmounted');
  };
}, []); // Empty array = run only once
```

### 4. Dependency Injection

| Android (Hilt) | React Native (Context) |
|----------------|------------------------|
| `@HiltAndroidApp` | Provider component |
| `@Module` | Provider logic |
| `@Provides` | useMemo factory |
| `@Inject` | useContext hook |
| `@Singleton` | useMemo (no deps) |
| `@ViewModelInject` | Custom hook |

**Example:**
```kotlin
// Android Hilt
@Module
@InstallIn(SingletonComponent::class)
object RepositoryModule {
    @Provides
    @Singleton
    fun provideRepository(): CharacterRepository {
        return CharacterRepositoryImpl(dataSource)
    }
}

class CharactersViewModel @Inject constructor(
    private val repository: CharacterRepository
) : ViewModel()
```

```typescript
// React Native Context
export const RepositoryProvider = ({children}) => {
  const repositories = useMemo(() => ({
    characterRepository: new CharacterRepositoryImpl(dataSource)
  }), []); // Singleton

  return (
    <RepositoryContext.Provider value={repositories}>
      {children}
    </RepositoryContext.Provider>
  );
};

// Usage
const useCharacters = () => {
  const {characterRepository} = useRepositories(); // Like @Inject
  return useQuery(...);
};
```

### 5. Navigation

| Android Navigation | React Navigation |
|-------------------|------------------|
| `NavController` | useNavigation() |
| `navigate()` | navigation.navigate() |
| `popBackStack()` | navigation.goBack() |
| `NavGraph` | Stack.Navigator / Tab.Navigator |
| `<fragment>` | <Stack.Screen> |
| `arguments` | route.params |
| SafeArgs | TypeScript types |

**Example:**
```kotlin
// Android
navController.navigate(
    R.id.action_list_to_detail,
    bundleOf("characterId" to 1)
)
```

```typescript
// React Native
navigation.navigate('CharacterDetail', {
  character: characterData
});

// Receiving params
const route = useRoute<CharacterDetailRouteProp>();
const {character} = route.params;
```

### 6. Styling

| Android XML | React Native StyleSheet |
|-------------|------------------------|
| `android:layout_width` | `width` |
| `android:layout_height` | `height` |
| `android:padding` | `padding` |
| `android:margin` | `margin` |
| `android:background` | `backgroundColor` |
| `android:textColor` | `color` |
| `android:textSize` | `fontSize` |
| `android:fontFamily` | `fontFamily` |
| `@color/primary` | `theme.colors.primary` |
| `@dimen/spacing_md` | `theme.spacing.md` |
| `LinearLayout (vertical)` | `flexDirection: 'column'` |
| `LinearLayout (horizontal)` | `flexDirection: 'row'` |
| `layout_weight` | `flex: 1` |
| `gravity="center"` | `justifyContent: 'center'` |

**Example:**
```xml
<!-- Android -->
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="16dp"
    android:textSize="18sp"
    android:textColor="@color/primary" />
```

```typescript
// React Native
const styles = StyleSheet.create({
  text: {
    width: '100%',          // match_parent
    padding: 16,            // 16dp
    fontSize: 18,           // 18sp
    color: theme.colors.primary,
  },
});

<Text style={styles.text}>Hello</Text>
```

### 7. Lists & Adapters

| Android | React Native |
|---------|--------------|
| `RecyclerView` | `FlatList` |
| `RecyclerView.Adapter` | renderItem function |
| `ViewHolder` | Not needed |
| `DiffUtil` | Built-in (keyExtractor) |
| `onBindViewHolder()` | renderItem callback |
| `ListAdapter` | FlatList with data prop |

**Example:**
```kotlin
// Android RecyclerView
class CharacterAdapter : ListAdapter<Character, ViewHolder>(DiffCallback) {
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position))
    }
}
```

```typescript
// React Native FlatList
<FlatList
  data={characters}
  renderItem={({item}) => <CharacterCard character={item} />}
  keyExtractor={item => item.id.toString()}
/>
```

### 8. Networking

| Android | React Native |
|---------|--------------|
| `Retrofit` | Axios / Fetch |
| `@GET`, `@POST` | httpClient.get(), post() |
| `Call<T>` | Promise<T> |
| `Response<T>` | Axios response |
| `OkHttpClient` | AxiosHttpClient |
| `Interceptor` | axios.interceptors |
| Gson/Moshi | JSON.parse (native) |

**Example:**
```kotlin
// Android Retrofit
interface CharacterApi {
    @GET("character")
    suspend fun getCharacters(@Query("page") page: Int): Response<CharacterResponse>
}
```

```typescript
// React Native Axios
class CharacterRemoteDataSource {
  async getCharacters(page: number) {
    return this.httpClient.get<CharacterResponse>(`/character?page=${page}`);
  }
}
```

### 9. Data Persistence

| Android | React Native |
|---------|--------------|
| `Room Database` | AsyncStorage / Realm / SQLite |
| `SharedPreferences` | AsyncStorage |
| `@Entity` | TypeScript interface |
| `@Dao` | Data source class |
| `@Query` | Database methods |

### 10. Testing

| Android | React Native |
|---------|--------------|
| `JUnit` | Jest |
| `Mockito` | Jest mocks |
| `Espresso` | React Native Testing Library |
| `@Test` | test() or it() |
| `assertEquals()` | expect().toBe() |
| `verify()` | expect(mock).toHaveBeenCalled() |

**Example:**
```kotlin
// Android
@Test
fun `getCharacters should return characters`() = runTest {
    val result = useCase.execute()
    assertEquals(expected, result)
    verify(repository).getCharacters()
}
```

```typescript
// React Native
it('should return characters', async () => {
  const result = await useCase.execute();
  expect(result).toEqual(expected);
  expect(mockRepository.getCharacters).toHaveBeenCalled();
});
```

## 🔑 Key Differences

### 1. **No XML Layouts**
- Everything is code (JSX/TSX)
- Styling is done in JavaScript/TypeScript
- Flexbox is the default layout system

### 2. **Immutable Props**
- Props flow down (parent → child)
- Child can't modify props
- Use callbacks to communicate up

### 3. **Re-rendering**
- Components re-render when state/props change
- Similar to compose/recompose in Jetpack Compose
- Use React.memo, useMemo, useCallback for optimization

### 4. **No Activities**
- No activity lifecycle
- No intents
- Just components and navigation

### 5. **Asynchronous by Default**
- Most operations return Promises
- Use async/await (like Kotlin coroutines)
- No need for runOnUiThread

## 📚 Recommended Reading Order

1. **Components & JSX** → Similar to XML but in code
2. **Props & State** → Like passing data to fragments
3. **Hooks** → Like lifecycle + ViewModel combined
4. **Navigation** → Similar to Navigation Component
5. **Styling** → Flexbox (different from ConstraintLayout)
6. **Lists** → FlatList (simpler than RecyclerView)
7. **Network** → Axios (similar to Retrofit)

## 💡 Pro Tips for Android Developers

1. **Think in Components**: Everything is a reusable component, not XML + code
2. **Embrace Hooks**: They're like ViewModels + lifecycle combined
3. **Flexbox is King**: Learn flexbox, forget ConstraintLayout
4. **State Up, Props Down**: State lives high, flows down as props
5. **Async/Await**: Your coroutines knowledge transfers directly
6. **Repository Pattern**: 100% the same as Android
7. **Clean Architecture**: Identical to Android clean architecture

---

**Remember**: React Native is just another view layer. Your Android architecture knowledge (Clean Architecture, SOLID, Repository Pattern, Use Cases) transfers perfectly! 🚀
