import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { RoomGuard } from '../shared';

const pageRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: '',
		component: HomeComponent,
		canActivate: [ RoomGuard ],
	}
]);

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		pageRouting
	],
	declarations: [ HomeComponent ]
})
export class HomeModule { }
