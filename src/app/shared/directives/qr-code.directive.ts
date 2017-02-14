import { Directive, Input, TemplateRef, ViewContainerRef  } from '@angular/core';

@Directive({
  selector: '[appQrCode]'
})
export class QrCodeDirective {

  private url:string = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  /*@Input() set appQrCode(url: string) {
    if (url && !this.url) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!url && this.url) {
      this.viewContainer.clear();
    }
  }*/
}
