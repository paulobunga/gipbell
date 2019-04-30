import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import headerStyle from "../styles/header";

export default createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: {
            ...headerStyle
        }
    }
);
