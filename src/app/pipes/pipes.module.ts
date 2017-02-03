import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { TimeFilterPipe } from "../shared/pipes";

@NgModule({
  declarations:[TimeFilterPipe],
  imports:[CommonModule],
  exports:[TimeFilterPipe]
})

export class PipesModule { }
