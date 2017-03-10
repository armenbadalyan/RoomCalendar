import {trigger, state, animate, style, transition} from '@angular/core';

export function routerTransition() {
  return trigger('routerTransition', [
    state('void', style({opacity: 0}) ),
    state('*', style({opacity: 1}) ),
    transition(':enter', [
      //style({transform: 'translateX(-100%)'}),
      animate('0.3s ease-in-out'/*, style({transform: 'translateX(0%)'})*/)
    ]),
    transition(':leave', [
      //style({transform: 'translateX(0%)'}),
      animate('0.3s ease-in-out'/*, style({transform: 'translateX(100%)'})*/)
    ])
  ]);
}
