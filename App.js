import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/store';

export default class App extends React.Component {
  render() {
      return (
          <Provider store={store}>
            <AppNavigator />
          </Provider>
      );
  }
}


