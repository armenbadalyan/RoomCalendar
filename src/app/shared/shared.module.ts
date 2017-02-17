import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { TimeFilterPipe } from './pipes';
import { CustomScrollComponent } from './components';

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
    CustomScrollComponent
  ],
  declarations: [ TimeFilterPipe, CustomScrollComponent ]
})
export class SharedModule { }
