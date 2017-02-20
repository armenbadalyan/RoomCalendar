import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ScrollDelegateService } from '../../services';
import { Subscription } from 'rxjs/Rx';


@Component({
  selector: 'custom-scroll',
  templateUrl: './custom-scroll.component.html',
  styleUrls: ['./custom-scroll.component.scss']
})
export class CustomScrollComponent implements OnInit, OnDestroy {

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

    this.isTopped = target.scrollTop <= 0;
    this.isBottomed = target.scrollTop + target.clientHeight >= targetInner.offsetHeight;
  }

}
