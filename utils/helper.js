import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'flashcard:noti';

function createNotification() {
	return {
		title: 'Time to do flashcard quiz',
		body: 'It is time to solve quiz!!!',
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		},
	};
}

export function setNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(
					({ status }) => {
						if (status === 'granted') {
							Notifications.cancelAllScheduledNotificationsAsync();

							let tomorrow = new Date();
							tomorrow.setDate(tomorrow.getDate() + 1);
							tomorrow.setHours(10);
							tomorrow.setMinutes(0);

							Notifications.scheduleLocalNotificationAsync(
								createNotification(),
								{
									time: tomorrow,
									repeat: 'day',
								}
							);

							AsyncStorage.setItem(
								NOTIFICATION_KEY,
								JSON.stringify(true)
							);
						}
					}
				);
			}
		});
}

export function clearNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
		Notifications.cancelAllScheduledNotificationsAsync()
	);
}
