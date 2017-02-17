import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginAuthGuard } from './login-guard.service'

const pageRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [ LoginAuthGuard ],
	}
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    pageRouting
  ],
  declarations: [ LoginComponent ],
  providers: [ LoginAuthGuard ]
})
export class LoginModule { }
