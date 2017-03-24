import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { EventListComponent } from './event-list/event-list.component';
import { CurrentEventResolver } from './current-event-resolver.service';
import { CoreModule } from '../core/core.module';
import { RoomStatusComponent } from './room-status/room-status.component';
import { QuickBookingComponent } from './quick-booking/quick-booking.component';
import { QRCodeModule }  from 'ng2-qrcode';


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
		pageRouting,
		QRCodeModule
	],
	declarations: [ HomeComponent, EventListComponent, RoomStatusComponent, QuickBookingComponent ],
	providers: [ CurrentEventResolver ]
})
export class HomeModule { }
