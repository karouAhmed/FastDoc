import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Rating} from '../../interfaces/rating';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RateService {
    private ratingCol: AngularFirestoreCollection<Rating>;
    private rating: Observable<Rating[]>;
    private userID: string;

    constructor(private auth: AngularFireAuth,
                private db: AngularFirestore) {
        this.auth.auth.onAuthStateChanged((user) => {
            if (user) {
                this.userID = user.uid;
            }
        });
    }

    loadRatings(prestatireID: string) {
        this.ratingCol = this.db.collection('service').doc(prestatireID).collection('avis');
        this.rating = this.ratingCol.snapshotChanges().pipe(map(action => {
            return action.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        }));
        return this.rating;
    }

    loadRating(prestatireID: string) {
        return this.db.collection('service').doc(prestatireID).collection('avis').doc(this.userID).valueChanges();
    }

    addRating(prestatireID: string, rating: Rating) {
        return this.db.collection('service').doc(prestatireID).collection('avis').doc(this.userID).set(rating);
    }

    updateRating(prestatireID: string, rating: Rating) {
        return this.db.collection('service').doc(prestatireID).collection('avis').doc(this.userID).update(rating);
    }


}
