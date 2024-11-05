import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import MetaAi from './src/MetaAi';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  return (
    <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}    >
      <MetaAi />  
      
      </PersistGate>

  </Provider>
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
