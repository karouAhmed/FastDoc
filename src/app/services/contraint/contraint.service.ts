import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Contraintes} from '../../interfaces/contraintes';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ContraintService {
    contraintesedoc: AngularFirestoreDocument<Contraintes>;
    contraintes: Observable<Contraintes>;


    constructor(private db: AngularFirestore, private authService: AuthService) {
    }

    loadConstraints(userID) {
        this.contraintesedoc = this.db.doc<Contraintes>('contraintes/' + userID);
        this.contraintes = this.contraintesedoc.valueChanges();
        return this.contraintes;
    }

    loadConstraintsById(id) {
        this.contraintesedoc = this.db.doc<Contraintes>('contraintes/' + id);
        this.contraintes = this.contraintesedoc.valueChanges();
        return this.contraintes;
    }

    updateConstraints(contraintes: Contraintes, userID) {
        this.contraintesedoc = this.db.doc<Contraintes>('contraintes/' + userID);
        return this.contraintesedoc.update(contraintes);
    }
}
