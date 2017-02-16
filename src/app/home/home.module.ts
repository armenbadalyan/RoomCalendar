import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { EventListComponent } from './event-list/event-list.component';
import { CurrentEventResolver } from './current-event-resolver.service';
import { CoreModule } from '../core/core.module';
import { QRCodeModule } from 'angular2-qrcode';

const pageRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: '',
		component: HomeComponent,
		resolve: {
			calendar: CurrentEventResolver
		}
	}
]);

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		CoreModule,
		QRCodeModule,	
		pageRouting
	],
	declarations: [ HomeComponent, EventListComponent],
	providers: [ CurrentEventResolver ]
})
export class HomeModule { }
