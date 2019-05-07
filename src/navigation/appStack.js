import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import CodeGeneratorScreen from '../screens/CodeGeneratorScreen';
import headerStyle from "../style/header";

export default createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
        },
        CodeGenerator: {
            screen: CodeGeneratorScreen,
            navigationOptions: ({ navigation }) => ({
                title: 'Generate your QR code',
            }),
        }
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            ...headerStyle
        }
    }
);
