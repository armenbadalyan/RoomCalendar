import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { NoRoomComponent } from './no-room.component';

const pageRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'no-room',
		component: NoRoomComponent
	}
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    pageRouting
  ],
  declarations: [ NoRoomComponent ]
})
export class NoRoomModule { }
