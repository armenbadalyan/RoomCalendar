import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSemanticModule } from "ng-semantic/ng-semantic";

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
  	HttpModule
  ],
  declarations: []
})
export class SharedModule { }
