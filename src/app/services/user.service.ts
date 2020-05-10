import { Injectable } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import {User_profile} from '../interfaces/User_profile'
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {User} from '../interfaces/users_login'
const httpOptions = {
  headers: new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('token')}`
  })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private api_url = 'http://ec2-54-161-212-167.compute-1.amazonaws.com:8080'
  constructor(private http:HttpClient, private toastCtrl:ToastController ) {
   }

/* Method to login database */
     httpPost(data :User):Observable<User>{
     return this.http.post(`${this.api_url}/login`, data)
     .pipe(
      map((response: any) => response)
      
      )
      .pipe(catchError(async (err) => {
        console.error(err);
        const toast =  await this.toastCtrl.create({
          message: 'Please check your email or password again',
          duration: 1500,
          color:"danger",
          position: "top",
          cssClass:"toast-err"
        });
        toast.present();
        
        throw err;
      }));
   }


  async getTeachersList(){ 
          const promise= await this.http.get(`${this.api_url}/profile`,httpOptions);
          let data = promise.toPromise();
          return data;
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
