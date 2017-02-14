import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SettingsService, Calendar } from '../shared'


@Injectable()
export class CurrentEventResolver implements Resolve<Calendar> {
  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Calendar {

    // resolve currently selected calendar
    if (this.settingsService.isEventLoadAllowed()) {
      return this.settingsService.selectedCalendar;
    }
    else {
      this.router.navigate(['/no-room']);
      return null;
    }

  }
}
