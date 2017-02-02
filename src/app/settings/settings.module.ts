import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { SettingsComponent } from './settings.component'
import { AuthGuard } from '../shared'

const pageRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'settings',
		component: SettingsComponent//,
    //canActivate: [ AuthGuard ]
	}
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    pageRouting
  ],
  declarations: [ SettingsComponent ]
})
export class SettingsModule { }
