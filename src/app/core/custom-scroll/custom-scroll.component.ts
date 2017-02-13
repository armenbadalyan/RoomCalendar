import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


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

  constructor() { }

  ngOnInit() {
    this.onScroll();
  }

  onScroll(): void {
    let target:HTMLElement = this.scrollEl.nativeElement,
        targetInner:HTMLElement = this.scrollChildEl.nativeElement;

    this.isTopped = target.scrollTop <= 0;
    this.isBottomed = target.scrollTop + target.clientHeight >= targetInner.offsetHeight;
  }

}
