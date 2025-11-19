
import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/routes/index.route';
import { NavigationContainer } from '@react-navigation/native';

import './global.css';

export default function App() {
  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
