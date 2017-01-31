import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './layout/header';
import { ClockComponent } from './clock/clock.component'

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [HeaderComponent, ClockComponent],
	exports: [HeaderComponent]
})
export class CoreModule { }
