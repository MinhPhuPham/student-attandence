import { Injectable } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { User_profile } from '../interfaces/User_profile'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { User } from '../interfaces/users_login';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private api_url = 'http://ec2-54-161-212-167.compute-1.amazonaws.com:8080'

  // Constructor
  constructor(private http: HttpClient,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) { }

  isLoading = false;
  async loadingPresent() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Please wait ...',
      spinner: 'circles'
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort laoding'));
        }
      });
    });
  }

  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss() /*.then(() => console.log('loading dismissed'));*/
  }

  /* Method to login database */
  httpPost(data: User): Observable<User> {
    return this.http.post(`${this.api_url}/login`, data)
      .pipe(
        map((response: any) => response)

      )
      .pipe(catchError(async (err) => {
        console.error(err);
        const toast = await this.toastCtrl.create({
          message: 'Please check your email or password again',
          duration: 1500,
          color: "danger",
          position: "top",
          cssClass: "toast-err"
        });
        toast.present();

        throw err;
      }));
  }


  async getTeachersList() {
    const promise = await this.http.get(`${this.api_url}/profile`, httpOptions);
    let data = promise.toPromise();
    return data;
  }

  //  getSubjects(){
  //    return this.http.get(`${this.url_local}`)
  //   let subject_data = subjects.toPromise();
  //   return subject_data;
  // }

  get isLoggedIn(): boolean {
    const token_key = JSON.parse(localStorage.getItem('token'));
    return (token_key !== null) ? true : false;
  }
}
