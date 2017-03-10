import {
  Component,
  ElementRef,
  Injectable
} from '@angular/core';
import { isPresent } from '@angular/common/src/facade/lang';




export function CustomComponent(annotation: any) {
  return function (target: Function) {
    let parentTarget = Object.getPrototypeOf(target.prototype).constructor;
    let reflect = window['Reflect'];
    let parentAnnotations = reflect.getMetadata('annotations', parentTarget);

    let parentAnnotation = parentAnnotations[0];
    Object.keys(parentAnnotation).forEach(key => {
      if (isPresent(parentAnnotation[key])) {
        if (!isPresent(annotation[key])) {
          annotation[key] = parentAnnotation[key];
        }
      }
    });

    let metadata = new Component(annotation);

    reflect.defineMetadata('annotations', [ metadata ], target);
  };
}