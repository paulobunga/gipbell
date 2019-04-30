import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import CodeScannerScreen from '../screens/CodeScannerScreen';
import headerStyle from '../styles/header';

const AppNavigator = createStackNavigator(
    {
      Start: {
        screen: StartScreen,
        navigationOptions: {
          header: null
        },
      },
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          title: 'Login'
        },
      },
      CodeScanner: {
        screen: CodeScannerScreen,
        navigationOptions: {
          title: 'Scan QR Code'
        }
      }
    },
    {
      initialRouteName: "Start",
      defaultNavigationOptions: {
        ...headerStyle
      }
    }
);

export default createAppContainer(AppNavigator);
