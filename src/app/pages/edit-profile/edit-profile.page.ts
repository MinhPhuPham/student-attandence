import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import {UserService} from '../../services/user.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private userservice: UserService
    ) { }
    user_data;
    
  async ngOnInit() {
    let user:any;
    user= await this.userservice.getTeachersList();
    this.user_data = await user.data;
  }

  async sendData() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        cssClass: 'success',
        message: 'Your Data was Edited!',
        duration: 0,
        position: 'bottom',
        color: "medium"
      });

      toast.present();
      this.navCtrl.navigateForward('/home');
    });
  }

}
