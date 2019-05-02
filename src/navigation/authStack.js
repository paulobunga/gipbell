import { createStackNavigator } from "react-navigation";
import HelloScreen from '../screens/HelloScreen';
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import headerStyle from "../style/header";

export default createStackNavigator(
    {
        Hello: {
            screen: HelloScreen,
            navigationOptions: {
                header: null
            }
        },
        SignIn: {
            screen: SignInScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Sign In',
            }),
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Create new account',
            }),
        }
    },
    {
        initialRouteName: "Hello",
        defaultNavigationOptions: {
            ...headerStyle
        }
    }
)
