import { EventPage, SettingsPage, LoginPage } from './app.po';
import { browser, element, by, protractor } from 'protractor';

describe('Room Calendar application', function() {
  let mainPage: EventPage,
      setttingsPage: SettingsPage,
      loginPage: LoginPage;

  beforeEach(() => {
    mainPage = new EventPage();
    setttingsPage = new SettingsPage();
    loginPage = new LoginPage();
  });

  describe('General', function() {
    it('should have title', () => {
      mainPage.navigateTo();
      expect(browser.getTitle()).toContain('Room Calendar');
    });
  });

  describe('Navigation', function() {
    var EC = protractor.ExpectedConditions;

    it('should redirect to no-room at first', () => {
      mainPage.navigateTo();
      browser.wait(EC.urlContains('no-room'), 1000);
    });

    it('should not allow to go to Settings until login is done', () => {
      setttingsPage.navigateTo();
      browser.wait(EC.urlContains('login'), 1000);
    });

    it('user should be able to go to login (settings) from main page', () => {
      mainPage.navigateTo();
      element(by.className('app-header__button--menu ')).click();
      browser.wait(EC.urlContains('login'), 1000);
    });

    /*it('user should be able to login', () => {
      loginPage.navigateTo();
    });*/


  });

});
