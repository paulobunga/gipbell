import React from 'react';
import AppNavigator from './src/navigation/appNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { setTopLevelNavigator } from "./src/navigation/navigationService";

export default class App extends React.Component {
  render() {
      return (
          <Provider store={store}>
             <AppNavigator ref={setTopLevelNavigator}/>
          </Provider>
      );
  }
}


