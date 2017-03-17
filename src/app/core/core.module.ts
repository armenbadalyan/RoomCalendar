import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './layout/header';
import { ClockComponent } from './clock/clock.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		InlineSVGModule
	],
	declarations: [HeaderComponent, ClockComponent],
	exports: [HeaderComponent, InlineSVGModule]
})
export class CoreModule { }
