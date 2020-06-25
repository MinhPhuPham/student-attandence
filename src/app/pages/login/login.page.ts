import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {AppComponent} from "../../app.component"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private user: UserService,
    private compoent: AppComponent,
    private router: Router
  ) {
    const tokey_key = localStorage.getItem('token');
    if(tokey_key){
      this.router.navigate(['/dashbroad']);
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                // showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }
  get Email() {
    return this.onLoginForm.get('email');
  }
  get Password() {
    return this.onLoginForm.get('password');
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Bad email or password',
      duration: 2000
    });
    toast.present();
  }
  
  async Login() {
    this.user.loadingPresent('Welcome to app!!!', true);
    let user = {
      username: this.Email.value,
      password: this.Password.value
    }
    this.user.httpPost(user).subscribe(async (res:any)=>{
      let data = await res.data
       localStorage.setItem('token',data.token)
    },
    error =>{
      console.log(error);
    },
    ()=>{
      this.navCtrl.navigateRoot('/dashbroad');
      this.user.loadingDismiss()      
    })

  }

}
