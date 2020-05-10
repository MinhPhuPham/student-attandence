import { Injectable } from '@angular/core';
import {Teacher} from '../interfaces/teacher'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {User} from '../interfaces/users_login'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  api_url = 'http://ec2-54-161-212-167.compute-1.amazonaws.com:8080/login'
  constructor(private db:AngularFireDatabase, private http:HttpClient) {
   }

    httpPost(data :User):Observable<User>{
     return this.http.post(this.api_url, data)
     .pipe(
      map((response: any) => response)
      
      )
      .pipe(catchError((err) => {
        console.error(err);
        throw err;
      }));
   }


   async getTeachersList(){ 
     const snapshot =await firebase.database().ref('teacher').once('value');
     return snapshot.val();
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
