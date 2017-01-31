import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const pageRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [  ],
	}
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    pageRouting
  ],
  declarations: [ LoginComponent ]
})
export class LoginModule { }
