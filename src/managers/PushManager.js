import React from 'react';

import firebase from 'react-native-firebase';
import { Notification } from 'react-native-firebase';

class PushManager {
    pushToken = null;

    constructor() { }

    init() {
        firebase.messaging().getToken()
            .then(token => {
                this.pushToken = token;
            });

        const channel = new firebase.notifications.Android.Channel(
                'gipbell_channel_id',
                'Incoming call channel',
                firebase.notifications.Android.Importance.Max
            )
            .setDescription('Incoming call received')
            .enableVibration(false)
            .enableLights(true)
            .setLockScreenVisibility(firebase.notifications.Android.Visibility.Public);
        firebase.notifications().android.createChannel(channel);
    }

    getPushToken() {
        return this.pushToken;
    }

    showLocalNotification() {
        const notification = new firebase.notifications.Notification().setSound('muted.mp3');
        notification.android.setChannelId('gipbell_channel_id');
        notification.setNotificationId('notificationId');
        notification.setTitle('Incoming call');
        notification.android.setSmallIcon('notification_icon');
        firebase.notifications().displayNotification(notification);
    }

    removeDeliveredNotification() {
        firebase.notifications().removeAllDeliveredNotifications();
    }
}

const pushManager = new PushManager();

export default pushManager;
