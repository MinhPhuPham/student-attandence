import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import {UserService} from '../../services/user.service';
import { Router } from '@angular/router';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';

import {Subjects} from '../../../assets/mocks_data/subjects'

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {
  data;
  listSubjects=[];
  searchKey = '';
    yourLocation = '123 Test Street';
    themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
    constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public popoverCtrl: PopoverController,
      public alertCtrl: AlertController,
      public modalCtrl: ModalController,
      public toastCtrl: ToastController,
      private user:UserService,
      private router: Router
    ) { }
    ngOnInit() {
      this.getSubject();
    }
    async getSubject(){
      return await this.user.getSubject().then(value => {
        this.listSubjects = value.data;
        localStorage.setItem('subjects',JSON.stringify(value.data));
      })
    }
  
    ionViewWillEnter() {
      this.menuCtrl.enable(true);
    }
  
    settings() {
      this.navCtrl.navigateForward('settings');
    }
  
    async alertLocation() {
      const changeLocation = await this.alertCtrl.create({
        header: 'Change Location',
        message: 'Type your Address.',
        inputs: [
          {
            name: 'location',
            placeholder: 'Enter your new Location',
            type: 'text'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Change',
            handler: async (data) => {
              console.log('Change clicked', data);
              this.yourLocation = data.location;
              const toast = await this.toastCtrl.create({
                message: 'Location was change successfully',
                duration: 3000,
                position: 'top',
                // closeButtonText: 'OK',
                // showCloseButton:true;
              });
  
              toast.present();
            }
          }
        ]
      });
      changeLocation.present();
    }
  
    async searchFilter () {
      const modal = await this.modalCtrl.create({
        component: SearchFilterPage
      });
      return await modal.present();
    }
  
    async presentImage(image: any) {
      const modal = await this.modalCtrl.create({
        component: ImagePage,
        componentProps: { value: image }
      });
      return await modal.present();
    }
  
    async notifications(ev: any) {
      const popover = await this.popoverCtrl.create({
        component: NotificationsComponent,
        event: ev,
        animated: true,
        showBackdrop: true
      });
      return await popover.present();
    }
    GotoClass(id){
      this.navCtrl.navigateRoot(['home/subjects/classes/',id,"check"]);
    }

}
