import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UserService } from './user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService:UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}