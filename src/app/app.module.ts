import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { NoRoomModule } from './no-room/no-room.module';
import { SettingsModule } from './settings/settings.module';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';
import {
  SharedModule,
  AuthGuard,
  UserService,
  SettingsService,
  CalendarService,
  EventService,
  GapiService,
  PageService
} from './shared';
import './shared/rxjs-extensions';


const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    rootRouting,
    HomeModule,
    NoRoomModule,
    SettingsModule,
    LoginModule
  ],
  declarations: [
    AppComponent
  ],

  providers: [ AuthGuard, UserService, SettingsService, CalendarService, EventService, GapiService, PageService], 
  bootstrap: [ AppComponent ]
})
export class AppModule { }
