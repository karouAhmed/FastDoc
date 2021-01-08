import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Service} from '../../interfaces/service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Critere} from '../../interfaces/critere';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private services: Observable<Service[]>;
    private serviceCollection: AngularFirestoreCollection<Service>;

    constructor(private afAuth: AngularFireAuth,
                private db: AngularFirestore,
    ) {
    }

    searchService(critere: Critere) {
        // tslint:disable-next-line:max-line-length
        this.serviceCollection = this.db.collection('service', ref => ref.where('profession', '==', critere.proffession).where('gouvernement', '==', critere.gouvernement).where('ville', '==', critere.ville));
        this.services = this.serviceCollection.snapshotChanges().pipe(map(action => {
            return action.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return {id, ...data};
            });
        }));
        /*   this.services.subscribe(res => {
             if (res) {
                  this.servicesParLocalisation = res;
                  this.servicesParLocalisation.forEach(ser => {
                      this.containtesData.loadContraintesById(ser.id).subscribe(ress => {
                          this.contraintes = ress;
                          this.rdvService.getRdvsById(ser.id).subscribe(rv => {
                              this.rdvs = rv;
                              if (this.rdvs.length >= this.contraintes.nbPrestations) {
                                  this.servicesParLocalisation = this.servicesParLocalisation.filter(se => se.id !== ser.id);
                                  console.log('after delete');
                                  console.log(this.servicesParLocalisation);
                              } else {
                                  console.log(this.servicesParLocalisation);
                              }
                          });

                      });
                  });
              }
        });*/
        return this.services;
    }
}
