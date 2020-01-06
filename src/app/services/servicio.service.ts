import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

export interface Observacion {
  id?: string,
  profesional: string,
  nombre: string,
  apellido: string, 
  rut: number,
  observacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private observacionCollection: AngularFirestoreCollection<Observacion>; 
  private observaciones: Observable<Observacion[]>;
  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth,
              private authService: AuthService) {
    let currentUser = this.authService.getCurrentUser();
    if(this.afAuth.auth.currentUser) {
      let user = this.afAuth.auth.currentUser.uid;
    }
    
    if (currentUser) {
      this.refreshNotesCollection(currentUser.uid)
    }
  }
  refreshNotesCollection(userId) {
    this.observacionCollection = this.db.collection('Profesionales').doc(userId).collection<Observacion>('Obsevaciones');
      this.observaciones = this.observacionCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ... data};
        }))
      )
  }
  
  getObservaciones() {
    return this.observaciones;
  }
  getObservacionId(id) {
    return this.observacionCollection.doc<Observacion>(id).valueChanges();
  }
  updateObservacion(observacion) {
    return this.observacionCollection.doc(observacion.id).update(observacion);
  }
  deleteObservacion(observacion) {
    this.observacionCollection.doc(observacion.id).delete();
  }
  addToObservacion(observacion) {
    return this.observacionCollection.add(observacion);
  }

}