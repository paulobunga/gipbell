import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import appStack from './appStack';
import authStack from './authStack';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: appStack,
        Auth: authStack,
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

export default createAppContainer(AppNavigator);
