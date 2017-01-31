import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';


@Injectable()
export class RoomGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkRoom(url);
  }

  private checkRoom(url: string): boolean {
    if (localStorage.getItem('room_calendar_current_room')) { return true; }

    this.router.navigate(['/no-room']);
    return false;
  }
}