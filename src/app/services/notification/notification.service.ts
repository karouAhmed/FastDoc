import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private db: AngularFirestore) {
    }

    getAllNotificationsClient(userID) {
        // tslint:disable-next-line:max-line-length
        const notificationCollection = this.db.collection('notifications', ref => ref.where('userID', '==', userID).where('type', '==', 'C'));
        return notificationCollection.snapshotChanges().pipe(map(action => {
            return action.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        }));
    }

    getUnseenNotificationsClient(userID) {
        // tslint:disable-next-line:max-line-length
        const notificationCollection = this.db.collection('notifications', ref => ref.where('userID', '==', userID).where('vu', '==', false).where('type', '==', 'C'));
        return notificationCollection.valueChanges();
    }

    getAllNotificationsPrestataire(userID) {
        // tslint:disable-next-line:max-line-length
        const notificationCollection = this.db.collection('notifications', ref => ref.where('userID', '==', userID).where('type', '==', 'P'));
        return notificationCollection.snapshotChanges().pipe(map(action => {
            return action.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        }));
    }

    getUnseenNotificationsPrestataire(userID) {
        // tslint:disable-next-line:max-line-length
        const notificationCollection = this.db.collection('notifications', ref => ref.where('userID', '==', userID).where('vu', '==', false).where('type', '==', 'P'));
        return notificationCollection.valueChanges();
    }

    sendNotification(sender, recipient, plage, message, type) {
        const notificationCollection = this.db.collection('notifications');
        return notificationCollection.add({
            userID: recipient,
            type: type,
            contenu: {message: message, plage: plage, sender: sender},
            date: new Date(),
            vu: false
        });
    }

    setNotificationAsSeen(notificationID) {
        const notifRef = this.db.collection('notifications').doc(notificationID);
        return notifRef.update({vu: true});
    }

    deleteNotification(notificationID) {
        const notifRef = this.db.collection('notifications').doc(notificationID);
        return notifRef.delete();
    }
}
