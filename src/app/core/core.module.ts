import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './layout/header';
import { ClockComponent } from './clock/clock.component';
import { CustomScrollComponent } from './custom-scroll/custom-scroll.component'

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [HeaderComponent, ClockComponent, CustomScrollComponent],
	exports: [HeaderComponent, CustomScrollComponent]
})
export class CoreModule { }
