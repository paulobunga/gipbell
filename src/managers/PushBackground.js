import { RemoteMessage } from 'react-native-firebase';
import { Voximplant } from "react-native-voximplant";
import { loginWithSavedToken } from '../api/user';
import CallManager from './CallManager';

const client = Voximplant.getInstance();

export default async (message) => {
    await loginWithSavedToken();
    CallManager.init();
    client.handlePushNotification(message.data);
    return Promise.resolve();
}
