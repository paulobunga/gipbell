import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import HelloScreen from '../screens/HelloScreen';
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import React from 'react';

const switchNavigator =  createSwitchNavigator(
    {
        SignIn: {
            screen: SignInScreen,
            navigationOptions: {
            }
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: {
            }
        }
    },
    {
        initialRouteName: "SignIn",
    }
);

export default createStackNavigator(
    {
        Hello: {
            screen: HelloScreen,
            navigationOptions: {
            }
        },
        Login: switchNavigator
    },
    {
        initialRouteName: "Hello",
        headerMode: 'none'
    }
)
