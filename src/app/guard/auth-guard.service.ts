import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {UserService } from '../services/user.service';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public userService : UserService,
    public router : Router
  ) {}

  canActivate(): boolean {
    return this.userService.isLoginIn;
  }
}

