import React from 'react';
import AppNavigator from './src/navigation/appNavigator';
import { Provider } from 'react-redux';
import { store, persistor } from './src/storeConfig';

export default class App extends React.Component {
  render() {
      return (
          <Provider store={store}>
             <AppNavigator />
          </Provider>
      );
  }
}


