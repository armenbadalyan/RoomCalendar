import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from 'ng-semantic/ng-semantic';
import { TimeFilterPipe } from './pipes';
import { QrCodeDirective } from './directives/qr-code.directive';

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
    QrCodeDirective  
  ],
  declarations: [ TimeFilterPipe, QrCodeDirective ]
})
export class SharedModule { }
