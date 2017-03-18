import { browser, element, by } from 'protractor';

export class EventPage {
  navigateTo() {
    return browser.get('/');
  }
}

export class SettingsPage {
  navigateTo() {
    return browser.get('/#settings');
  }
}

export class LoginPage {
  navigateTo() {
    return browser.get('/#login');
  }
}