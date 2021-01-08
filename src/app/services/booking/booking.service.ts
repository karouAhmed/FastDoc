import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Rdv} from '../../interfaces/rdv';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {NotificationService} from '../notification/notification.service';

export interface ReservationRef {
    userID: string;
    profession: string;
    serviceID: string;
    rendezVousID: string;
    statut: string;
}

@Injectable({
    providedIn: 'root'
})

export class BookingService {
    userID: string;
    rdvdoc: AngularFirestoreDocument<Rdv>;
    rdv: Observable<Rdv>;
    private rdvsCollection: AngularFirestoreCollection<Rdv>;
    private reservations: Observable<ReservationRef[]>;

// getting book for each service
    private reservationCollection: AngularFirestoreCollection<ReservationRef>;
    private BookCollection: AngularFirestoreCollection<ReservationRef>;

    constructor(private db: AngularFirestore,
                private authService: AuthService,
                private notifictionService: NotificationService
    ) {
        this.userID = authService.userID;


    }

    addBooking(rdv: Rdv, idPrestataire: string, profession: string) {
        this.BookCollection = this.db.collection('reservations');
        this.rdvsCollection = this.db.collection('service').doc(idPrestataire).collection<Rdv>('Rendez-vous');

        return this.rdvsCollection.add(rdv).then(ref => {
            this.BookCollection.doc(ref.id).set({
                userID: this.userID,
                profession: profession,
                serviceID: idPrestataire,
                rendezVousID: ref.id,
                statut: 'EC'
            }).then(() => {
                const plage = {
                    startTime: rdv.startTime,
                    endTime: rdv.endTime
                };
                this.notifictionService.sendNotification(this.userID, idPrestataire, plage, 'Nouveau rendez-vous a été ajouter', 'P');
            });
        });
    }

    getBookings(userID) {
        // tslint:disable-next-line:max-line-length
        this.reservationCollection = this.db.collection('reservations', ref => ref.where('userID', '==', userID).where('statut', '==', 'EC'));
        this.reservations = this.reservationCollection.snapshotChanges().pipe(map(action => {
            return action.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.reservations;
    }

    getBooking(prestataireID: string, rdvID: string) {
        this.rdvdoc = this.db.collection('service').doc(prestataireID).collection('Rendez-vous').doc(rdvID);
        this.rdv = this.rdvdoc.valueChanges();
        return this.rdv;
    }

    deletBooking(reservationID: string) {
        return this.db.collection('reservations').doc(reservationID).delete();

    }

    cancelBooking(prestataireID: string, rdvID: string, reservationID: string, rdv) {
        const resDoc = this.db.collection('reservations').doc(reservationID);
        const rdvDoc = this.db.collection('service').doc(prestataireID).collection('Rendez-vous').doc(rdvID);

        return resDoc.update({statut: 'CC'}).then(() => {
            rdvDoc.update({statut: 'CC'});
        }).then(() => {
            const plage = {
                startTime: rdv.startTime,
                endTime: rdv.endTime
            };
            if (!rdv.abonne) {
                this.notifictionService.sendNotification(this.userID, prestataireID, plage, 'Annulation rendez-vous', 'P');
            } else {
                this.notifictionService.sendNotification(this.userID, prestataireID, plage, 'Annulation rendez-vous', 'P');
                this.notifictionService.sendNotification(prestataireID, rdv.abonne, plage, 'Actuellement rendez-vous disponible', 'C');
            }

        });
    }

    getAllBookings() {
        // tslint:disable-next-line:max-line-length
        this.reservationCollection = this.db.collection('reservations', ref => ref.where('userID', '==', this.userID).where('statut', '<', 'EC'));
        this.reservations = this.reservationCollection.snapshotChanges().pipe(map(action => {
            return action.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.reservations;

    }


}





