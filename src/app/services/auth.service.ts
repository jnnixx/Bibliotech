import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, EMPTY } from 'rxjs';
import { GoogleAuthProvider } from 'firebase/auth';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private firebaseAuth: AngularFireAuth,
    private notification: NotificationService
    ) { }

  public authenticateByGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    const promise = this.firebaseAuth.signInWithPopup(provider);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao autenticar com Google.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  authenticateByEmailAndPassword(user: User): Observable<any> {
    const { email, senha } = user;
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, senha)
    return from(promise).pipe(
      catchError(error => {
        if(error.code == "auth/user-not-found"){
          this.notification.showMessage("Usuário não cadastrado.");
        }
        else if(error.code == "auth/wrong-password") {
          this.notification.showMessage("Senha incorreta.");
        }
        else {
          this.notification.showMessage("Erro ao autenticar.");
          console.error(error);
        }
        return EMPTY;
      })
    );
  }

  createUserEmailAndPassword(user: User): Observable<any> {
    const { email, senha } = user;
    const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, senha);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar usuário.");
        console.error(error);
        return EMPTY;
      })
    );
  }

  logout() {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }
}
