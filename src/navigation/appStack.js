import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import CodeGeneratorScreen from '../screens/CodeGeneratorScreen';
import CodeScannerScreen from '../screens/CodeScannerScreen';
import ForeignProfileScreen from '../screens/ForeignProfileScreen';
import IncomingCallScreen from '../screens/IncomingCallScreen';
import ActiveCallScreen from '../screens/ActiveCallScreen';
import EditInfoScreen from '../screens/EditInfoScreen';
import ConnectionLoadingScreen from '../screens/ConnectionLoadingScreen';
import headerStyle from "../style/header";

export default createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
        },
        ConnectionLoading: {
            screen: ConnectionLoadingScreen,
            navigationOptions: {
                header: null
            }
        },
        CodeGenerator: {
            screen: CodeGeneratorScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Get your QR code',
            }),
        },
        CodeScanner: {
            screen: CodeScannerScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Scan QR code',
            }),
        },
        ForeignProfile: {
            screen: ForeignProfileScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Profile',
            }),
        },
        EditInfo: {
            screen: EditInfoScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Edit info',
            }),
        },
        IncomingCall: {
            screen: IncomingCallScreen,
            navigationOptions: {
                header: null
            }
        },
        ActiveCall: {
            screen: ActiveCallScreen,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            ...headerStyle
        }
    }
);
