import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UserService } from '../shared';


@Injectable()
export class LoginAuthGuard implements CanActivate {
  constructor(private router: Router, private userService:UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.userService.isLoggedIn()
  }
}