# Copilot Instructions - App-mobile

## Project Overview
**App-mobile** is a React Native application built with Expo 54, TypeScript, and file-based routing via expo-router. It's a cross-platform mobile app (Android, iOS, Web) using the new React Native architecture with React Compiler enabled.

## Architecture

### Navigation & Routing
- **File-based routing**: expo-router ~6.0.23 controls routing via directory structure (`app/` directory)
- **Tab layout**: `app/(tabs)/` folder represents grouped routes for tab-based navigation
- **Stack navigation**: Root layout (`app/_layout.tsx`) uses `<Stack>` from expo-router
- **Theme integration**: Navigation wrapped with `ThemeProvider` from `@react-navigation/native` for dark/light mode support

### Component Architecture
- **Reusable components** organized in `app-example/components/` (reference patterns):
  - `ThemedText`, `ThemedView` - Theme-aware wrappers with dark/light color support
  - Form components (inputs, buttons) with custom styling via React Native `StyleSheet`
  - Card components (e.g., `Tarjeta`, `MiniCard`) for consistent UI patterns
- **Inline components** in route files (see `app/(tabs)/index.tsx`) - small utilities like `Divider`, `Badge`, `Campo` defined locally
- **Hooks** in `app-example/hooks/` - `useColorScheme()`, `useThemeColor()` manage theme state pattern

### Styling & Design
- **React Native StyleSheet**: All styles via `StyleSheet.create()` with no external CSS framework
- **Theme-aware colors**: Use `useThemeColor()` hook to get colors that respect dark/light modes
- **Platform-specific files**: `.ios.ts`, `.web.ts` suffixes supported by expo for platform variations
  
## Development Workflow

### Get Started
```bash
npm install          # Install dependencies
npm start            # Start metro bundler + menu (choose platform)
npm run android      # Launch on Android emulator
npm run ios          # Launch on iOS simulator
npm run web          # Run web version
npm run lint         # Validate code with ESLint
npm run reset-project # Clear app/ and restore app-example (start over)
```

### Key Commands
- **Development**: `npm start` opens interactive menu - press `a`, `i`, `w` to run on Android/iOS/Web
- **Type checking**: TypeScript strict mode is enabled (`tsconfig.json`); no `any` types without reason
- **Linting**: ESLint with expo config; run before commits

## Code Patterns & Conventions

### Routing & Pages
```tsx
// File: app/(tabs)/index.tsx
// Routes automatically registered; folder structure = URL structure
// Use <Stack>, <Tabs> from expo-router for navigation groups
export default function Index() {
  return <View>Content</View>;
}
```

### Component Patterns
```tsx
// Reusable components accept style props and use StyleSheet
function Badge({ texto }: { texto: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { /* ... */ },
  badgeText: { /* ... */ },
});
```

### Theme-Aware Components
```tsx
// Inherit from app-example/components/ThemedText pattern
import { useThemeColor } from '@/hooks/use-theme-color';

// Access colors: useThemeColor({ light: '#000', dark: '#fff' }, 'text')
// Returns appropriate color for active theme
```

### State Management
- Use **React hooks**: `useState`, `useEffect` for local component state
- No Redux/Zustand yet; keep state simple and prop-drill for now
- Custom hooks in `hooks/` folder for reusable state logic

## Critical Files
- **`app/`** - Active development directory (routes & components)
- **`app-example/`** - Reference implementation; shows best practices
- **`app.json`** - Expo configuration; `newArchEnabled: true`, `reactCompiler: true` enabled
- **`tsconfig.json`** - Path alias `@/*` points to root; use `@/hooks`, `@/constants` for imports
- **`package.json`** - Expo 54, React 19.1, React Native 0.81.5 (new architecture)

## Dependencies
- **Navigation**: @react-navigation (v7), expo-router (v6)
- **Fonts**: expo-font, @expo/vector-icons
- **Animations**: react-native-reanimated, react-native-gesture-handler
- **Images**: expo-image
- **System**: expo-status-bar, expo-splash-screen, expo-constants

## Build & Deployment Notes
- **New React Architecture**: Enabled in app.json; use compatible packages only
- **Android**: Edge-to-edge enabled, adaptive icons configured
- **iOS**: Tablet support enabled
- **Web**: Static output; runs on `npm run web` (uses react-native-web)

## Common Pitfalls
1. **Cross-platform styling**: `StyleSheet` doesn't support all CSS features; test on target platforms
2. **Asset paths**: Use `require()` for static assets (e.g., `require('./assets/image.png')`)
3. **Navigation state**: Ensure all routes in `app/` follow proper expo-router file structure
4. **Typed routes**: `experiments.typedRoutes: true` in app.json enables type-safe route navigation

## When Uncertain
- Check `app-example/` for similar patterns before creating new components
- Reference Expo docs: https://docs.expo.dev/
- Use React Native docs for component APIs: https://reactnative.dev/
