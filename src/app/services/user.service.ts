import { Injectable } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { User } from '../interfaces/users_login';
import { Subject} from '../interfaces/subject'

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {
  subjects: Array<Subject>

  private api_url = 'http://ec2-18-141-177-210.ap-southeast-1.compute.amazonaws.com:8080'
  private api_url2= 'https://main.musterapis.xyz'

  // Constructor
  constructor(private http: HttpClient,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) { 
  }

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
    return this.http.post(`${this.api_url2}/login`, data)
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
    const promise = await this.http.get(`${this.api_url2}/profile`, httpOptions);
    promise.pipe(catchError(this.errorHandler));
    let data = promise.toPromise();
    return data;
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
}
}
