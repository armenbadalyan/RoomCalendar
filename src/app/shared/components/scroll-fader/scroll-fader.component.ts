import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ScrollDelegateService } from '../../services';
import { Subscription } from 'rxjs/Rx';

const ALLOWED_DIFF = 1;

@Component({
  selector: 'scroll-fader',
  templateUrl: './scroll-fader.component.html',
  styleUrls: ['./scroll-fader.component.scss']
})
export class ScrollFaderComponent implements OnInit, OnDestroy {

  public isTopped: Boolean;
  public isBottomed: Boolean;
  private scrollDelegateSubscription: Subscription;

  @ViewChild('scroll') scrollEl:ElementRef;
  @ViewChild('scrollChild') scrollChildEl:ElementRef;

  constructor(private scrollDelegate: ScrollDelegateService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.onScroll();
    this.scrollDelegateSubscription = this.scrollDelegate.updater.subscribe(success => {
      this.onScroll();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.scrollDelegateSubscription.unsubscribe();
  }

  private onScroll(): void {
    let target:HTMLElement = this.scrollEl.nativeElement,
        targetInner:HTMLElement = this.scrollChildEl.nativeElement;

    this.isTopped = target.scrollTop <= ALLOWED_DIFF;
    this.isBottomed = target.scrollTop + target.clientHeight >= targetInner.offsetHeight - ALLOWED_DIFF;
  }

}
