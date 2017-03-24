import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {

  private isOpened = false;

  constructor() {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public show():void {
    this.isOpened = true;
  }

  public hide():void {
    this.isOpened = false;
  }

}
