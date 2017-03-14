import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { TimeFilterPipe } from './pipes';
import { ScrollFaderComponent, PageComponent } from './components';
import { DateFilterPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    NgSemanticModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    CommonModule,
    NgSemanticModule,
    FormsModule,
    HttpModule,
    TimeFilterPipe,
    ScrollFaderComponent,
    DateFilterPipe
  ],
  declarations: [ TimeFilterPipe, ScrollFaderComponent, DateFilterPipe ]
})
export class SharedModule { }
