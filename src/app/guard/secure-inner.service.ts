import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { NavController, ToastController} from '@ionic/angular';
import {UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class SecureInnerService {

  constructor(
    public authService : UserService,
    public ctrlNav : NavController,
    public toastr : ToastController
  ) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree> {
      if(this.authService.isLoginIn) {
        const toast = await this.toastr.create({
          message: 'You can not do this acction',
          duration: 1500,
          color: "danger",
          position: "top"
        });
        toast.present();

        this.ctrlNav.navigateRoot(['dashbroad'])
      }
    return true;
  }
}
