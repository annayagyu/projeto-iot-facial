import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent chama AppRegistry.registerComponent('main', () => App);
// ele garante que o app rode no Expo Go e em builds.
registerRootComponent(App);
