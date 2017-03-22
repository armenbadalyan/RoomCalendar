import { EventPage, SettingsPage, LoginPage } from './app.po';
import { browser, element, by, protractor } from 'protractor';
import { MockingRequests } from './mock.po';

const mockingRequests: MockingRequests = new MockingRequests();
      
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

    it('user should be able to login', () => {
      loginPage.navigateTo();
      element(by.name('username')).sendKeys('test');
      element(by.name('password')).sendKeys('password');

      browser.wait(mockingRequests.setScenario.bind(mockingRequests, 'login', 'successful'));

      element(by.className('login-page__button')).click();

      browser.wait(EC.urlContains('settings'), 1000);
    });
    
    it('user should not be able to login with wrong credentials and see error message', () => {
      loginPage.navigateTo();
      element(by.name('username')).sendKeys('test');
      element(by.name('password')).sendKeys('password');

      browser.wait(mockingRequests.setScenario.bind(mockingRequests, 'login', 'failed'));

      element(by.className('login-page__button')).click();

      
      expect(by.css('.ui.error.message')).toBeTruthy();
    });
    
    it('user should be able to login and logout', () => {
      loginPage.navigateTo();
      element(by.name('username')).sendKeys('test');
      element(by.name('password')).sendKeys('password');

      browser.wait(mockingRequests.setScenario.bind(mockingRequests, 'login', 'successful'));

      element(by.className('login-page__button')).click();

      browser.wait(EC.urlContains('settings'), 1000);

      browser.ignoreSynchronization = true;

      browser.getAllWindowHandles().then(function (handles) {
        browser.switchTo().window(handles[0]);
      });

      element.all(by.className('settings-page__button')).get(2).click();

      browser.wait(EC.urlContains('no-room'), 1000);
    });


  });

});
