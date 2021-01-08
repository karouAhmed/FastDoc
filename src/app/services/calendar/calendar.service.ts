import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Rdv} from '../../interfaces/rdv';
import {map} from 'rxjs/operators';
import {NotificationService} from '../notification/notification.service';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {

    private rdvs: Observable<Rdv[]>;
    private rdvsCollection: AngularFirestoreCollection<Rdv>;
    // historique component
    private allrdvs: Observable<Rdv[]>;
    private allrdvsCollection: AngularFirestoreCollection<Rdv>;

    constructor(private db: AngularFirestore,
                private notificationService: NotificationService) {

    }

    getAppointments(userID) {
        // tslint:disable-next-line:max-line-length
        this.rdvsCollection = this.db.collection('service').doc(userID).collection<Rdv>('Rendez-vous', ref => ref.where('statut', '==', 'EC'));
        this.rdvs = this.rdvsCollection.snapshotChanges().pipe(map(action => {
            return action.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.rdvs;

    }

    getAppointmentById(idpestataire, debut: Date, fin: Date) {
        // tslint:disable-next-line:max-line-length
        this.rdvsCollection = this.db.collection('service').doc(idpestataire).collection<Rdv>('Rendez-vous', ref => ref.where('startTime', '<=', fin).where('startTime', '>=', debut).where('statut', '==', 'EC'));
        this.rdvs = this.rdvsCollection.valueChanges();
        return this.rdvs;
    }

    getAppointmentRef(prestataireID, debut, fin) {
        // tslint:disable-next-line:max-line-length
        this.rdvsCollection = this.db.collection('service').doc(prestataireID).collection<Rdv>('Rendez-vous', ref => ref.where('startTime', '<=', fin).where('startTime', '>=', debut).where('statut', '==', 'EC'));
        return this.rdvsCollection.snapshotChanges().pipe(map(action => {
            return action.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id};
            });
        }));
    }

    addAppointment(rdv: Rdv, userID) {
        return this.db.collection('service').doc(userID).collection('Rendez-vous').add(rdv);
    }

    getAppointment(rdvID, userID) {
        return this.db.collection('service').doc(userID).collection('Rendez-vous').doc<Rdv>(rdvID).valueChanges();
    }

    updateAppointment(prestataireID, rdvID, userID) {
        const rdvref = this.db.collection('service').doc(prestataireID).collection('Rendez-vous').doc(rdvID);
        return rdvref.update({abonne: userID});
    }

    deleteAppointment(rdvId, userID) {
        return this.db.collection('service').doc(userID).collection('Rendez-vous').doc(rdvId).delete();

    }

    cancelAppointement(rdvID, userID, rdv) {
        const rdvCollection = this.db.collection('service').doc(userID).collection('Rendez-vous').doc(rdvID);
        const reservationCollection = this.db.collection('reservations').doc(rdvID);
        return rdvCollection.update({statut: 'CP'}).then(() => {
            reservationCollection.update({statut: 'CP'}).then(() => {
                const plage = {
                    startTime: new Date(rdv.startTime),
                    endTime: new Date(rdv.endTime)
                };
                if (!rdv.abonne) {
                    this.notificationService.sendNotification(userID, rdv.userID, plage, 'Votre rendez-vous a été anuuler', 'C');
                } else {
                    this.notificationService.sendNotification(userID, rdv.userID, plage, 'Votre rendez-vous a été anuuler', 'C');
                    this.notificationService.sendNotification(userID, rdv.abonne, plage, 'Actuellement rendez-vous disponible', 'C');
                }
            });
        });
    }

    getAllApointment(userID) {
        // tslint:disable-next-line:max-line-length
        this.allrdvsCollection = this.db.collection('service').doc(userID).collection<Rdv>('Rendez-vous', ref => ref.where('statut', '<', 'EC'));
        this.allrdvs = this.allrdvsCollection.snapshotChanges().pipe(map(action => {
            return action.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.allrdvs;
    }
}


