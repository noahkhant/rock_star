import { registerRootComponent } from 'expo';
import App from './_layout';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures your app is correctly initialized whether you load it in Expo Go or a native build.
registerRootComponent(App);
