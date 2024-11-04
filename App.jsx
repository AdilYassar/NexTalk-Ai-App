import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import MetaAi from './src/MetaAi';

const App = () => {
  return (
  <MetaAi />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
