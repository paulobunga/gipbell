import React from 'react';
import AppNavigator from './src/navigation/appNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/storeConfig';
import Loader from './src/components/Loader';

export default class App extends React.Component {
  render() {
      return (
          <Provider store={store}>
             <AppNavigator />
          </Provider>
      );
  }
}


