import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Profil} from '../../interfaces/profil';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfilService {
    profiledoc: AngularFirestoreDocument<Profil>;
    profil: Observable<Profil>;

    constructor(private db: AngularFirestore) {
    }

    loadProfile(userID) {
        this.profiledoc = this.db.doc<Profil>('users/' + userID);
        this.profil = this.profiledoc.valueChanges();
        return this.profil;
    }

    updateProfile(profil: Profil, userID) {
        this.profiledoc = this.db.doc<Profil>('users/' + userID);
        return this.profiledoc.update(profil);
    }
}
