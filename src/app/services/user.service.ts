import { Injectable } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable,BehaviorSubject,  throwError, from } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { User } from '../interfaces/users_login';
import { Subject} from '../interfaces/subject'
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
  private currentSubject: BehaviorSubject<Subject>;
  public subjects: Observable<Subject>;

  private api_url2= 'https://main.musterapis.xyz';

  // Constructor
  constructor(private http: HttpClient,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) { 
    this.currentSubject = new BehaviorSubject<Subject>(JSON.parse(localStorage.getItem('subjects')));
    this.subjects = this.currentSubject.asObservable();
  }

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
        tap((data: any)=> {localStorage.setItem('token',data.data.token);
      console.log(data.data.token);
      }
        )
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

  get Subject(): Subject{
    return this.currentSubject.value;
  }

  getSubject(){
    let headers = new  HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(`${this.api_url2}/subjects`, {headers: headers})
               .pipe(map(subject=>{
                localStorage.setItem('subjects', JSON.stringify(subject.data))
                this.currentSubject.next(subject.data);
                return subject.data;
               }))
  }

   getClasses(id: string): Promise<any>{
    let headers = new  HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    let result =  this.http.get(`${this.api_url2}/subjects/${id}/classes`, {headers: headers});
    result.pipe(catchError(this.errorHandler));
    return result.toPromise();
  }

   getStudents(id: string): Promise<any>{
    let headers = new  HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    let result =  this.http.get(`${this.api_url2}/classes/${id}/students`, {headers: headers});
    result.pipe(catchError(this.errorHandler));
    return result.toPromise();
  }

   SubmitCheckStudents(data): Promise<any>{
    let headers = new  HttpHeaders();
    headers = headers.set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    headers = headers.set("Content-Type", "application/json");
     let result = this.http.post(`${this.api_url2}/story`,data, {headers: headers});
     result.pipe(catchError(this.errorHandler));
     return result.toPromise();
  }

   getStoriesDay(id: string): Promise<any>{
    let headers = new  HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    let result = this.http.get(`${this.api_url2}/classes/${id}/histories`, {headers: headers});
    result.pipe(catchError(this.errorHandler));
    return result.toPromise();
  }

   getHistoriesListStudent(id,day): Promise<any>{
    let headers = new  HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    let result = this.http.get(`${this.api_url2}/classes/${id}/stories?date=${day}`,{headers: headers});
    result.pipe(catchError(this.errorHandler));
    return result.toPromise();
  }

  getProfileStudent(class_id,student_id): Promise<any>{
    let headers = new  HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    let result = this.http.get(`${this.api_url2}/classes/${class_id}/stories/students/${student_id} `,{headers: headers});
    result.pipe(catchError(this.errorHandler));
    return result.toPromise();
  }

   getProfile() {
    let headers = new  HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`);
    const promise = this.http.get(`${this.api_url2}/profile`, {headers: headers});
    promise.pipe(catchError(this.errorHandler));
    return promise.toPromise();
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
}

}
