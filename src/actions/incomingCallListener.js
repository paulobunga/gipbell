import { Voximplant } from 'react-native-voximplant';
import { setIncomingCall } from "./call";
import { navigate } from "../navigation/navigationService";

const client = Voximplant.getInstance();

client.on(Voximplant.ClientEvents.IncomingCall, async e => {
    const { store } = await import('../store');
    if (store.getState().call.currentCall || store.getState().call.incomingCall) {
        return e.call.decline();
    }
    store.dispatch(setIncomingCall({
        call: e.call,
        isVideo: e.video
    }));
    navigate('IncomingCall');
});
