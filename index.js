import { registerRootComponent } from 'expo';
import { UserProvider } from './app/context/UserContext';
import AppNavigator from './app/navigation/AppNavigator';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}

registerRootComponent(App);