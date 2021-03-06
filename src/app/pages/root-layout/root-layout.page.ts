import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UserService} from '../../services/user.service'
import { Router } from '@angular/router';

import { Pages } from '../../interfaces/pages';
@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.page.html',
  styleUrls: ['./root-layout.page.scss'],
})
export class RootLayoutPage {

  isCall= false;
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
        url: '/dashbroad/home',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'About',
        url: '/dashbroad/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'App Settings',
        url: '/dashbroad/settings',
        direct: 'forward',
        icon: 'cog'
      }
    ];
    this.initializeApp();
    let token = localStorage.getItem('token');
    if(this.isCall== true || token){
      this.getData()
    }
    // this.asyncData();
  }

  getToken(){
    return localStorage.getItem('token');
  }
  
  asyncData(){
    let token = localStorage.getItem('token');
    
    let interval = setInterval(()=> {
      this.getToken();
      if(token){
        this.getData().then(()=> clearInterval(interval))
      }
    },500)
  }
  
  getData(){
    
    return this.userservice.getProfile().then(
      (data: any)=> {
        this.user_data = data.data;
        return this.user_data;
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
    this.navCtrl.navigateForward('/dashbroad/edit-profile');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
