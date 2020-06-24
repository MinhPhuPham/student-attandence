import { Injectable } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { User } from '../interfaces/users_login';
import { Subject} from '../interfaces/subject'
import { promise } from 'protractor';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    "Content-Type" : "application/json"
  })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {
  subjects: Array<Subject>

  private api_url2= 'https://main.musterapis.xyz'

  // Constructor
  constructor(private http: HttpClient,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) { 
  }
  loged = false;

  isLoading = false;
  async loadingPresent(text?:string, show?: boolean) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: 'Please wait ...',
      spinner: 'circles'
    }).then(a => {
      a.present().then(async () => {
        console.log('loading presented');
        const toast = await this.toastCtrl.create({
          message: text,
          duration: 1500, 
          color: "success",
          cssClass:"login_success"
        });
        if(show == false){
          toast.remove();
        }
        toast.present();
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
  isLoginIn(): boolean{
    const token = localStorage.getItem('token');
    return (token !== null) ? false : true;
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

  async getSubject(): Promise<any>{
    let result = await this.http.get(`${this.api_url2}/subjects`, httpOptions);
    result.pipe(catchError(this.errorHandler));
    return result.toPromise();
  }

  async getClasses(id: string): Promise<any>{
    let result = await this.http.get(`${this.api_url2}/subjects/${id}/classes`, httpOptions);
    result.pipe(catchError(this.errorHandler));
    return result.toPromise();
  }

  async getStudents(id: string): Promise<any>{
    let result = await this.http.get(`${this.api_url2}/classes/${id}/students`, httpOptions);
    result.pipe(catchError(this.errorHandler));
    return result.toPromise();
  }

  async SubmitCheckStudents(data): Promise<any>{
     let result = this.http.post(`${this.api_url2}/story`,data, httpOptions);
     result.pipe(catchError(this.errorHandler));
     return result.toPromise();
  }

  async getStoriesDay(id: string): Promise<any>{
    let result = await this.http.get(`${this.api_url2}/classes/${id}/histories`, httpOptions);
    result.pipe(catchError(this.errorHandler));
    return result.toPromise();
  }


  async getProfile() {
    const promise = await this.http.get(`${this.api_url2}/profile`, httpOptions);
    promise.pipe(catchError(this.errorHandler));
    let data = promise.toPromise();
    return data;
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
}

}
