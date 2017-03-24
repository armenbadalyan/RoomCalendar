import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { TimeFilterPipe, ScrollFaderComponent, PopupComponent, EmailValidator, DateFilterPipe} from './';

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
    PopupComponent,
    EmailValidator,
    DateFilterPipe
  ],
  declarations: [ TimeFilterPipe, ScrollFaderComponent, PopupComponent, DateFilterPipe, EmailValidator ]
})
export class SharedModule { }
