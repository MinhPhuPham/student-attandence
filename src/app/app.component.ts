import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UserService} from './services/user.service'
import { Router } from '@angular/router';

import { Pages } from './interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  user_data
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private userservice: UserService,
    public router: Router
  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'About',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'App Settings',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      }
    ];
    this.initializeApp();
    this.getData();
    
  }
  
  asyncData(){
    
    let interval = setInterval(()=> {
      this.getData();
      if(this.getData()){
        clearInterval(interval)
      }
    },500)
  }
  
  getData(){
    return this.userservice.getProfile().then(
      (data: any)=> {
        this.user_data = data.data;
        return this.user_data
      }
    )
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
