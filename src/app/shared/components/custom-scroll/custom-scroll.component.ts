import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

import { ScrollDelegateService } from '../../services';

const ALLOWED_DIFF = 1;

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

  constructor(private scrollDelegate: ScrollDelegateService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.onScroll();
    this.scrollDelegate.updater.subscribe(success => {
      this.onScroll();
      this.cd.detectChanges();
    });
  }

  private onScroll(): void {
    let target:HTMLElement = this.scrollEl.nativeElement,
        targetInner:HTMLElement = this.scrollChildEl.nativeElement;

    this.isTopped = target.scrollTop <= ALLOWED_DIFF;
    this.isBottomed = target.scrollTop + target.clientHeight >= targetInner.offsetHeight - ALLOWED_DIFF;
  }

}
