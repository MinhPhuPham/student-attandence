import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'popmenu',
  templateUrl: './popmenu.component.html',
  styleUrls: ['./popmenu.component.scss']
})
export class PopmenuComponent implements OnInit {
  openMenu: Boolean = false;

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }
  gotoSetting() {
    this.navCtrl.navigateRoot('/dashbroad/settings')

    return this.openMenu = false;
  }
  gotoHome() {
    this.router.navigate['/dashbroad'];
    return this.openMenu = false;
  }
  gotoProfile() {
    this.router.navigate(['/dashbroad/edit-profile']);
    return this.openMenu = false;
  }
  Function(event) {

    if (event.target.id != "hidden") {
      return this.openMenu = false;
    }
  }
  togglePopupMenu() {
    return this.openMenu = !this.openMenu;
  }

}
