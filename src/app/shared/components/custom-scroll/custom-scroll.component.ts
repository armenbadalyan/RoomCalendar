import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ScrollDelegateService } from '../../services';


@Component({
  selector: 'custom-scroll',
  templateUrl: './custom-scroll.component.html',
  styleUrls: ['./custom-scroll.component.scss']
})
export class CustomScrollComponent implements OnInit {

  public isTopped: Boolean;
  public isBottomed: Boolean;

  @ViewChild('scroll') scrollEl:ElementRef;
  @ViewChild('scrollChild') scrollChildEl:ElementRef;

  constructor(private scrollDelegate: ScrollDelegateService) {

  }

  ngOnInit() {
    this.onScroll();
    this.scrollDelegate.updater.subscribe(success => {
      this.onScroll();
    });
  }

  private onScroll(): void {
    let target:HTMLElement = this.scrollEl.nativeElement,
        targetInner:HTMLElement = this.scrollChildEl.nativeElement;

    this.isTopped = target.scrollTop <= 0;
    this.isBottomed = target.scrollTop + target.clientHeight >= targetInner.offsetHeight;
  }

}
