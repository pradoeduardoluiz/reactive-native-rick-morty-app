# Rick and Morty App - Roadmap de Desenvolvimento

## 📋 Visão Geral do Projeto

App React Native + Expo consumindo a [Rick and Morty API](https://rickandmortyapi.com/documentation#rest) para listagem de personagens, detalhes e busca.

### Stack Tecnológica

- **Framework**: React Native com Expo SDK 51+
- **Linguagem**: TypeScript
- **Gerenciamento de Estado**: Zustand
- **Navegação**: React Navigation v6 (Tab + Stack)
- **Requisições HTTP**: Axios + SWR ou TanStack Query
- **Estilização**: StyleSheet nativo + tema customizado
- **Lint/Format**: ESLint + Prettier
- **Testes**: Jest + React Native Testing Library

### Arquitetura

**Feature-based Architecture** - Estrutura modular organizada por funcionalidades:

```
src/
├── features/          # Módulos por funcionalidade
│   ├── characters/    # Feature de personagens
│   ├── episodes/      # Feature de episódios (futuro)
│   └── locations/     # Feature de localizações (futuro)
├── shared/            # Código compartilhado
│   ├── components/    # Componentes reutilizáveis
│   ├── hooks/         # Custom hooks
│   ├── services/      # API clients
│   ├── stores/        # Zustand stores
│   ├── types/         # TypeScript types
│   └── utils/         # Funções utilitárias
├── navigation/        # Configuração de rotas
├── theme/             # Cores, tipografia, espaçamentos
└── App.tsx
```

---

## 🎯 Prompts de Desenvolvimento

Cada prompt representa uma etapa específica do desenvolvimento e deve resultar em **um commit**.

---

### **FASE 1: Setup Inicial e Configuração**

#### **Prompt 1: Inicialização do Projeto**

```
Crie um novo projeto Expo com TypeScript usando o template blank-typescript.
Configure o projeto com o nome "RickMortyApp".
Instale as dependências básicas:
- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs
- react-native-screens
- react-native-safe-area-context
- zustand
- axios
- @tanstack/react-query

Commit: "chore: initialize Expo project with TypeScript and core dependencies"
```

#### **Prompt 2: Configuração de Lint e Format**

```
Configure ESLint e Prettier para o projeto:
- Adicione .eslintrc.js com regras para React Native e TypeScript
- Configure prettier com single quotes e tab width de 2
- Adicione scripts no package.json: "lint", "format", "type-check"
- Crie .prettierrc.json
- Adicione .eslintignore e .prettierignore

Commit: "chore: setup ESLint and Prettier configuration"
```

#### **Prompt 3: Estrutura de Pastas**

```
Crie a estrutura de pastas base do projeto:
src/
├── features/
│   └── characters/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── stores/
│   ├── types/
│   └── utils/
├── navigation/
├── theme/
└── App.tsx

Adicione arquivos .gitkeep nas pastas vazias para commitar a estrutura.

Commit: "chore: create project folder structure"
```

---

### **FASE 2: Configuração Base**

#### **Prompt 4: Configuração do Tema**

```
Crie o sistema de tema em src/theme/:
- colors.ts: defina paleta de cores (primary, secondary, background, text, etc.)
- typography.ts: defina tamanhos e pesos de fonte
- spacing.ts: defina escala de espaçamentos (4, 8, 16, 24, 32, etc.)
- index.ts: exporte tudo do tema

Use cores que combinem com a temática Rick and Morty (verde, azul, roxo).

Commit: "feat: create theme system with colors, typography and spacing"
```

#### **Prompt 5: Types da API**

```
Crie os tipos TypeScript em src/shared/types/api.ts baseados na documentação:
- Character (id, name, status, species, type, gender, origin, location, image, episode, url, created)
- Location (id, name, type, dimension, residents, url, created)
- Episode (id, name, air_date, episode, characters, url, created)
- ApiResponse<T> (info: { count, pages, next, prev }, results: T[])
- ApiInfo (count, pages, next, prev)

Commit: "feat: add TypeScript types for Rick and Morty API"
```

#### **Prompt 6: Cliente da API**

```
Crie o serviço de API em src/shared/services/api.ts:
- Configure axios com baseURL: https://rickandmortyapi.com/api
- Crie instância do axios com timeout de 10s
- Adicione interceptors para logging (dev)
- Exporte a instância configurada

Commit: "feat: setup axios API client"
```

#### **Prompt 7: React Query Provider**

```
Configure React Query em src/shared/services/queryClient.ts:
- Crie QueryClient com configurações otimizadas
- staleTime: 5 minutos
- cacheTime: 10 minutos
- retry: 2

Wrappe o App com QueryClientProvider em App.tsx.

Commit: "feat: configure React Query for data fetching"
```

---

### **FASE 3: Navegação**

#### **Prompt 8: Navegação Base**

```
Configure a navegação base em src/navigation/:
- types.ts: defina tipos para RootStackParamList e TabParamList
- RootNavigator.tsx: crie o stack navigator principal
- TabNavigator.tsx: crie bottom tabs com 3 abas (Characters, Favorites, About)
- Use ícones placeholder por enquanto

Em App.tsx, wrappe com NavigationContainer.

Commit: "feat: setup navigation structure with tabs and stack"
```

#### **Prompt 9: Telas Placeholder**

```
Crie telas placeholder em src/features/characters/screens/:
- CharactersListScreen.tsx: exiba "Characters List"
- CharacterDetailScreen.tsx: exiba "Character Detail"

Crie telas simples para outras tabs:
- src/features/favorites/screens/FavoritesScreen.tsx
- src/features/about/screens/AboutScreen.tsx

Conecte todas as telas na navegação.

Commit: "feat: create placeholder screens for navigation"
```

---

### **FASE 4: Feature de Personagens - Listagem**

#### **Prompt 10: API Service para Characters**

```
Crie src/features/characters/services/charactersApi.ts:
- getCharacters(page: number): Promise<ApiResponse<Character>>
- getCharacterById(id: number): Promise<Character>
- searchCharacters(name: string, page: number): Promise<ApiResponse<Character>>

Use a instância do axios configurada anteriormente.

Commit: "feat(characters): create characters API service"
```

#### **Prompt 11: Custom Hook para Listagem**

```
Crie src/features/characters/hooks/useCharacters.ts:
- Use React Query (useQuery)
- Implemente paginação
- Retorne { data, isLoading, error, fetchNextPage, hasNextPage }

Commit: "feat(characters): create useCharacters hook with pagination"
```

#### **Prompt 12: Character Card Component**

```
Crie src/features/characters/components/CharacterCard.tsx:
- Componente que exibe card do personagem
- Props: character, onPress
- Mostre: imagem, nome, espécie, status (com indicador de cor)
- Use o tema configurado
- Componente otimizado com React.memo

Commit: "feat(characters): create CharacterCard component"
```

#### **Prompt 13: Loading e Empty States**

```
Crie componentes compartilhados em src/shared/components/:
- LoadingSpinner.tsx: spinner customizado
- EmptyState.tsx: estado vazio com mensagem e ícone
- ErrorState.tsx: estado de erro com retry

Commit: "feat(shared): create loading, empty and error state components"
```

#### **Prompt 14: Lista de Personagens**

```
Implemente CharactersListScreen.tsx completo:
- Use FlatList com useCharacters hook
- Implemente paginação infinita (onEndReached)
- Mostre loading, empty e error states
- Use CharacterCard para cada item
- Implemente pull-to-refresh
- Adicione header com título

Commit: "feat(characters): implement characters list with infinite scroll"
```

---

### **FASE 5: Feature de Personagens - Detalhes**

#### **Prompt 15: Custom Hook para Detalhes**

```
Crie src/features/characters/hooks/useCharacter.ts:
- Use React Query (useQuery)
- Receba characterId como parâmetro
- Retorne { data, isLoading, error }

Commit: "feat(characters): create useCharacter hook for details"
```

#### **Prompt 16: Tela de Detalhes**

```
Implemente CharacterDetailScreen.tsx completo:
- Receba characterId via route params
- Exiba todas as informações do personagem:
  - Imagem grande no topo
  - Nome, status, espécie, gênero
  - Origem e localização atual
  - Lista de episódios (primeiros 5)
- Use ScrollView
- Implemente loading e error states
- Adicione botão de "favorite" (UI apenas, funcionalidade depois)

Commit: "feat(characters): implement character detail screen"
```

---

### **FASE 6: Busca de Personagens**

#### **Prompt 17: Search Bar Component**

```
Crie src/shared/components/SearchBar.tsx:
- Input de busca com ícone
- Props: value, onChangeText, placeholder, onClear
- Botão para limpar busca
- Use debounce de 500ms
- Estilize com o tema

Commit: "feat(shared): create SearchBar component with debounce"
```

#### **Prompt 18: Custom Hook para Busca**

```
Crie src/features/characters/hooks/useSearchCharacters.ts:
- Use React Query com searchQuery como key
- Implemente busca com paginação
- Desabilite busca se query estiver vazia

Commit: "feat(characters): create useSearchCharacters hook"
```

#### **Prompt 19: Implementar Busca na Lista**

```
Atualize CharactersListScreen.tsx:
- Adicione SearchBar no header
- Alterne entre useCharacters e useSearchCharacters baseado na busca
- Mostre estado "Nenhum resultado encontrado" quando aplicável
- Limpe busca e volte para lista completa

Commit: "feat(characters): implement search functionality in characters list"
```

---

### **FASE 7: Feature de Favoritos**

#### **Prompt 20: Zustand Store para Favoritos**

```
Crie src/shared/stores/favoritesStore.ts:
- Estado: favorites (array de character ids)
- Actions: addFavorite, removeFavorite, toggleFavorite, isFavorite
- Persista no AsyncStorage (use zustand/middleware)

Commit: "feat(favorites): create favorites store with Zustand and persistence"
```

#### **Prompt 21: Botão de Favoritar**

```
Crie src/features/characters/components/FavoriteButton.tsx:
- Botão de coração (filled/outline)
- Use favoritesStore
- Props: characterId, size
- Animação ao favoritar (opcional: usar Animated API)

Integre na CharacterCard e CharacterDetailScreen.

Commit: "feat(favorites): create favorite button component"
```

#### **Prompt 22: Tela de Favoritos**

```
Implemente src/features/favorites/screens/FavoritesScreen.tsx:
- Busque personagens favoritos usando seus IDs
- Use Promise.all ou React Query com múltiplas queries
- Reuse CharacterCard
- Mostre empty state quando não houver favoritos
- Implemente remoção de favoritos

Commit: "feat(favorites): implement favorites screen"
```

---

### **FASE 8: Melhorias e Polimento**

#### **Prompt 23: Tela About**

```
Implemente src/features/about/screens/AboutScreen.tsx:
- Informações sobre o app
- Versão do app (use expo-constants)
- Link para API documentation
- Créditos
- Design simples e elegante

Commit: "feat(about): implement about screen"
```

#### **Prompt 24: Ícones da Tab Bar**

```
Instale e configure @expo/vector-icons:
- Adicione ícones apropriados para cada tab
- Characters: pessoas
- Favorites: coração
- About: informação
- Configure cores ativa/inativa

Commit: "feat(navigation): add icons to bottom tab bar"
```

#### **Prompt 25: Splash Screen**

```
Configure splash screen customizada:
- Use expo-splash-screen
- Crie imagem de splash temática Rick and Morty
- Configure app.json com splash screen
- Implemente SplashScreen.preventAutoHideAsync()

Commit: "feat: configure custom splash screen"
```

#### **Prompt 26: App Icon**

```
Crie e configure o ícone do app:
- Design de ícone temático Rick and Morty
- Configure no app.json (icon, adaptive icon)
- Gere assets para iOS e Android

Commit: "feat: add custom app icon"
```

#### **Prompt 27: Tratamento de Erros Global**

```
Implemente error boundary:
- Crie src/shared/components/ErrorBoundary.tsx
- Capture erros do React
- Exiba tela de erro amigável
- Wrappe o app no App.tsx

Commit: "feat(shared): implement error boundary"
```

#### **Prompt 28: Performance Optimization**

```
Otimize performance:
- Adicione React.memo em componentes pesados
- Use useCallback para funções em props
- Implemente shouldComponentUpdate onde necessário
- Configure optimizeListRender em FlatList

Commit: "perf: optimize component rendering"
```

---

### **FASE 9: Testes (Opcional)**

#### **Prompt 29: Setup de Testes**

```
Configure ambiente de testes:
- Instale @testing-library/react-native
- Configure jest.config.js
- Crie setupTests.ts
- Adicione scripts de teste no package.json

Commit: "test: setup testing environment"
```

#### **Prompt 30: Testes de Componentes**

```
Crie testes para componentes principais:
- CharacterCard.test.tsx
- SearchBar.test.tsx
- FavoriteButton.test.tsx
- Use snapshots e testes de interação

Commit: "test: add component tests"
```

#### **Prompt 31: Testes de Hooks**

```
Crie testes para hooks customizados:
- useCharacters.test.ts
- useSearchCharacters.test.ts
- Mock React Query e axios

Commit: "test: add custom hooks tests"
```

---

### **FASE 10: Documentação**

#### **Prompt 32: README**

```
Crie README.md completo com:
- Descrição do projeto
- Screenshots
- Features implementadas
- Stack tecnológica
- Como rodar o projeto
- Estrutura de pastas
- Scripts disponíveis
- Roadmap futuro

Commit: "docs: create comprehensive README"
```

#### **Prompt 33: Documentação de Código**

```
Adicione JSDoc nos principais arquivos:
- Serviços de API
- Custom hooks
- Stores
- Componentes compartilhados

Commit: "docs: add JSDoc comments to core modules"
```

---

## 🚀 Como Usar Este Roadmap

1. **Execute os prompts sequencialmente** - cada um foi projetado para se basear no anterior
2. **Um commit por prompt** - mantenha histórico granular para referência futura
3. **Teste após cada fase** - valide que tudo funciona antes de avançar
4. **Adapte conforme necessário** - este é um guia, ajuste à sua necessidade

---

## 📚 Recursos de Referência

- [Rick and Morty API Docs](https://rickandmortyapi.com/documentation)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [TanStack Query Docs](https://tanstack.com/query/latest)

---

## 🎯 Features Futuras (Expansão)

Após completar o roadmap básico, considere:

- Filtros avançados (por status, espécie, gênero)
- Feature de Episodes
- Feature de Locations
- Modo offline com cache persistente
- Animações avançadas (Reanimated)
- Testes E2E (Detox)
- CI/CD pipeline
- Dark mode
- Internacionalização (i18n)
- Analytics (Firebase/Amplitude)

---

**Bom estudo e desenvolvimento! 🚀👨‍💻**
