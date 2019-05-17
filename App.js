import React from 'react';
import LoginManager from "./src/managers/LoginManager";
import AppNavigator from './src/navigation/appNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { setTopLevelNavigator } from "./src/navigation/navigationService";

LoginManager.init();

export default () => {
    return (
      <Provider store={store}>
         <AppNavigator ref={setTopLevelNavigator}/>
      </Provider>
    );
}


