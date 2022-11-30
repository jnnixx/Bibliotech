import { NotificationService } from './notification.service';
import { Livro } from './../models/livro';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService
  ) { }

  public findAll(): Observable<Livro[]> {
    const promise = this.firestore.collection("livros").get();
    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const livro: Livro = doc.data() as Livro;
          livro.id = doc.id;
          return livro;
        })
      }),
      catchError(error => {
        this.notification.showMessage("Erro ao buscar dados.");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public createBook(livro: Livro): Observable<any> {
    const promise = this.firestore.collection("livros").add(livro);
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao cadastrar livro.");
        console.error(error);
        return EMPTY;
      })
    )
  }

  public deleteBook(id: string) {
    const promise = this.firestore.collection("livros").doc(id).delete();
    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessage("Erro ao excluir livro.");
        console.error(error);
        return EMPTY;
      })
    )
  }
}